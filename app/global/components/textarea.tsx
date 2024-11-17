import React, { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder: string;
  errors?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, errors, ...props }, ref) => {
    return (
      <div className="pb-0 p-1 rounded-lg w-full bg-gradient-to-r from-secondary via-third to-secondary">
        <label htmlFor={props.id} className="sr-only">
          {label}
        </label>
        <textarea
          ref={ref}
          className="p-3 w-full h-28 rounded-lg resize-none focus:outline-none"
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

TextArea.displayName = "TextArea";

export default TextArea;
