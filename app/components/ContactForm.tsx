import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ContactFormProps {
  setCursorVariant: (variant: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ setCursorVariant }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('access_key', '521b3551-138b-450e-bd2e-ca7e15a1268d');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('botcheck', '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
        Lets Create Together
      </h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <input type="hidden" name="access_key" value="521b3551-138b-450e-bd2e-ca7e15a1268d" />
        <input type="checkbox" name="botcheck" className="hidden" />
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-4 bg-black/40 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-4 bg-black/40 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
            />
          </div>
          
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full p-4 bg-black/40 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
          />
          
          <textarea
            rows={6}
            placeholder="Tell me about your project..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-4 bg-black/40 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300 resize-none"
          ></textarea>
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-center"
            >
              <p className="text-xl font-semibold text-green-400">✓ Message Sent Successfully!</p>
            </motion.div>
          ) : (
            <motion.button
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-70"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setCursorVariant('button')}
              onHoverEnd={() => setCursorVariant('default')}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;