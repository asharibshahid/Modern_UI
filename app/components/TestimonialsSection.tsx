import { motion } from 'framer-motion';
import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
        Testimonials
      </h2>
      <div className="space-y-8">
        {[
          {
            rating: "★★★★★ 5.0",
            text: "Affan work ethic is impeccable, not only did he take the time to work with me but he truly brought my vision to life. If you are looking for someone who s easy to work with and has great skills, this is your guy!",
          },
          {
            rating: "★★★★☆ 4.9",
            text: "It was once again nice to work with Affan on a totally different and new project by me but not by him obviously. The logo turned out to be Mr. Perfect. The color grading and overall feel of it feels premium and luxurious.",
          },
          {
            rating: null,
            text: "I really appreciated how you helped me out with my CV. Your work was outstanding. You truly understood my strengths and showcased them perfectly. The final product looked professional and well-structured. Highly recommend their services to anyone looking to elevate their job prospects.",
          },
          {
            rating: "★★★★★ 5.0",
            text: "Affan was very helpful and very available. He worked quickly around some ambiguity and put my product in the best possible position to be successful.",
          },
          {
            rating: "★★★★★ 5.0",
            text: "Great on all fronts. Communication. The job was done well, no complaints, would work again.",
          },
        ].map((review, index) => (
          <motion.div
            key={index}
            className="p-8 bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-3xl"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
          >
            <p className="text-gray-300 text-lg mb-4 italic">“{review.text}”</p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0f2638] to-[#fcb514] rounded-full"></div>
              <div>
                {review.rating && (
                  <p className="text-yellow-400 font-semibold">{review.rating}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;