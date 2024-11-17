import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonStyle?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, buttonStyle = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full font-semibold cursor-pointer bg-gradient-to-r py-3 text-center transition-all duration-500 ease-in-out text-white rounded-lg from-secondary via-third to-secondary hover:via-black hover:to-secondary ${buttonStyle}`}
        {...props}
      >
        {text}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
