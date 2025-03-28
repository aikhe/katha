import { FC } from "react";

type ArrowDownLeftProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

const ArrowDownLeft: FC<ArrowDownLeftProps> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
};

export default ArrowDownLeft;
