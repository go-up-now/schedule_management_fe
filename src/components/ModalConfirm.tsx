import React from 'react';
import Modal from './Modal.tsx';
import Button from "./Button.tsx"

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  question: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  question
}) => {
  return (
    <Modal
      id="confirm-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Xác nhận"
      content={<p className='text-center pt-3 text-xl'>{question}</p>}
      positionButton='center'
      buttonConfirm={
        <Button onClick={onConfirm} variant="btn-primary">
          Xác nhận
        </Button>
      }
      buttonCancel={
        <Button onClick={onClose} variant="btn-secondary">
          Hủy
        </Button>
      }
    />
  );
};

export default ModalConfirm;
