
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

const BUFFER = 3; 

interface CardCarouselProps<T> {
  items: T[];
  renderCard: (item: T, props: { isActive?: boolean }) => React.ReactNode;
  onDragGestureEnd?: () => void;
}

const CardCarousel = <T extends {}>({ items, renderCard, onDragGestureEnd }: CardCarouselProps<T>) => {
  const [cardDimensions, setCardDimensions] = useState({ width: 320, gap: 20 });
  
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) { // extra small mobile
        setCardDimensions({ width: 240, gap: 12 });
      } else if (screenWidth < 640) { // mobile
        setCardDimensions({ width: 270, gap: 16 });
      } else if (screenWidth < 1024) { // tablet
        setCardDimensions({ width: 310, gap: 18 });
      } else if (screenWidth < 1280) { // desktop
        setCardDimensions({ width: 360, gap: 20 });
      } else if (screenWidth < 1536) { // large desktop
        setCardDimensions({ width: 400, gap: 24 });
      } else { // extra large desktop
        setCardDimensions({ width: 440, gap: 28 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const [isWrapping, setIsWrapping] = useState(false);
  
  const bufferSize = useMemo(() => items.length > 1 ? BUFFER : 0, [items.length]);

  const virtualItems = useMemo(() => {
    if (bufferSize === 0) return items;
    return [
      ...items.slice(-bufferSize),
      ...items,
      ...items.slice(0, bufferSize),
    ];
  }, [items, bufferSize]);
  
  const [activeIndex, setActiveIndex] = useState(bufferSize);
  const dragX = useMotionValue(0);

  useEffect(() => {
     dragX.set(-activeIndex * (cardDimensions.width + cardDimensions.gap));
  }, [cardDimensions, activeIndex, dragX]);

  const animateToCard = useCallback((index: number) => {
    if (isWrapping) return;
    const { width, gap } = cardDimensions;
    setActiveIndex(index);
    animate(dragX, -index * (width + gap), {
      type: 'spring', mass: 0.5, stiffness: 400, damping: 50,
      onComplete: () => {
        const lowerBound = bufferSize;
        const upperBound = bufferSize + items.length;

        if (index < lowerBound) {
          setIsWrapping(true);
          const newIndex = index + items.length;
          dragX.set(-newIndex * (width + gap));
          setActiveIndex(newIndex);
          requestAnimationFrame(() => setIsWrapping(false));
        } else if (index >= upperBound) {
          setIsWrapping(true);
          const newIndex = index - items.length;
          dragX.set(-newIndex * (width + gap));
          setActiveIndex(newIndex);
          requestAnimationFrame(() => setIsWrapping(false));
        }
      }
    });
  }, [isWrapping, cardDimensions, dragX, bufferSize, items.length]);

  const handleNav = (direction: number) => {
    animateToCard(activeIndex + direction);
    onDragGestureEnd?.();
  };

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { velocity }: PanInfo) => {
    const { width, gap } = cardDimensions;
    const cardWidthWithGap = width + gap;

    const x = dragX.get();

    if (Math.abs(velocity.x) < 50) {
      const newIndex = Math.round(-x / cardWidthWithGap);
      animateToCard(newIndex);
    } else {
      const power = 0.2;
      const projectedOffset = velocity.x * power;
      const projectedX = x + projectedOffset;
      const newIndex = Math.round(-projectedX / cardWidthWithGap);
      animateToCard(newIndex);
    }
    
    onDragGestureEnd?.();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') handleNav(-1);
      else if (event.key === 'ArrowRight') handleNav(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isWrapping, animateToCard, onDragGestureEnd]);

  if (!items || items.length === 0) {
    return null;
  }
  
  if (items.length <= 1) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4"> 
        <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[520px] xl:h-[580px] 2xl:h-[630px] flex items-center justify-center">
          <div style={{ width: `${cardDimensions.width}px` }} className="h-full flex-shrink-0">
            {renderCard(items[0], { isActive: true })}
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-2 text-brand-light">
          <span className="font-semibold text-lg w-16 text-center tabular-nums">1 / 1</span>
        </div>
      </div>
    );
  }
  
  const displayIndex = (activeIndex - bufferSize) % items.length;
  const userVisibleIndex = (displayIndex + items.length) % items.length;
  const { width: CARD_WIDTH, gap: CARD_GAP } = cardDimensions;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div 
        className="relative w-full h-[360px] sm:h-[440px] lg:h-[520px] xl:h-[580px] 2xl:h-[630px] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="flex h-full items-center"
          style={{ 
            x: dragX, 
            gap: `${CARD_GAP}px`,
            paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
            paddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`
          }}
          drag="x"
          dragConstraints={false}
          onDragEnd={onDragEnd}
        >
          {virtualItems.map((item, i) => {
            const cardCenterPosition = -i * (CARD_WIDTH + CARD_GAP);
            const inputRange = [
              cardCenterPosition - (CARD_WIDTH + CARD_GAP) * 1.5,
              cardCenterPosition,
              cardCenterPosition + (CARD_WIDTH + CARD_GAP) * 1.5
            ];
            const scale = useTransform(dragX, inputRange, [0.7, 1, 0.7], { clamp: true });
            const opacity = useTransform(dragX, inputRange, [0.3, 1, 0.3], { clamp: true });
            const isActive = i === activeIndex;

            return (
              <motion.div
                key={i}
                className="h-full flex-shrink-0"
                style={{
                  width: `${CARD_WIDTH}px`,
                  scale,
                  opacity,
                  transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                }}
              >
                <div className="relative w-full h-full">
                  {renderCard(item, { isActive })}
                  {!isActive && (
                    <div
                      className="absolute inset-0 z-10 bg-transparent cursor-grab"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-2 text-brand-light">
        <button 
          onClick={() => handleNav(-1)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Previous Card"
        >
          <ChevronLeftIcon />
        </button>
        <span className="font-semibold text-lg w-16 text-center tabular-nums">
          {userVisibleIndex + 1} / {items.length}
        </span>
        <button 
          onClick={() => handleNav(1)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Next Card"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;
