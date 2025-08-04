import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const BubblePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [bubbles, setBubbles] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Array of bubble colors - minimal black and white theme
  const bubbleColors = [
    '#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666',
    '#808080', '#999999', '#b3b3b3', '#cccccc', '#ffffff'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      createBubble(inputValue.trim());
      setInputValue('');
    }
  };

  const createBubble = (text) => {
    const maxSize = isMobile ? 80 : 120;
    const minSize = isMobile ? 40 : 60;
    
    const newBubble = {
      id: nextId,
      text,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      x: Math.random() * (isMobile ? 60 : 70) + (isMobile ? 20 : 15), // Better mobile positioning
      y: Math.random() * (isMobile ? 50 : 60) + (isMobile ? 25 : 20), // Avoid input area on mobile
      size: Math.min(Math.max(text.length * (isMobile ? 6 : 8) + (isMobile ? 30 : 40), minSize), maxSize),
    };

    setBubbles(prev => [...prev, newBubble]);
    setNextId(prev => prev + 1);

    // Animate bubble creation
    setTimeout(() => {
      const bubbleElement = document.getElementById(`bubble-${newBubble.id}`);
      if (bubbleElement) {
        gsap.fromTo(bubbleElement, 
          { 
            scale: 0,
            rotation: -180,
            opacity: 0
          },
          { 
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
          }
        );
      }
    }, 50);
  };

  const popBubble = (bubbleId) => {
    const bubbleElement = document.getElementById(`bubble-${bubbleId}`);
    if (bubbleElement) {
      // Pop animation
      gsap.to(bubbleElement, {
        scale: 1.3,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(bubbleElement, {
            scale: 0,
            opacity: 0,
            rotation: 360,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              setBubbles(prev => prev.filter(bubble => bubble.id !== bubbleId));
            }
          });
        }
      });
    }
  };

  // Add floating animation to all bubbles
  useEffect(() => {
    bubbles.forEach(bubble => {
      const bubbleElement = document.getElementById(`bubble-${bubble.id}`);
      if (bubbleElement) {
        gsap.to(bubbleElement, {
          y: "+=10",
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2
        });
      }
    });
  }, [bubbles]);

  return (
    <div 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Minimal background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(0,0,0,0.02) 1px, transparent 1px),
          radial-gradient(circle at 60% 60%, rgba(0,0,0,0.02) 1px, transparent 1px),
          radial-gradient(circle at 80% 40%, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px, 150px 150px, 200px 200px'
      }} />

      {/* Input form in center */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
        padding: isSmallMobile ? '20px' : isMobile ? '30px' : '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        width: isSmallMobile ? '90vw' : isMobile ? '80vw' : 'auto',
        maxWidth: '500px'
      }}>
        <h1 style={{
          color: '#1a1a1a',
          marginBottom: isSmallMobile ? '20px' : '30px',
          fontSize: isSmallMobile ? '1.8rem' : isMobile ? '2.2rem' : '2.5rem',
          fontWeight: '300',
          letterSpacing: '-1px'
        }}>
          Create Bubbles
        </h1>
        
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          gap: '10px', 
          alignItems: 'center',
          flexDirection: isSmallMobile ? 'column' : 'row',
          width: '100%'
        }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something magical..."
            style={{
              padding: isSmallMobile ? '12px 16px' : '15px 20px',
              fontSize: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              outline: 'none',
              minWidth: isSmallMobile ? '100%' : '300px',
              width: isSmallMobile ? '100%' : 'auto',
              backgroundColor: 'white',
              color: '#1a1a1a',
              transition: 'all 0.3s ease',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a1a1a';
              e.target.style.backgroundColor = 'white';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.backgroundColor = 'white';
            }}
          />
          <button
            type="submit"
            style={{
              padding: isSmallMobile ? '12px 20px' : '15px 25px',
              fontSize: '16px',
              border: '1px solid #1a1a1a',
              borderRadius: '6px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              width: isSmallMobile ? '100%' : 'auto',
              minHeight: isSmallMobile ? '48px' : 'auto',
              touchAction: 'manipulation'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#333333';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#1a1a1a';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Create Bubble
          </button>
        </form>

        <p style={{
          color: '#666666',
          marginTop: isSmallMobile ? '15px' : '20px',
          fontSize: isSmallMobile ? '13px' : '14px'
        }}>
          {isSmallMobile ? 'Tap bubbles to pop them!' : 'Click on bubbles to pop them!'}
        </p>
      </div>

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          id={`bubble-${bubble.id}`}
          onClick={() => popBubble(bubble.id)}
          style={{
            position: 'absolute',
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `linear-gradient(135deg, ${bubble.color}20, ${bubble.color}10)`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            border: `1px solid rgba(255, 255, 255, 0.18)`,
            transition: 'all 0.3s ease',
            zIndex: 5,
            userSelect: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = `
              0 12px 40px rgba(0, 0, 0, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(0, 0, 0, 0.15)
            `;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = `
              0 8px 32px rgba(0, 0, 0, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `;
          }}
        >
          <span style={{
            color: bubble.color === '#ffffff' || bubble.color === '#cccccc' || bubble.color === '#b3b3b3' ? '#1a1a1a' : '#1a1a1a',
            fontWeight: '600',
            fontSize: `${Math.max(isSmallMobile ? 10 : 12, bubble.size / (isSmallMobile ? 6 : 8))}px`,
            textAlign: 'center',
            textShadow: bubble.color === '#000000' || bubble.color === '#1a1a1a' || bubble.color === '#333333' ? '0 1px 2px rgba(255,255,255,0.3)' : '0 1px 2px rgba(0,0,0,0.2)',
            padding: isSmallMobile ? '3px' : '5px',
            wordBreak: 'break-word',
            lineHeight: '1.2',
            backdropFilter: 'blur(2px)'
          }}>
            {bubble.text}
          </span>
        </div>
      ))}


    </div>
  );
};

export default BubblePage; 