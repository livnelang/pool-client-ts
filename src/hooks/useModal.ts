import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return { isModalOpen, setIsModalOpen };
};

export default useModal;
