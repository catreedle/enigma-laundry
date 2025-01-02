import { useState } from "react";
import TransactionList from "../components/transactions/TransactionList";
import { Button } from "@nextui-org/react";
import { TransactionDetail } from "../components/transactions/TransactionDetail";
import { TransactionModal } from "../components/shared/modals/TransactionModal";
import useFetch from "../hooks/useFetch";
import useCreate from "../hooks/useCreate";
import { toast, ToastContainer } from "react-toastify";

export const Transaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const {
    error: errorCreate,
    createItem,
    resetError,
  } = useCreate("/api/v1/bills");
  const { data, error, fetchData } = useFetch("/api/v1/bills");
  if (error) {
    console.log(error);
  }

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleAddTransaction = () => {
    setAddModalOpen(true);
  };

  const submitAddTransaction = async (body) => {
    const isCreated = await createItem(body);
    if (isCreated) {
      setAddModalOpen(false);
      await fetchData();
      toast.success("Item created successfully!");
    } else {
      console.error("Failed to create item");
    }
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setModalOpen(false);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    resetError();
  };
  return (
    <div className="flex flex-col mx-[10%]">
      <TransactionList
        title="Transaksi"
        onView={handleViewTransaction}
        data={data}
      />
      <Button
        className="self-end text-white font-semibold"
        color="primary"
        onPress={() => handleAddTransaction()}
      >
        Tambah Transaksi
      </Button>

      {isModalOpen && selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={closeModal}
        />
      )}

      {isAddModalOpen && (
        <TransactionModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onAdd={submitAddTransaction}
          error={errorCreate}
        />
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};
