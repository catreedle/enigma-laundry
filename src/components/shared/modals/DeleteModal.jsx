import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";

export const DeleteModal = ({
  title,
  item,
  isOpen,
  onClose,
  onConfirmDelete,
  error,
}) => {
  const confirmDeleteItem = () => {
    onConfirmDelete();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className=" justify-center text-center text-white bg-primary">
          {title}
        </ModalHeader>
        <ModalBody className=" text-center flex justify-center items-center py-5 ">
          <p>Kamu yakin ingin menghapus item</p>
          <p className=" font-bold">{item.name}</p>
          <p>
            dengan id <span className=" italic ">{item.id}</span> ?
          </p>
          <div className="flex gap-5 justify-center">
            <Button color="danger" onPress={confirmDeleteItem}>
              Ya
            </Button>
            <Button color="primary" onPress={onClose}>
              Tidak
            </Button>
          </div>
        </ModalBody>
        {error && (
          <ModalFooter className="justify-start text-danger">
            <p>*{error}</p>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

DeleteModal.propTypes = {
  title: PropTypes.string,
  item: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirmDelete: PropTypes.func,
  error: PropTypes.string,
};
