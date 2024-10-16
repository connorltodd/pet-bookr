"use client";

import { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Modal Title</h2>
            <p className="mb-4">
              This is the content of the modal. You can add any text, forms, or
              other components here.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
