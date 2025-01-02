import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function FeatureCard(props) {
  return (
    <Card
      className="w-[300px] md:h-[50vh] space-y-5 p-4 bg-opacity-80 hover:shadow-[0_0_20px_10px_#2ea1b8] transition duration-300 ease-in-out md:hover:-translate-y-5"
      radius="lg"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-primary">
        <h4 className="font-bold text-3xl text-center">{props.title}</h4>
      </CardHeader>
      <CardBody className=" items-center">
        <Image alt="Icon Product" src={props.image} width={100} />
      </CardBody>
      <CardBody className=" bg-primary bg-opacity-80">
        <ul className="list-disc mx-4 text-white">
          {props.listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

FeatureCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  listItems: PropTypes.array,
};
