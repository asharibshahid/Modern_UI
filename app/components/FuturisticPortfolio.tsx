"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './CustomCursor';
import AnimatedBackground from './AnimatedBackground';
import Navigation from './Navigation';
import SocialLinks from './SocialLinks';
import HomeSection from './HomeSection';
import ServicesSection from './ServicesSection';
import PortfolioSection from './PortfolioSection';
import TestimonialsSection from './TestimonialsSection';
import ContactForm from './ContactForm';
import { FaWhatsapp } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const FuturisticPortfolio: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [assistantInput, setAssistantInput] = useState('');
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const fullText = "Hi Im Affan Creative Visual Storyteller | Expert in Graphics Design & AI-Driven Content";

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Initialize AI assistant
  useEffect(() => {
    if (isAssistantOpen && assistantMessages.length === 0) {
      setAssistantMessages([{
        text: "Hi! Im Affan's AI assistant. I can help you with information about:\n\n• Social Media Posts\n• Amazon Listing Images\n• AI Product & CGI Ads\n• Logo & Branding\n\nHow can I assist you today?",
        isUser: false
      }]);
    }
  }, [isAssistantOpen]);

  // Scroll to bottom of assistant messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [assistantMessages]);

  // Handle AI assistant messages
  const handleAssistantSend = async () => {
    if (!assistantInput.trim() || isAssistantLoading) return;

    const userMessage = { text: assistantInput, isUser: true };
    setAssistantMessages(prev => [...prev, userMessage]);
    setAssistantInput('');
    setIsAssistantLoading(true);

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDFOyYXqDtxb9218m7o2OKJQC--jtFEFdk");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const prompt = `You are a design assistant for Affan, a graphic designer. 
      Services offered: Social Media Posts, Amazon Listing Images, AI Product and CGI Ads, Logo and Branding.
      User message: "${assistantInput}"
      
      If the question is about design services, answer helpfully. 
      If unrelated, politely decline and suggest contacting via the contact page.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setAssistantMessages(prev => [...prev, { text, isUser: false }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setAssistantMessages(prev => [...prev, { 
        text: "Sorry, Im having trouble. Please contact Affan directly for assistance.", 
        isUser: false 
      }]);
    } finally {
      setIsAssistantLoading(false);
    }
  };

  // Handle Enter key press for assistant
  const handleAssistantKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAssistantSend();
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <HomeSection 
            displayedText={displayedText}
            setActiveSection={setActiveSection}
            setCursorVariant={setCursorVariant}
          />
        );
       
      case 'services':
        return (
          <ServicesSection 
            setCursorVariant={setCursorVariant} 
            setActiveSection={setActiveSection} 
          />
        );
      case 'portfolio':
        return <PortfolioSection setCursorVariant={setCursorVariant} />;
      case 'testimonials':
        return <TestimonialsSection />;
      case 'contact':
        return <ContactForm setCursorVariant={setCursorVariant} />;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden cursor-none"
    >
      <CustomCursor cursorVariant={cursorVariant} />
      <AnimatedBackground />
      
      <Navigation 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setCursorVariant={setCursorVariant}
      />
      
      <SocialLinks setCursorVariant={setCursorVariant} />

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/923355227702"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setCursorVariant('button')}
        onHoverEnd={() => setCursorVariant('default')}
      >
        <FaWhatsapp className="text-3xl" />
      </motion.a>

      {/* AI Assistant Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setCursorVariant('button')}
        onHoverEnd={() => setCursorVariant('default')}
        onClick={() => setIsAssistantOpen(true)}
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      {/* AI Assistant Chat Modal */}
      <AnimatePresence>
        {isAssistantOpen && (
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
                  onClick={() => setIsAssistantOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
                {assistantMessages.map((msg, index) => (
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
                {isAssistantLoading && (
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
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    onKeyDown={handleAssistantKeyPress}
                    placeholder="Ask about design services..."
                    className="flex-1 bg-gray-800 text-white rounded-xl p-3 min-h-[60px] max-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={isAssistantLoading}
                  />
                  <button
                    onClick={handleAssistantSend}
                    disabled={isAssistantLoading || !assistantInput.trim()}
                    className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl w-12 h-12 flex items-center justify-center"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <button 
                    onClick={() => {
                      setActiveSection('contact');
                      setIsAssistantOpen(false);
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

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default FuturisticPortfolio;