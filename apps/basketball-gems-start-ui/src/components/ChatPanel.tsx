'use client';

import { useRouter } from '@tanstack/react-router';
import { useState, useTransition } from 'react';
import { askBasketballAssistant } from '~/lib/chat';

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
      <section className="feature-card chat-stage">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Assistant</p>
            <h2>Basketball analyst</h2>
          </div>
          <p className="muted-copy">
            The server function is already wired for retrieval-augmented
            answers.
          </p>
        </div>
        <div className="chat-thread">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>
                Ask about EuroLeague form, fixtures, roster context, or trends.
              </p>
              <div className="prompt-row">
                {suggestedPrompts.map((suggestion) => (
                  <button
                    className="chip"
                    key={suggestion}
                    onClick={() => submitPrompt(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
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
      </section>

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
        <textarea
          className="text-input text-input--area"
          id="chat-prompt"
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask about standings, team form, or upcoming matchups"
          rows={4}
          value={prompt}
        />
        <div className="composer-actions">
          <span className="muted-copy">
            {isPending ? 'Thinking through the scouting report...' : 'Ready'}
          </span>
          <button className="button button--primary" disabled={isPending}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
