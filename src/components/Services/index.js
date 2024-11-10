import "./index.css";
import { MdWifi } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { FaCar } from "react-icons/fa6";
import { IoBicycle } from "react-icons/io5";
import { IoMapSharp } from "react-icons/io5";
import { RiFlagFill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";

const servicesArray = [
  {
    id: 0,
    logo: <MdWifi />,
    text: "High Speed Internet",
    about:
      "Optical fiber connections provided in not only in your cabins but rather to all of the BriSphere scenic working spaces and dinning areas.",
  },
  {
    id: 1,
    logo: <MdFastfood />,
    text: "Healthy Meals",
    about:
      " A healthy breakfast and pleasant dinner will be serviced at your space every single day for your entire duration of stay with option of paid order within BriSphere. ",
  },
  {
    id: 2,
    logo: <GoHome />,
    text: "Homely Stay",
    about:
      "Designed for working professionals with spacious interiors, comfortable beds and sleekly attached kitchen are some of the comforts provided in your space.",
  },
  {
    id: 3,
    logo: <FaCar />,
    text: "Transportation",
    about:
      "Optical fiber connections provided in not only in your cabins but rather to all of the BriSphere scenic working spaces and dinning areas.",
  },
  {
    id: 4,
    logo: <IoBicycle />,
    text: "Food Delivery",
    about:
      "Optical fiber connections provided in not only in your cabins but rather to all of the BriSphere scenic working spaces and dinning areas.",
  },
  {
    id: 5,
    logo: <IoMapSharp />,
    text: "Tourism",
    about:
      "Optical fiber connections provided in not only in your cabins but rather to all of the BriSphere scenic working spaces and dinning areas.",
  },
  {
    id: 6,
    logo: <RiFlagFill />,
    text: "Job",
    about:
      "Optical fiber connections provided in not only in your cabins but rather to all of the BriSphere scenic working spaces and dinning areas.",
  },
  {
    id: 7,
    logo: <FaCar />,
    text: "Rental Service",
    about:
      "Optical fiber connections provided in not only in your cabins but rather to all of the BriSphere scenic working spaces and dinning areas.",
  },
  {
    id: 8,
    logo: <MdShoppingCart />,
    text: "Online Shop",
    about:
      "Optical fiber connections provided in not only in your cabins but rather to all of the BriSphere scenic working spaces and dinning areas.",
  },
];

const Services = () => {
  return (
    <div className="services-bg-container">
      <h3>Services</h3>

      <ul className="services-cards-cont">
        {servicesArray.map((eachItem) => (
          <li className="service-card" key={eachItem.id}>
            <span className="service-logo"> {eachItem.logo}</span>
            <h4 className="service-name">{eachItem.text}</h4>
            <p>{eachItem.about}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
