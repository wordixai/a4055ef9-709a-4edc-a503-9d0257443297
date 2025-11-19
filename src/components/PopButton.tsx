import { ButtonHTMLAttributes, useState } from 'react';

interface PopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

const PopButton = ({ variant = 'primary', children, className = '', ...props }: PopButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    props.onClick?.(e);
  };

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`
        relative px-8 py-4 font-black text-lg handwritten
        border-4 border-foreground
        transition-all duration-200
        shadow-[4px_4px_0_hsl(var(--foreground))]
        hover:shadow-[6px_6px_0_hsl(var(--foreground))]
        hover:translate-x-[-2px] hover:translate-y-[-2px]
        active:shadow-[2px_2px_0_hsl(var(--foreground))]
        active:translate-x-[2px] active:translate-y-[2px]
        ${variantStyles[variant]}
        ${isClicked ? 'animate-bounce-pop' : ''}
        ${className}
      `}
    >
      {children}

      {/* Comic-style sparkles */}
      <span className="absolute -top-2 -right-2 text-accent text-2xl animate-pulse">
        ✦
      </span>
    </button>
  );
};

export default PopButton;
