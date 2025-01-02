import { Table } from "../shared/Table";
import { withCardWrapper } from "../../hoc/withCardWrapper";
import iconView from "../../assets/icon-view.svg";
import iconUpdate from "../../assets/icon-update.svg";
import iconDelete from "../../assets/icon-delete.svg";
import PropTypes from "prop-types";

const headers = [
  {
    key: "name",
    label: "Nama",
  },
  {
    key: "phoneNumber",
    label: "No. Telepon",
  },
  {
    key: "address",
    label: "Alamat",
  },
];

function CustomerList({ onView, onDelete, onUpdate, data }) {
  const actions = [
    {
      key: "view",
      tooltip: "View",
      iconSrc: iconView,
      color: "success",
      onClick: onView,
      ariaLabel: "view",
    },
    {
      key: "update",
      tooltip: "update",
      iconSrc: iconUpdate,
      color: "warning",
      onClick: onUpdate,
      ariaLabel: "update",
    },
    {
      key: "delete",
      tooltip: "Delete",
      iconSrc: iconDelete,
      color: "danger",
      onClick: onDelete,
      ariaLabel: "delete",
    },
  ];
  return data && <Table headers={headers} data={data} actions={actions} />;
}

CustomerList.propTypes = {
    title: PropTypes.string,
    onView: PropTypes.func,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    data: PropTypes.array
}

export default withCardWrapper(CustomerList);
