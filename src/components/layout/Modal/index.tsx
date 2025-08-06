import { IconButton } from "@components/actions/IconButton";
import { CloseIcon } from "@components/icons";
import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

type ModalProps = ReactModal.Props & {
  children?: React.ReactNode;
  size?: string;
};

export const Modal = ({ children, size, ...props }: ModalProps) => {
  const onClose = props.onRequestClose ? props.onRequestClose : undefined;

  return (
    <ReactModal
      {...props}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={200}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          left: `calc((100vw - ${size})/2)`,
          right: `calc((100vw - ${size})/2)`,
          top: "50%",
          bottom: "auto",
          transform: "translate(0, -50%)",
        },
      }}
    >
      <div className="relative h-full w-full">
        <IconButton onClick={onClose} className="absolute top-0 right-0">
          <CloseIcon className="size-4" />
        </IconButton>
        <div className="w-full px-5 pt-1">{children}</div>
      </div>
    </ReactModal>
  );
};
