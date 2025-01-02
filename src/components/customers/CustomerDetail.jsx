import PropTypes from "prop-types";
import { formatDate } from "../../utils/formatDate";
import { DetailModal } from "../shared/modals/DetailModal";

export const CustomerDetail = ({ item, onClose }) => {
  const customerDetails = [
    { label: "Id", value: item.id },
    { label: "Nama", value: item.name },
    { label: "No. Telepon", value: item.phoneNumber },
    { label: "Alamat", value: item.address },
    { label: "Tanggal dibuat", value: formatDate(item.createdAt) },
    { label: "Tanggal diupdate", value: formatDate(item.updatedAt) },
  ];

  return (
    <DetailModal
      title="Detail Customer"
      details={customerDetails}
      isOpen={true}
      onClose={onClose}
    />
  );
};

CustomerDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
