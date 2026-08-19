import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './BackgroundClouds.css';

const CloudSVG = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1818 20.2527 10.2662 18.0016 10.021C17.5456 6.61869 14.6534 4 11.1429 4C7.79462 4 5.00693 6.43875 4.34114 9.64539C1.94218 10.2522 0 12.4414 0 15C0 17.7614 2.23858 20 5 20H17.5V19Z" />
  </svg>
);

const BackgroundClouds = () => {
  // Generate random properties once using useMemo to avoid re-calculating on re-renders
  const clouds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 60, // Size between 60px and 140px
      opacity: Math.random() * 0.15 + 0.05, // Increased visibility: opacity between 0.05 and 0.20
      top: `${Math.random() * 80 + 5}%`, // Vertical position (5% to 85%)
      duration: Math.random() * 60 + 60, // Animation duration 60s to 120s (slow drift)
      delay: Math.random() * -100, // Negative delay to stagger initial positions smoothly
      direction: Math.random() > 0.5 ? 1 : -1, // 1 for left-to-right, -1 for right-to-left
    }));
  }, []);

  return (
    <div className="background-clouds-container">
      {clouds.map((cloud) => {
        // We animate across slightly more than the viewport width to ensure they fully exit
        const startX = cloud.direction === 1 ? '-20vw' : '120vw';
        const endX = cloud.direction === 1 ? '120vw' : '-20vw';

        return (
          <motion.div
            key={cloud.id}
            className="cloud-wrapper"
            style={{
              top: cloud.top,
              width: cloud.size,
              height: cloud.size,
              opacity: cloud.opacity,
            }}
            initial={{ x: startX }}
            animate={{ x: endX }}
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              ease: "linear",
              delay: cloud.delay,
            }}
          >
            <CloudSVG className="cloud-svg" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default BackgroundClouds;
