import type { FC } from "react";

const NavBar: FC = () => {
  return (
    <header className="h-[62px] w-full z-50 border-b-2 bg-card fixed">
      <div className="mx-16 px-6 h-full flex items-center">
        <a className="flex w-fit items-center gap-2">
          <svg
            width="30"
            height="29.93"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.0797 31.9982C16.3589 32.013 15.7995 31.9315 16.0824 31.9315C24.7275 31.9315 31.7635 24.7192 32 16.0066C31.7208 15.9918 31.4396 16.0066 31.1567 16.0066C22.5116 16.0066 16.3162 23.2856 16.0797 31.9982Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9203 31.9982C15.6411 32.013 16.2005 31.9315 15.9176 31.9315C7.27254 31.9315 0.236486 24.7192 -6.91971e-08 16.0066C0.279233 15.9918 0.56041 16.0066 0.843288 16.0066C9.48839 16.0066 15.6838 23.2856 15.9203 31.9982Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.0801 0.00177468C16.3607 -0.0128654 15.7985 0.067884 16.0828 0.067884C24.7709 0.067884 31.8419 7.21092 32.0796 15.84C31.799 15.8546 31.5164 15.84 31.2321 15.84C22.544 15.84 16.3177 8.63085 16.0801 0.00177468Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 0.00177468C15.7193 -0.0128654 16.2816 0.067884 15.9973 0.067884C7.30921 0.067884 0.238166 7.21092 0.00050354 15.84C0.281125 15.8546 0.563701 15.84 0.847985 15.84C9.53609 15.84 15.7623 8.63085 16 0.00177468Z"
              fill="black"
            />
          </svg>

          <p className="font-helvetica pt-[.15rem] text-[#121212] tracking-[-2%] text-2xl font-[800]">
            Katha
          </p>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
