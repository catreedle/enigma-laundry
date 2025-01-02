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
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";

export const TransactionModal = ({ isOpen, onClose, onAdd, error }) => {
  const { data: customers } = useFetch("/api/v1/customers");
  const { data: products } = useFetch("/api/v1/products");
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      customerId,
      billDetails: [
        {
          product: {
            id: productId,
          },
          qty,
        },
      ],
    };
    onAdd(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-primary text-white justify-center">
          Tambah Transaksi
        </ModalHeader>
        <ModalBody className="py-5">
          <Form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex justify-between w-full">
              <label
                htmlFor="customerId"
                className="font-semibold text-gray-700 w-1/5"
              >
                Customer
              </label>
              <select
                label="Customer"
                name="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-3/5"
              >
                <option value="">-- Pilih Customer --</option>{" "}
                {/* Placeholder */}
                {customers?.map((customer) => (
                  <option
                    key={customer.id}
                    name="customerId"
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between w-full">
              <label
                htmlFor="billDetails.product[0].id"
                className="font-semibold text-gray-700 w-1/5"
              >
                Produk
              </label>
              <select
                label="Produk"
                name="billDetails.product[0].id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-3/5"
              >
                <option value="">-- Pilih Produk --</option> {/* Placeholder */}
                {products?.map((product) => (
                  <option key={product.id} name="productId" value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              name="qty"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              label="Kuantitas"
              labelPlacement="inside"
              type="number"
            />
            <Button
              color="primary"
              className=" text-white font-semibold w-full"
              type="submit"
            >
              Tambah Transaksi
            </Button>
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

TransactionModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
  error: PropTypes.string,
};
