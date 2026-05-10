import { createFileRoute } from '@tanstack/react-router';
import { ChatPanel } from '~/components/ChatPanel';

export const Route = createFileRoute('/_authed/chat')({
  component: ChatPage,
});

function ChatPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Chat</p>
          <h1>Assistant workspace</h1>
        </div>
        <p className="muted-copy page-intro">
          The TanStack Start version uses a server function instead of a Next.js
          route handler.
        </p>
      </section>
      <ChatPanel />
    </div>
  );
}
