'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Messages Section */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle>Basketball AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-4 p-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Start a conversation...</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role !== 'user' ? 'px-5' : ''}`}
                  >
                    <div
                      className={`max-w-sm lg:max-w-5xl px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text':
                            return (
                              <div key={`${message.id}-${i}`}>{part.text}</div>
                            );
                          case 'tool-basketball':
                            return (
                              <div key={`${message.id}-${i}`}>
                                {part.output as string}
                              </div>
                            );
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

      {/* Input Section */}
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
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
