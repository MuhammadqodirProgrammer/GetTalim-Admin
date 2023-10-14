import React, { useRef } from "react";
import { GrClose } from "react-icons/gr";
import "./modal.css";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  width: string;
}

export const Modal: React.FC<ModalProps> = ({
  modal,
  setModal,
  children,
  title,
  width,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlay = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className={`overlay   ${modal ? "open" : ""}`}
    >
      <div className={` modal_wrapper bg-white dark:bg-topColor w-[${width}]`}>
        <button
          onClick={() => setModal(false)}
          className={`btn modal_button text-black dark:text-white  rounded-0`}
        >
          <AiOutlineClose size={20} />
        </button>
        <div className={` modal_header`}>
          <h3 className="font-semibold text-[30px] text-black dark:text-white">
            {title}
          </h3>
        </div>
        <div className={`modal-content`}>{children}</div>
      </div>
    </div>
  );
};
