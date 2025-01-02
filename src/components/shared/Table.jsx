import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ActionButton } from "./ActionButton";
import PropTypes from "prop-types";

export const Table = ({ headers, data, actions }) => {
  const getNestedValue = (item, key) => {
    const keys = key.split(".");
    return keys.reduce((obj, key) => (obj && obj[key]) || "", item);
  };

  return (
    <NextUITable aria-label="List Table">
      <TableHeader columns={[...headers, { key: "actions", label: "Actions" }]}>
        {(header) => (
          <TableColumn className="bg-primary text-white" key={header.key}>
            {header.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {headers.map((header) => (
              <TableCell key={header.key}>
                {getNestedValue(item, header.key)}
              </TableCell>
            ))}
            <TableCell key="actions" className="flex flex-row gap-1">
              {actions.map((action) => (
                <ActionButton
                  key={action.key}
                  tooltip={action.tooltip}
                  iconSrc={action.iconSrc}
                  color={action.color}
                  onClick={() => action.onClick(item)}
                  ariaLabel={action.ariaLabel}
                />
              ))}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  );
};

Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  actions: PropTypes.array,
};
