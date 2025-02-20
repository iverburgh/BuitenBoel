import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const groups = [
  { name: 'Groep 2011', image: 'https://picsum.photos/200/200?random=301' },
  { name: 'Groep 2012', image: 'https://picsum.photos/200/200?random=302' },
  { name: 'Groep 2013', image: 'https://picsum.photos/200/200?random=303' },
  { name: 'Groep 2014', image: 'https://picsum.photos/200/200?random=304' },
  { name: 'Groep 2015', image: 'https://picsum.photos/200/200?random=305' },
  { name: 'Groep 2016', image: 'https://picsum.photos/200/200?random=306' },
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

function GroupsPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleGroupClick = (groupName) => {
    navigate('/names', { state: { selectedGroup: groupName } });
  };

  return (
    <div className="app">
      <motion.h1 
        className="activities-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Select a Group
      </motion.h1>
      <motion.div 
        className="activities-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {groups.map((group, index) => (
          <motion.div
            key={index}
            className="activity-square"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1,
              opacity: 0.8,
              transition: { duration: 0.3 }
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleGroupClick(group.name)}
          >
            <img src={group.image} alt={group.name} />
            <div className="activity-title">{group.name}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default GroupsPage; 