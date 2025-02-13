import { createPortal } from "react-dom";
import { GetModal, MODAL_NAMES } from "../../context/ModalContext";
import ConfirmationModal from "./ConfirmationModal";
import PromptModal from "./PromptModal";

let ModalRenderer = () => {
  let { activeModal, closeModal } = GetModal();

  return createPortal(
    activeModal.name ? (
      activeModal.name === MODAL_NAMES.CONFIRMATION ? (
        <ConfirmationModal {...activeModal.props} closeModal={closeModal} />
      ) : activeModal.name === MODAL_NAMES.PROMPT ? (
        <PromptModal {...activeModal.props} closeModal={closeModal} />
      ) : null
    ) : null,
    document.body,
  );
};

export default ModalRenderer;
