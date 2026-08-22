import React from 'react';
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

// Pre-computed cloud positioning to maintain purity and avoid re-render recalculations
const CLOUDS = Array.from({ length: 15 }).map((_, i) => {
  const s1 = ((i * 9301 + 49297) % 233280) / 233280;
  const s2 = ((i * 49297 + 9301) % 233280) / 233280;
  const s3 = ((i * 12345 + 67891) % 233280) / 233280;
  const s4 = ((i * 54321 + 19876) % 233280) / 233280;
  return {
    id: i,
    size: s1 * 80 + 60,
    opacity: s2 * 0.1 + 0.11,
    top: `${s3 * 80 + 5}%`,
    duration: s4 * 60 + 60,
    delay: s1 * -100,
    direction: i % 2 === 0 ? 1 : -1,
  };
});

const BackgroundClouds = () => {
  return (
    <div className="background-clouds-container">
      {CLOUDS.map((cloud) => {
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
              ease: 'linear',
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
