import { useState } from "react";

const useModal = () => {
    const [isModalOpen, setisModalOpen] = useState<boolean>(false);

    const toggleIsModalOpen = () => {
        setisModalOpen(!isModalOpen);
    };

    return {isModalOpen, toggleIsModalOpen};
};

export default useModal;