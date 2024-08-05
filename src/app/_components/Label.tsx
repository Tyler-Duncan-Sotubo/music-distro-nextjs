import React from "react";

type LabelProps = {
  className?: string;
  children: React.ReactNode;
  htmlFor: string;
};

const Label = ({ className, children, htmlFor, ...props }: LabelProps) => (
  <label
    className={`${className} text-gray-700 mb-2 block text-sm font-medium`}
    {...props}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

export default Label;
