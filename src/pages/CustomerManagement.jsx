import GenericManagement from "../components/shared/GenericManagement";
import CustomerList from "../components/customers/CustomerList";
import { CustomerDetail } from "../components/customers/CustomerDetail";

export const CustomerManagement = () => {
  const updateFields = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nama" },
    { key: "phoneNumber", label: "No. Telepon", type: "tel" },
    { key: "address", label: "Alamat" },
  ];

  const createFields = [
    { key: "name", label: "Nama" },
    { key: "phoneNumber", label: "No. Telepon", type: "tel" },
    { key: "address", label: "Alamat" },
  ];

  return (
    <GenericManagement
      title="Customer"
      apiEndpoint="/api/v1/customers"
      ListComponent={CustomerList}
      DetailComponent={CustomerDetail}
      updateFields={updateFields}
      createFields={createFields}
    />
  );
};
