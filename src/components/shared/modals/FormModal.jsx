import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const FormModal = ({
  action,
  isOpen,
  onClose,
  title,
  item,
  fields,
  onConfirm,
  error,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      const initialFormData = fields.reduce((acc, field) => {
        acc[field.key] = item[field.key] || "";
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [item, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const field = fields.find((f) => f.key === name);
    // Check if the field is numeric (e.g., price)
    let parsedValue = value;
    if (field?.type === "number") {
      parsedValue = Number(value) || "";
    } else if (field?.type === "tel") {
      parsedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-primary text-white justify-center">
          {action} {title}
        </ModalHeader>
        <ModalBody className="py-5">
          <Form className=" flex flex-col gap-5">
            {fields.map((field) => (
              <Input
                key={field.key}
                isReadOnly={field.key == "id"}
                name={field.key}
                value={formData[field.key] || ""}
                onChange={handleChange}
                label={field.label}
                labelPlacement="inside"
                type={field.type || "text"}
              />
            ))}
            <Button
              color="primary"
              className=" text-white font-semibold w-full"
              onPress={() => setShowConfirm(true)}
            >
              {action}
            </Button>
            {showConfirm && (
              <div className="self-center items-center flex gap-2">
                <p>
                  {action} {title}?
                </p>
                <Button color="danger" onPress={() => onConfirm(formData)}>
                  Ya
                </Button>
                <Button color="primary" onPress={() => onClose()}>
                  Batal
                </Button>
              </div>
            )}
          </Form>
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

FormModal.propTypes = {
  action: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  item: PropTypes.object,
  fields: PropTypes.array,
  onConfirm: PropTypes.func,
  error: PropTypes.string,
};
