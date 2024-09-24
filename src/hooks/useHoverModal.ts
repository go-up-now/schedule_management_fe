import { useState } from "react";

const useHoverModal = <T,>(getPosition: (rect: DOMRect) => { top: number, left: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [currentButton, setCurrentButton] = useState<HTMLButtonElement | null>(null);
  const [targetValue, setTargetValue] = useState<T | null>(null);
  const openModal = (value: T, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    // if (isModalOpen && currentButton === button) {
    //   closeModal();
    // } else {
    const rect = button.getBoundingClientRect();
    setModalPosition(getPosition(rect));
    setIsModalOpen(true);
    setCurrentButton(button);
    setTargetValue(value)
    // }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentButton(null);
  };

  const handleMouseEnter = (value: T, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    openModal(value, event);
    console.log("event: ", event)

  };


  // có thể phát triển
  // const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   if (currentButton && !currentButton.contains(event.relatedTarget as Node) ) {
  //     closeModal();
  //     console.log("chạy");

  //   }
  // };

  return {
    isModalOpen,
    modalPosition,
    openModal,
    handleMouseEnter,
    // handleMouseLeave,
    targetValue,
    closeModal,
  };
};

export default useHoverModal;
