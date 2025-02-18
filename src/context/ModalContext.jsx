import { createContext, useContext, useState } from "react";

let ModalContext = createContext();

export let GetModal = () => useContext(ModalContext);

const INITIONAL_STATE = {
  name: null,
  props: {},
};

export const MODAL_NAMES = {
  CONFIRMATION: "CONFIRMATION",
  PROMPT: "PROMPT",
  CUSTOM: "CUSTOM",
};

let ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(INITIONAL_STATE);

  let closeModal = () => {
    setActiveModal(INITIONAL_STATE);
  };

  let openModal = (modalName, props) => {
    setActiveModal({
      name: modalName,
      props,
    });
  };

  let value = { activeModal, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
