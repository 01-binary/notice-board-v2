import React, { FC } from 'react';
import Portal from 'components/common/Portal';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  closeModal: () => void;
};

const Modal: FC<Props> = ({ visible, children, closeModal }) => {
  return (
    <Portal elementId="modal">
      <div
        className={`fixed inset-0 z-[999] bg-[#00000099] ${
          visible ? `block` : `hidden`
        }`}
      />
      <div
        tabIndex={-1}
        className={`fixed inset-0 z-[1000] outline-0 overflow-auto ${
          visible ? `block` : `hidden`
        }`}
      >
        <div
          tabIndex={0}
          className={`flex relative p-4 mx-auto overflow-y-auto bg-white rounded-[10px] flex-col w-[550px] max-h-[500px] top-[20%]`}
        >
          <div className="flex justify-end">
            <div
              className="cursor-pointer font-bold text-3xl text-black"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
