import { useRef, useEffect, ReactNode } from "react";

function useOutsideAlerter(ref: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

type Props = {
  children: ReactNode;
  classes: string;
};
export default function OutsideAlerter(props: Props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className={props.classes} ref={wrapperRef}>
      {props.children}
    </div>
  );
}
