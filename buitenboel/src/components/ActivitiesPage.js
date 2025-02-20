import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';

const activities = [
  { title: 'Knutselen', image: 'https://picsum.photos/200/200?random=101' },
  { title: 'Kleuren', image: 'https://picsum.photos/200/200?random=102' },
  { title: 'Schilderen', image: 'https://picsum.photos/200/200?random=103' },
  { title: 'Bouwen', image: 'https://picsum.photos/200/200?random=104' },
  { title: 'Puzzelen', image: 'https://picsum.photos/200/200?random=105' },
  { title: 'Tekenen', image: 'https://picsum.photos/200/200?random=106' },
  { title: 'Poppenkast', image: 'https://picsum.photos/200/200?random=107' },
  { title: 'Sensorisch', image: 'https://picsum.photos/200/200?random=108' },
  { title: 'Pauze', image: 'https://picsum.photos/200/200?random=109' },
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

function ActivitiesPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedName = location.state?.selectedName || 'Guest';

  const handleActivityClick = (activity) => {
    const currentTime = new Date().toLocaleTimeString();
    setSelectedActivity({
      ...activity,
      time: currentTime
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => navigate('/'), 500);
  };

  return (
    <div className="app">
      <motion.h1 
        className="activities-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Activities for {selectedName}
      </motion.h1>
      <motion.div 
        className="activities-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {activities.map((activity, index) => (
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
            onClick={() => handleActivityClick(activity)}
          >
            <img src={activity.image} alt={activity.title} />
            <div className="activity-title">{activity.title}</div>
          </motion.div>
        ))}
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>{selectedName} has chosen {selectedActivity?.title}</h2>
          <p>at {selectedActivity?.time}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default ActivitiesPage; 