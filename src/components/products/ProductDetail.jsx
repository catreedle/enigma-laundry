import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { DetailModal } from "../shared/modals/DetailModal";

export const ProductDetail = ({ item, onClose }) => {
  const productDetails = [
    { label: "Id", value: item.id },
    { label: "Nama", value: item.name },
    { label: "Harga", value: formatCurrency(item.price) },
    { label: "Tipe", value: item.type },
    { label: "Tanggal dibuat", value: formatDate(item.createdAt) },
    { label: "Tanggal diupdate", value: formatDate(item.updatedAt) },
  ];

  return (
    <DetailModal
      title="Detail Produk"
      details={productDetails}
      isOpen={true}
      onClose={onClose}
    />
  );
};

ProductDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
