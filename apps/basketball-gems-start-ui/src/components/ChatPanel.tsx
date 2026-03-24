'use client';

import { useRouter } from '@tanstack/react-router';
import { useState, useTransition } from 'react';
import { askBasketballAssistant } from '~/lib/chat';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/text-area';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const suggestedPrompts = [
  "Who looks strongest in this season's EuroLeague race?",
  'Summarise the latest trend for Panathinaikos.',
  'Which teams are best defensively right now?',
];

export function ChatPanel() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPending, startTransition] = useTransition();

  const submitPrompt = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: trimmedValue,
    };

    setMessages((current) => [...current, userMessage]);
    setPrompt('');

    startTransition(async () => {
      const response = await askBasketballAssistant({
        data: { prompt: trimmedValue },
      });

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: response.answer,
        },
      ]);

      router.invalidate();
    });
  };

  return (
    <div className="chat-layout">
      <Card className="chat-stage">
        <CardHeader className="flex flex-row items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="eyebrow">Assistant</p>
            <CardTitle>Basketball analyst</CardTitle>
          </div>
          <p className="text-muted-foreground max-w-md text-sm leading-6">
            The server function is already wired for retrieval-augmented
            answers.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="chat-thread rounded-xl border">
            <div className="flex min-h-[320px] flex-col gap-4 p-4">
              {messages.length === 0 ? (
                <div className="empty-state">
                  <p>
                    Ask about EuroLeague form, fixtures, roster context, or
                    trends.
                  </p>
                  <div className="prompt-row">
                    {suggestedPrompts.map((suggestion) => (
                      <Button
                        className="chip"
                        key={suggestion}
                        onClick={() => submitPrompt(suggestion)}
                        type="button"
                        variant="outline"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <article
                    className={`chat-bubble chat-bubble--${message.role}`}
                    key={message.id}
                  >
                    <p className="eyebrow">{message.role}</p>
                    <p>{message.text}</p>
                  </article>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <form
            className="chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              submitPrompt(prompt);
            }}
          >
            <label className="field-label" htmlFor="chat-prompt">
              Ask a question
            </label>
            <Textarea
              id="chat-prompt"
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ask about standings, team form, or upcoming matchups"
              rows={4}
              value={prompt}
            />
            <div className="composer-actions">
              <span className="muted-copy">
                {isPending
                  ? 'Thinking through the scouting report...'
                  : 'Ready'}
              </span>
              <Button disabled={isPending} type="submit">
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
