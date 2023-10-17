import React from "react";

/**
 * Button component without styles
 * @param props - HTML attributes for buttons
 */
const Button: React.FC<React.ComponentProps<"button">> = (
  props
) => {
  const { children, ...otherProps } = props;
  return <button {...otherProps}>{children}</button>;
};

export default Button;
