import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { DetailModal } from "../shared/modals/DetailModal";
import PropTypes from "prop-types";

export const TransactionDetail = ({ transaction, onClose }) => {
  const transactionDetails = [
    { label: "Id", value: transaction.id },
    { label: "Tanggal Transaksi", value: transaction.billDate },
    { label: "Produk", value: transaction.billDetails[0].product.name },
    {
      label: "Qty",
      value:
        transaction.billDetails[0].qty +
        " " +
        transaction.billDetails[0].product.type,
    },
    { label: "Harga", value: formatCurrency(transaction.billDetails[0].price) },
    { label: "Nama Pelanggan", value: transaction.customer.name },
    { label: "Nama Petugas", value: transaction.user.name },
    { label: "Tanggal dibuat", value: formatDate(transaction.createdAt) },
    { label: "Tanggal diupdate", value: formatDate(transaction.updatedAt) },
  ];

  return (
    <DetailModal
      title="Detail Transaksi"
      details={transactionDetails}
      isOpen={true}
      onClose={onClose}
    />
  );
};

TransactionDetail.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    billDate: PropTypes.string,
    billDetails: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.string,
        }),
        qty: PropTypes.number,
        price: PropTypes.number,
      })
    ),
    customer: PropTypes.shape({
      name: PropTypes.string,
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
