// components/AIAssistant.tsx
"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

interface AIAssistantProps {
  setActiveSection: (section: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Initial bot message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: "Hi! I'm Affan's AI assistant. I can help you with information about:\n\n• Social Media Posts\n• Amazon Listing Images\n• AI Product & CGI Ads\n• Logo & Branding\n\nHow can I assist you today?",
        isUser: false
      }]);
    }
  }, [isOpen]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCMUD7MDK2NDnyym5JX2-5xeznoC1BApkw");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are a design assistant for Affan, a graphic designer. 
      Services offered: Social Media Posts, Amazon Listing Images, AI Product and CGI Ads, Logo and Branding.
      User message: "${input}"
      
      If the question is about design services, answer helpfully. 
      If unrelated, politely decline and suggest contacting via the contact page.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { text, isUser: false }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble. Please contact Affan directly for assistance.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-gray-900 border border-cyan-500/30 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900 to-blue-800 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <FaRobot className="text-cyan-400 text-xl" />
                  <h3 className="text-white font-bold">Design Assistant</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-xl p-3 ${
                        msg.isUser 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' 
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-200 rounded-xl p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about design services..."
                    className="flex-1 bg-gray-800 text-white rounded-xl p-3 min-h-[60px] max-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl w-12 h-12 flex items-center justify-center"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <button 
                    onClick={() => {
                      setActiveSection('contact');
                      setIsOpen(false);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    Contact Affan Directly
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

export default AIAssistant;