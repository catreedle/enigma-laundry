import PropTypes from "prop-types";
import { Card, CardHeader } from "@nextui-org/react";

export function withCardWrapper(Component) {
  function CardWrapper({ title, data, headers, ...props }) {
    return (
      <Card className="w-full mx-24 my-7 p-8 self-center border-2 border-primary">
        <CardHeader>
          <h4 className="text-medium font-semibold">Daftar {title}</h4>
        </CardHeader>
        <Component data={data} headers={headers} {...props} />
      </Card>
    );
  }

  CardWrapper.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    headers: PropTypes.array,
  };

  return CardWrapper;
}
