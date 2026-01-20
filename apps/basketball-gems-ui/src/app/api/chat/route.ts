import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { vectorStore } from './store';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-5'),
    system:
      'You are a helpful assistant specialised in basketball.' +
      'You have access to a tool that retrieves context from a blog post.' +
      'Use the tool to help answer user queries.' +
      'Do not list the tools results in the response.' +
      'Answer in a concise and informative manner.',
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
          const serialized = retrievedDocs
            .map(
              (doc) =>
                `Source: ${doc.metadata.title}\nContent: ${doc.pageContent}`,
            )
            .join('\n');
          return serialized;
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
