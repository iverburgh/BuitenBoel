import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

// Array of sound effects - updated paths to match downloaded files
const soundEffects = [
  process.env.PUBLIC_URL + '/sounds/pop.mp3',
  process.env.PUBLIC_URL + '/sounds/boing.mp3',
  process.env.PUBLIC_URL + '/sounds/zing.mp3',
  process.env.PUBLIC_URL + '/sounds/whoosh.mp3',
  process.env.PUBLIC_URL + '/sounds/bell.mp3',
];

// Array of fictional names and their corresponding images
const circleData = [
  { name: 'Emma', image: 'https://picsum.photos/200/200?random=1' },
  { name: 'Liam', image: 'https://picsum.photos/200/200?random=2' },
  { name: 'Olivia', image: 'https://picsum.photos/200/200?random=3' },
  { name: 'Noah', image: 'https://picsum.photos/200/200?random=4' },
  { name: 'Ava', image: 'https://picsum.photos/200/200?random=5' },
  { name: 'Lucas', image: 'https://picsum.photos/200/200?random=6' },
  { name: 'Isabella', image: 'https://picsum.photos/200/200?random=7' },
  { name: 'Mason', image: 'https://picsum.photos/200/200?random=8' },
  { name: 'Sophia', image: 'https://picsum.photos/200/200?random=9' },
  { name: 'Logan', image: 'https://picsum.photos/200/200?random=10' },
  { name: 'Charlotte', image: 'https://picsum.photos/200/200?random=11' },
  { name: 'Ethan', image: 'https://picsum.photos/200/200?random=12' },
  { name: 'Amelia', image: 'https://picsum.photos/200/200?random=13' },
  { name: 'Oliver', image: 'https://picsum.photos/200/200?random=14' },
  { name: 'Mia', image: 'https://picsum.photos/200/200?random=15' },
  { name: 'Aiden', image: 'https://picsum.photos/200/200?random=16' },
  { name: 'Harper', image: 'https://picsum.photos/200/200?random=17' },
  { name: 'Elijah', image: 'https://picsum.photos/200/200?random=18' },
  { name: 'Evelyn', image: 'https://picsum.photos/200/200?random=19' },
  { name: 'James', image: 'https://picsum.photos/200/200?random=20' },
  { name: 'Abigail', image: 'https://picsum.photos/200/200?random=21' },
  { name: 'Benjamin', image: 'https://picsum.photos/200/200?random=22' },
  { name: 'Emily', image: 'https://picsum.photos/200/200?random=23' },
  { name: 'Alexander', image: 'https://picsum.photos/200/200?random=24' },
  { name: 'Elizabeth', image: 'https://picsum.photos/200/200?random=25' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    scale: 0,
    y: 50
  },
  show: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

function HomePage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverSound, setHoverSound] = useState(null);
  const [clickSound, setClickSound] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedGroup = location.state?.selectedGroup || 'Unknown Group';

  useEffect(() => {
    // Create Audio objects
    const hoverAudio = new Audio();
    const clickAudio = new Audio();
    setHoverSound(hoverAudio);
    setClickSound(clickAudio);

    return () => {
      // Cleanup
      hoverAudio.pause();
      clickAudio.pause();
    };
  }, []);

  const playRandomSound = (audioObj) => {
    if (audioObj) {
      // Pick a random sound
      const randomSound = soundEffects[Math.floor(Math.random() * soundEffects.length)];
      audioObj.src = randomSound;
      
      // Reset and play
      audioObj.currentTime = 0;
      audioObj.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  const handleHover = (index) => {
    setHoveredIndex(index);
    playRandomSound(hoverSound);
  };

  const handleClick = (name) => {
    playRandomSound(clickSound);
    // Pass the name to the activities page
    setTimeout(() => navigate('/activities', { state: { selectedName: name } }), 100);
  };

  return (
    <div className="app">
      <motion.h1 
        className="activities-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {selectedGroup}
      </motion.h1>
      <motion.div 
        className="circles-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {circleData.map((item, index) => (
          <motion.div
            key={index}
            className="circle"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.8,
              transition: { duration: 0.3 }
            }}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(item.name)}
          >
            <img src={item.image} alt={item.name} />
            <div className="circle-title">{item.name}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default HomePage; 