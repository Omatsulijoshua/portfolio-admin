"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Trash, Mail, User, Clock, CheckCircle } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { Message } from "@/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await dbService.getMessages();
      setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMessages();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await dbService.deleteMessage(id);
        loadMessages();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
          Visitor Inquiries
        </h1>
        <p className="text-gray-400 text-sm">
          Review and manage message submissions from the public contact form.
        </p>
      </div>

      {/* Message Feed Card */}
      <div className="glass-card rounded-2xl p-6 border-white/5 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-white/5 pb-4">
          <MessageSquare size={18} className="text-neon-purple" />
          <span>Inbox Feed</span>
        </h2>

        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500 animate-pulse">
            Loading database inbox entries...
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 relative group overflow-hidden"
              >
                {/* Visual side-marker */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-neon opacity-40 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4 flex-1">
                  {/* Meta items row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-gray-500">
                    <div className="flex items-center space-x-1 text-gray-300">
                      <User size={13} className="text-neon-cyan" />
                      <span className="font-bold font-sans">{msg.name}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-white transition-colors">
                      <Mail size={13} />
                      <a href={`mailto:${msg.email}`}>{msg.email}</a>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={13} />
                      <span>
                        {msg.created_at ? new Date(msg.created_at).toLocaleString() : "Unknown"}
                      </span>
                    </div>
                  </div>

                  {/* Actual message content */}
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap pl-1 font-sans">
                    {msg.message}
                  </p>
                </div>

                {/* Actions column */}
                <div className="flex md:flex-col items-center gap-2 self-end md:self-start">
                  <a
                    href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                    className="px-3 py-1.5 rounded bg-white/5 text-[10px] font-bold text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/10 transition-colors"
                  >
                    Reply Email
                  </a>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all"
                    title="Delete Message"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-20 text-xs text-gray-500 max-w-md mx-auto space-y-3">
                <CheckCircle size={32} className="text-gray-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-base">Inbox is empty</h3>
                  <p className="text-gray-500">
                    No inquiries have been registered. They will show up here as soon as a visitor fills out the contact form.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
