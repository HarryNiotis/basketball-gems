'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpIcon, LoaderCircle } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const loading = status === 'submitted' || status === 'streaming';

  return (
    <div className="max-w-5xl flex flex-col justify-center gap-8">
      <Card className="flex flex-col overflow-hidden h-[80vh]">
        <CardHeader className="pb-3">
          <CardTitle>Basketball Chatbot</CardTitle>
        </CardHeader>
        <CardContent className="flex overflow-hidden p-0">
          <ScrollArea className="min-h-3/4 w-full">
            <div className="flex flex-col gap-4 p-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Ask about basketball, results, fixtures etc</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role !== 'user' ? 'px-5' : ''}`}
                  >
                    <div
                      className={`max-w-3xl px-4 py-2 rounded-lg break-words overflow-hidden ${
                        message.role === 'user'
                          ? 'bg-blue-400 text-white items-end ml-auto'
                          : 'text-gray-900'
                      }`}
                    >
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text':
                            return (
                              <div
                                key={`${message.id}-${i}`}
                                className="break-words whitespace-pre-wrap"
                              >
                                {part.text}
                              </div>
                            );
                          case 'tool-basketball': {
                            const output = part.output as string;

                            return (
                              <div
                                key={`${message.id}-${i}`}
                                className="break-words whitespace-pre-wrap"
                              >
                                {output}
                              </div>
                            );
                          }
                        }
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput('');
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              placeholder="Ask about basketball..."
              onChange={(e) => setInput(e.currentTarget.value)}
              className="flex-1"
            />
            <Button
              disabled={loading}
              variant="outline"
              size="icon"
              aria-label="Submit"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <ArrowUpIcon />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
