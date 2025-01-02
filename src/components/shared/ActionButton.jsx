import { Button, Tooltip } from "@nextui-org/react";
import PropTypes from "prop-types";

export const ActionButton = ({
  tooltip,
  iconSrc,
  color,
  onClick,
  ariaLabel,
}) => {
  return (
    <Tooltip placement="bottom" content={tooltip}>
      <Button
        size="sm"
        radius="full"
        isIconOnly
        aria-label={ariaLabel}
        color={color}
        onPress={onClick}
      >
        <img
          src={iconSrc}
          alt={ariaLabel}
          style={{ width: "20px", height: "20px" }}
        />
      </Button>
    </Tooltip>
  );
};

ActionButton.propTypes = {
  tooltip: PropTypes.string,
  iconSrc: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};
