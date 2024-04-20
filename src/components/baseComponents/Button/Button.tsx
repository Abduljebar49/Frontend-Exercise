import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

// ----------------------------------------------------------------------
export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "danger-nobg"
    | "";
  variant?: "contained" | "outlined" | "text" | "icon";
  size?: "medium" | "small" | "";
};

const Button = ({
  className,
  color = "primary",
  variant = "contained",
  size = "medium",
  children,
  ...other
}: Props) => {
  return (
    <button
      className={classNames(
        "rounded-lg disabled:bg-transparent disabled:text-gray-300 disabled:border-gray-300 cursor-pointer transition-all duration-300 px-4 py-2",
        {
          ["bg-white text-primary border-gray-300 border-1"]: color === "default" && variant === "contained",
          ["bg-button-primary border-indigo-500 hover:border-indigo-400 hover:bg-indigo-500  text-white border-[1px] flex items-center justify-center"]:
            color === "primary" && variant === "contained",
          ["bg-[#16A34A] border-[#22C55E] hover:bg-button-success-hover text-white hover:text-white border-[1px] flex items-center justify-center"]:
            color === "success" && variant === "contained",
          [" text-red-600 hover:text-red-700 !border-none border-[1px] flex items-center justify-center"]:
            color === "danger-nobg",
          ["bg-red-600 hover:bg-red-500 !text-white !border-none border-[1px] flex items-center justify-center"]:
            color === "danger" && variant === "contained",
          ["bg-[#D6DBE0] hover:bg-[#8E9CB2] text-secondary hover:text-white"]:
            color === "secondary" && variant === "contained",
          ["border-1 !text-primary !border-border"]:
            color === "primary" && variant === "outlined",
          ["disabled:bg-transparent disabled:text-secondary"]:
            color === "primary" && variant === "text",
          ["disabled:bg-transparent bg-transparent"]: color === "",
          ["!px-1"]: variant === "icon",
          ["!px-[16px] !py-[6px]"]: size === "small",
        },
        className
      )}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
