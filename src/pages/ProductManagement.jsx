import GenericManagement from "../components/shared/GenericManagement";
import ProductList from "../components/products/ProductList";
import { ProductDetail } from "../components/products/ProductDetail";

export const ProductManagement = () => {
  const updateFields = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nama" },
    { key: "price", label: "Harga", type: "number" },
    { key: "type", label: "Tipe" },
  ];

  const createFields = [
    { key: "name", label: "Nama" },
    { key: "price", label: "Harga", type: "number" },
    { key: "type", label: "Tipe" },
  ];

  return (
    <GenericManagement
      title="Produk"
      apiEndpoint="/api/v1/products"
      ListComponent={ProductList}
      DetailComponent={ProductDetail}
      updateFields={updateFields}
      createFields={createFields}
    />
  );
};
