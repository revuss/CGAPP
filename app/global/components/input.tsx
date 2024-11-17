import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  errors?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, errors, ...props }, ref) => {
    return (
      <div className=" p-1 rounded-lg w-full bg-gradient-to-r from-secondary via-third to-secondary">
        <label htmlFor={props.id} className="sr-only">
          {label}
        </label>
        <input
          ref={ref}
          className="p-3 w-full rounded-lg focus:outline-none"
          placeholder={placeholder}
          {...props}
        />
        {errors && (
          <p className="text-white pt-[2px] text-xs text-center font-medium">
            {errors}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
