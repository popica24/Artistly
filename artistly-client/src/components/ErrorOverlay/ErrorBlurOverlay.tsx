import { ReactNode } from "react";
import "./index.css";
type Props = {
  children: ReactNode;
  errorMessage: string;
  classes?: string;
};

const ErrorBlurOverlay = (props: Props) => {
  return (
    <div className="error-blur-overlay">
      <div className="error-message px-5">{props.errorMessage}</div>
      <div className={`blurred-content ${props.classes}`}>{props.children}</div>
    </div>
  );
};

export default ErrorBlurOverlay;
