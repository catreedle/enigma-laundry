import { withCardWrapper } from "../../hoc/withCardWrapper";
import { formatDate } from "../../utils/formatDate";
import { Table } from "../shared/Table";
import iconView from "../../assets/icon-view.svg";
import PropTypes from "prop-types";

const headers = [
  {
    key: "id",
    label: "Id",
  },
  {
    key: "billDate",
    label: "Tanggal Transaksi",
  },
  {
    key: "customer.name",
    label: "Nama Pelanggan",
  },
  {
    key: "user.name",
    label: "Petugas",
  },
];

function TransactionList({ onView, data }) {
  const formattedData = data?.map((item) => ({
    ...item,
    billDate: formatDate(item.billDate),
  }));

  return (
    data && (
      <Table
        headers={headers}
        data={formattedData}
        actions={[
          {
            key: "view",
            tooltip: "View",
            iconSrc: iconView,
            color: "success",
            onClick: onView,
            ariaLabel: "view",
          },
        ]}
      />
    )
  );
}

TransactionList.propTypes = {
  title: PropTypes.string,
  onView: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      billDate: PropTypes.string,
      customer: PropTypes.shape({
        name: PropTypes.string,
      }),
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
};

export default withCardWrapper(TransactionList);
