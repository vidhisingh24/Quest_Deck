'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, X, User, HelpCircle, Zap, Compass, RefreshCw } from 'lucide-react';
import { UserProfile, AIMessage } from '@/lib/types';

interface AIMentorWidgetProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'm1',
    sender: 'mentor',
    text: 'Hello Alex! I am your Quest AI Mentor. I have reviewed your current goal as a Full Stack Engineer & Cyber Defender. How can I help you excel in your active networking mission today?',
    timestamp: 'Just now',
  },
];

const QUICK_PROMPTS = [
  'Explain CPU context switching simply',
  'Why did my data packet get dropped in step 2?',
  'Give me a practice scenario for SQL injection',
  'What should I study after Networking?',
];

export const AIMentorWidget: React.FC<AIMentorWidgetProps> = ({ user, isOpen, onClose }) => {
  const [messages, setMessages] = useState<AIMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: AIMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Intelligent Response Simulation
    setTimeout(() => {
      let aiText = `Great question regarding "${query}"! In networking and security systems, decision accuracy relies on understanding header flags and subnets. Based on your current level ${user.level} progress, I recommend testing your choices in the interactive sim first to build muscle memory!`;

      if (query.toLowerCase().includes('packet') || query.toLowerCase().includes('step 2')) {
        aiText = 'In step 2 of the Networking mission, your data packet reached the edge gateway firewall. Firewalls drop packets if the outgoing port state is not recognized or if TTL expires. Always verify Stateful Inspection rules!';
      } else if (query.toLowerCase().includes('sql') || query.toLowerCase().includes('injection')) {
        aiText = 'Here is a quick practice scenario: Suppose a hacker enters `\' OR 1=1 --` into a login form. How do parameterized prepared statements stop this? Prepared statements send SQL code structure and parameter values separately to the database engine!';
      } else if (query.toLowerCase().includes('cpu') || query.toLowerCase().includes('context')) {
        aiText = 'Think of CPU context switching like saving your place in a book! When the OS switches from Process 1 to Process 2, it saves the CPU register values into the Process Control Block (PCB) so it can resume right where it left off!';
      }

      const mentorMsg: AIMessage = {
        id: `ai_${Date.now()}`,
        sender: 'mentor',
        text: aiText,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, mentorMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-warm-900/30 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="relative w-full max-w-md h-[90vh] bg-white border border-warm-200 rounded-3xl shadow-float flex flex-col overflow-hidden"
        >
          {/* Top Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-light via-white to-sage-light border-b border-warm-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky text-white flex items-center justify-center font-bold shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-warm-900 flex items-center gap-1.5">
                  <span>Quest AI Mentor</span>
                  <Sparkles className="w-4 h-4 text-accent-dark" />
                </h3>
                <p className="text-[11px] text-warm-500">Tracking progress for {user.name}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-3 bg-warm-50 border-b border-warm-200 overflow-x-auto flex gap-2">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-full bg-white border border-warm-200 hover:border-sky text-warm-700 text-xs font-semibold shrink-0 transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' ? 'bg-sky text-white' : 'bg-sage-light text-sage-deep'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky text-white rounded-tr-none'
                      : 'bg-warm-50 border border-warm-200 text-warm-800 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-warm-400 font-semibold p-2">
                <Bot className="w-4 h-4 animate-bounce text-sky" />
                <span>AI Mentor is crafting response...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-warm-200 bg-white">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your AI mentor a doubt..."
                className="w-full pl-4 pr-12 py-3 rounded-full border border-warm-200 focus:border-sky focus:outline-none text-xs sm:text-sm text-warm-900 bg-warm-50/50"
              />
              <button
                onClick={() => handleSendMessage()}
                className="absolute right-2 top-2 p-2 rounded-full bg-sky text-white hover:bg-sky-dark transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
