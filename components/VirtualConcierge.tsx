import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const VirtualConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Skyline Estates. I am your Virtual Concierge. How may I assist you in your pursuit of exceptional living?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal ChatMessage to the format service expects
      const historyForService = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await getGeminiResponse(historyForService, userMsg.text);
      
      const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Moved to bottom-left (left-24) to clear the collapsed sidebar area. Z-index 40 so sidebar (z-50) slides over it.
    <div className="fixed bottom-8 left-24 z-40 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 bg-white text-luxury-black border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
          >
            <Sparkles size={18} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="w-[350px] h-[500px] bg-white shadow-2xl border border-gray-100 flex flex-col overflow-hidden rounded-sm"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-sm">
              <div>
                <h3 className="uppercase tracking-architect text-[10px] font-bold text-gray-900">AI Concierge</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white no-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-luxury-black text-white' 
                      : 'bg-gray-50 text-gray-800 border border-gray-100'
                  }`}>
                    {msg.role === 'model' && (
                       <Sparkles size={10} className="mb-1 text-gray-400" />
                    )}
                    <p className="font-serif">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 p-3 border border-gray-100">
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-[10px] font-serif text-gray-500"
                    >
                      Thinking...
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about details..."
                  className="w-full bg-gray-50 border-none p-3 pr-10 text-xs font-serif focus:ring-1 focus:ring-gray-200 outline-none transition-all placeholder:text-gray-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-2 text-gray-400 hover:text-luxury-black disabled:opacity-30 transition-colors"
                >
                  <Send size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualConcierge;