import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50'>
      <div className='w-full md:w-1/2 fixed right-0 h-full z-10 overflow-auto flex flex-col border-l-2 border-gray-300'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
