import { FC, PropsWithChildren } from "react";

import WithKathaLogo from "@/components/withKathaLogo";

import styles from "./layouts.module.css";

const TestLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <div className={styles.authLayout}>
        <WithKathaLogo />
      </div>
      {children}
    </main>
  );
};

export default TestLayout;
