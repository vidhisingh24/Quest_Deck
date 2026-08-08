'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, X, User, MessageSquare, ChevronDown } from 'lucide-react';
import { UserProfile, AIMessage } from '@/lib/types';
import { sounds } from '@/lib/soundEngine';

interface AIMentorWidgetProps {
  user: UserProfile;
  isOpen?: boolean;
  onClose?: () => void;
}

const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'm1',
    sender: 'mentor',
    text: 'Hello! I am your QuestDeck AI Mentor. I have analyzed your learning goal and active subject track. How can I help you master your missions today?',
    timestamp: 'Just now',
  },
];

const QUICK_PROMPTS = [
  'Explain CPU context switching simply',
  'Why did my data packet get dropped in step 2?',
  'Give me a practice scenario for SQL injection',
  'What should I study after Networking?',
];

export const AIMentorWidget: React.FC<AIMentorWidgetProps> = ({ user, isOpen: externalIsOpen, onClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const [messages, setMessages] = useState<AIMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleOpen = () => {
    sounds.playClick();
    if (onClose && isOpen) {
      onClose();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    sounds.playClick();

    const userMsg: AIMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = `Great question regarding "${query}"! On QuestDeck, concept accuracy comes from active testing. Based on your current level ${user.level} progress, I recommend executing the practice deliverable in your active roadmap node!`;

      if (query.toLowerCase().includes('packet') || query.toLowerCase().includes('step 2')) {
        aiText = 'In step 2 of the Networking mission, your data packet reached the edge gateway firewall. Firewalls drop packets if the outgoing port state is not recognized or if TTL expires. Always verify Stateful Inspection connection tables!';
      } else if (query.toLowerCase().includes('sql') || query.toLowerCase().includes('injection')) {
        aiText = 'Here is a quick practice scenario: Suppose an attacker inputs `\' OR 1=1 --` into a login form. How do parameterized prepared statements stop this? Prepared statements send SQL code structure and parameter values separately to the database engine!';
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
    }, 900);
  };

  return (
    <>
      {/* Floating Bottom-Right Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleOpen}
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-gradient-to-r from-sky via-sky-dark to-accent hover:scale-105 text-white font-extrabold text-xs shadow-float border-2 border-white flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span>💬 QuestDeck AI Mentor</span>
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
        </motion.button>
      )}

      {/* Floating Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[520px]">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full h-full bg-white border border-warm-200 rounded-3xl shadow-float flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-sky-light via-white to-accent-light border-b border-warm-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-sky text-white flex items-center justify-center font-bold shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-warm-900 flex items-center gap-1.5">
                      <span>QuestDeck AI Mentor</span>
                      <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
                    </h3>
                    <p className="text-[10px] text-warm-500 font-medium">Online • Helping {user.name}</p>
                  </div>
                </div>

                <button
                  onClick={toggleOpen}
                  className="p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Prompts */}
              <div className="p-2.5 bg-warm-50 border-b border-warm-200 overflow-x-auto flex gap-1.5">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-full bg-white border border-warm-200 hover:border-sky text-warm-700 text-[11px] font-semibold shrink-0 transition-all cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Thread */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        msg.sender === 'user' ? 'bg-sky text-white' : 'bg-sage-light text-sage-deep'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-sky text-white rounded-tr-none font-medium'
                          : 'bg-warm-50 border border-warm-200 text-warm-800 rounded-tl-none font-normal'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 items-center text-[11px] text-warm-400 font-semibold p-1">
                    <Bot className="w-3.5 h-3.5 animate-bounce text-sky" />
                    <span>AI Mentor is thinking...</span>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="p-3 border-t border-warm-200 bg-white">
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask AI mentor a question..."
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-full border border-warm-200 focus:border-sky focus:outline-none text-xs text-warm-900 bg-warm-50/50"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-sky text-white hover:bg-sky-dark transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
