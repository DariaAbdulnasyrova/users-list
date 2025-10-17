import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@/assets/close.svg";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.content}>
        <h2 className={styles.title} id="modal-title" data-testid="modal-title">
          {title}
          <button className={styles.close} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </h2>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
