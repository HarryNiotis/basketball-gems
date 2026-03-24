import { createServerFn } from '@tanstack/react-start';

type ChatInput = {
  prompt: string;
};

export const askBasketballAssistant = createServerFn({ method: 'POST' })
  .inputValidator((data: ChatInput) => data)
  .handler(async ({ data }) => {
    const prompt = data.prompt.trim();

    if (!prompt) {
      return {
        answer: 'Ask a EuroLeague question to start the conversation.',
      };
    }

    try {
      const [{ generateText, tool }, { openai }, { z }, { vectorStore }] =
        await Promise.all([
          import('ai'),
          import('@ai-sdk/openai'),
          import('zod'),
          import('~/lib/vector-store.server'),
        ]);

      const result = await generateText({
        model: openai('gpt-5'),
        system:
          'You are a concise assistant specialised in EuroLeague basketball. ' +
          'Use the basketball tool when retrieved context is likely to help. ' +
          'If the tool is empty, answer from general knowledge and say when you are unsure.',
        prompt,
        tools: {
          basketball: tool({
            description: 'Retrieve basketball blog context for a user query.',
            inputSchema: z.object({
              query: z.string(),
            }),
            execute: async ({ query }) => {
              const retrievedDocs = await vectorStore.similaritySearch(query);
              return retrievedDocs
                .map(
                  (doc) =>
                    `Source: ${doc.metadata.title}\nContent: ${doc.pageContent}`,
                )
                .join('\n\n');
            },
          }),
        },
      });

      return { answer: result.text };
    } catch {
      return {
        answer:
          'Chat is scaffolded but not fully configured. Add the OpenAI and MongoDB environment variables to enable answers.',
      };
    }
  });
