'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useIntersectionObserver, useMotionPreferences } from '@/hooks/useMotion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const AnimatedCard = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  hover = true,
  clickable = false,
  onClick,
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef as React.RefObject<Element>, 0.1);
  const { shouldAnimate } = useMotionPreferences();

  const getInitialPosition = () => {
    if (!shouldAnimate) return { opacity: 0 };
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: 50 };
      case 'right':
        return { opacity: 0, x: -50 };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getAnimatePosition = () => {
    if (!shouldAnimate) return { opacity: 1 };
    
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    };
  };

  const hoverAnimation = shouldAnimate && hover ? {
    y: -5,
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  } : {};

  const tapAnimation = shouldAnimate && clickable ? {
    scale: 0.98,
  } : {};

  return (
    <motion.div
      ref={cardRef}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      whileHover={hover && shouldAnimate ? hoverAnimation : undefined}
      whileTap={clickable && shouldAnimate ? tapAnimation : undefined}
      transition={{
        duration: shouldAnimate ? 0.6 : 0.1,
        delay: shouldAnimate ? delay : 0,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={`${className} ${clickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
