'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    // Placeholder AI response while OpenAI integration is wired.
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: 'Rady is thinking... integrate OpenAI API to fetch actionable insights.',
      },
    ]);
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-4">
        <h3 className="text-lg font-semibold text-[#073B4C]">Rady Assistant</h3>
        <p className="text-xs text-slate-500">Ask about reports, payroll, or student performance.</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm text-slate-600">
        {messages.length === 0 ? (
          <p className="text-center text-slate-400">Start a conversation with Rady.</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={message.role === 'assistant' ? 'text-[#073B4C]' : ''}>
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                {message.role === 'assistant' ? 'Rady' : 'You'}
              </span>
              <p>{message.content}</p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <Input
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Rady anything..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}
