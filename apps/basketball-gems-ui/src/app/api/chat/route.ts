import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { vectorStore } from './store';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-5'),
    system:
      'You are a helpful assistant. You have access to a tool that retrieves context from a blog post. Use the tool to help answer user queries.',
    messages: await convertToModelMessages(messages),
    tools: {
      basketball: tool({
        description: 'Retrieve information related to a query',
        inputSchema: z.object({
          query: z.string().describe('The query to get the information for'),
        }),
        execute: async ({ query }) => {
          console.log('Executing basketball tool with query:', query);
          const retrievedDocs = await vectorStore.similaritySearch(query);
          console.log('Retrieved documents:', retrievedDocs.length);
          const serialized =
            retrievedDocs.length === 0
              ? 'No relevant documents found.'
              : retrievedDocs.map((doc) => ({
                  title: doc.metadata.title,
                  content: doc.pageContent,
                }));
          console.log('Serialized output:', serialized);
          return JSON.stringify(serialized);
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
