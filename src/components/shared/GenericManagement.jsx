import { useState } from "react";
import { Button } from "@nextui-org/react";
import { DeleteModal } from "../shared/modals/DeleteModal";
import { FormModal } from "./modals/FormModal";
import useFetch from "../../hooks/useFetch";
import useDelete from "../../hooks/useDelete";
import useUpdate from "../../hooks/useUpdate";
import { toast, ToastContainer } from "react-toastify";
import useCreate from "../../hooks/useCreate";
import PropTypes from "prop-types";

const GenericManagement = ({
  title,
  apiEndpoint,
  ListComponent,
  DetailComponent,
  updateFields,
  createFields,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const { data, error, fetchData } = useFetch(apiEndpoint);
  const {
    error: errorDelete,
    deleteItem,
    resetError: resetDeleteError,
  } = useDelete(apiEndpoint);
  const {
    error: errorUpdate,
    updateItem,
    resetError: resetUpdateError,
  } = useUpdate(apiEndpoint);
  const {
    error: errorCreate,
    createItem,
    resetError: resetCreateError,
  } = useCreate(apiEndpoint);

  if (error) console.log(error);

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedItem(null);
    setViewModalOpen(false);
  };

  const closeDeleteModal = () => {
    resetDeleteError();
    setSelectedItem(null);
    setDeleteModalOpen(false);
  };

  const closeUpdateModal = () => {
    resetUpdateError();
    setSelectedItem(null);
    setUpdateModalOpen(false);
  };

  const closeCreateModal = () => {
    resetCreateError(null);
    setCreateModalOpen(false);
  };

  const confirmDelete = async () => {
    const isDeleted = await deleteItem(selectedItem.id);
    if (isDeleted) {
      setDeleteModalOpen(false);
      await fetchData();
      toast.success("Item deleted successfully!");
    } else {
      console.error("Failed to delete item");
    }
  };

  const confirmUpdate = async (body) => {
    const isUpdated = await updateItem(body);
    if (isUpdated) {
      setUpdateModalOpen(false);
      await fetchData();
      toast.success("Item updated successfully!");
    } else {
      console.error("Failed to update item");
    }
  };

  const confirmCreate = async (body) => {
    const isCreated = await createItem(body);
    if (isCreated) {
      setCreateModalOpen(false);
      await fetchData();
      toast.success("Item created successfully!");
    } else {
      console.error("Failed to create item");
    }
  };

  return (
    <div className="flex flex-col mx-[10%]">
      <ListComponent
        title={title}
        onView={handleView}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        data={data}
      />
      <Button
        className="self-end text-white font-semibold"
        color="primary"
        onPress={() => setCreateModalOpen(true)}
      >
        Tambah {title}
      </Button>

      {isViewModalOpen && selectedItem && (
        <DetailComponent item={selectedItem} onClose={closeViewModal} />
      )}

      {isDeleteModalOpen && selectedItem && (
        <DeleteModal
          title={`Hapus ${title}`}
          item={selectedItem}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirmDelete={confirmDelete}
          error={errorDelete}
        />
      )}

      {isUpdateModalOpen && selectedItem && (
        <FormModal
          action="Update"
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          title={title}
          item={selectedItem}
          fields={updateFields}
          onConfirm={confirmUpdate}
          error={errorUpdate}
        />
      )}

      {isCreateModalOpen && (
        <FormModal
          action="Tambah"
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          title={title}
          fields={createFields}
          onConfirm={confirmCreate}
          error={errorCreate}
        />
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

GenericManagement.propTypes = {
  title: PropTypes.string,
  apiEndpoint: PropTypes.string,
  ListComponent: PropTypes.elementType,
  DetailComponent: PropTypes.elementType,
  updateFields: PropTypes.array,
  createFields: PropTypes.array,
};

export default GenericManagement;
