"use client";

import { ReactNode, FC, useState } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="flex justify-end">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
