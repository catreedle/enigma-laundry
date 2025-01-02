import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import PropTypes from "prop-types";

const DetailsList = ({ details }) => {
  return (
    <ul className="grid grid-cols-[auto_1fr] gap-y-2">
      {details.map((item, index) => (
        <li key={index} className="contents">
          <span className="font-semibold">{item.label}</span>
          <span className="break-all">: {item.value}</span>
        </li>
      ))}
    </ul>
  );
};

DetailsList.propTypes = {
  details: PropTypes.array,
};

export const DetailModal = ({ title, details, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="bg-primary justify-center text-white">
            {title}
          </ModalHeader>
          <ModalBody>
            <DetailsList details={details} />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

DetailModal.propTypes = {
  title: PropTypes.string,
  details: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
