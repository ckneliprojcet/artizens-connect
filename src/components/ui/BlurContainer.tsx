
import React, { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  border?: boolean;
  hover?: boolean;
  style?: CSSProperties;
}

const BlurContainer = ({
  children,
  className,
  intensity = 'medium',
  border = true,
  hover = false,
  style,
}: BlurContainerProps) => {
  const intensityMap = {
    light: 'backdrop-blur-sm bg-white/5 dark:bg-black/5',
    medium: 'backdrop-blur-md bg-white/10 dark:bg-black/10',
    heavy: 'backdrop-blur-xl bg-white/20 dark:bg-black/20',
  };

  return (
    <div
      className={cn(
        'glass rounded-2xl transition-all duration-300',
        intensityMap[intensity],
        border && 'border border-white/10 dark:border-white/5',
        hover && 'hover:bg-white/20 dark:hover:bg-black/30 hover:shadow-lg',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
