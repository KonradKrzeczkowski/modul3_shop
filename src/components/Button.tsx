import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  bgColor?: string;       
  textColor?: string;      
  hoverBgColor?: string; 
  hoverTextColor?: string; 
  borderColor?: string;  
  borderRadius?: string;   
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  bgColor = "var(--primary-bg)",
  textColor = "var(--primary-text)",
  hoverBgColor,
  hoverTextColor,
  borderColor,
  borderRadius = "8px",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium transition-colors duration-200 ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: borderColor ? `1px solid ${borderColor}` : undefined,
        borderRadius: borderRadius,
      }}
      onMouseEnter={(e) => {
        if (hoverBgColor)
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = hoverBgColor;
        if (hoverTextColor)
          (e.currentTarget as HTMLButtonElement).style.color = hoverTextColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = bgColor;
        (e.currentTarget as HTMLButtonElement).style.color = textColor;
      }}
    >
      {children}
    </button>
  );
}