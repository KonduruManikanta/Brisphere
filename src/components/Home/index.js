import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FaFacebook, FaCaretDown } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { RiInstagramFill } from "react-icons/ri";

import Discover from "../Discover";

import Services from "../Services";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import "./index.css";

const Home = () => {
  const { state, setState } = useContext(AppContext);
  const { checkIn, checkOut, roomsCount } = state;

  //updating check-in date
  const onCheckInDate = (date) => {
    setState((state) => ({
      ...state,
      checkIn: date,
    }));
  };

  //updating check-out date
  const onCheckOut = (date) => {
    setState((state) => ({
      ...state,
      checkOut: date,
    }));
  };

  //decrement button function
  const onDecrementBtn = () => {
    if (roomsCount > 1) {
      return setState((state) => ({
        ...state,
        roomsCount: state.roomsCount - 1,
      }));
    } else {
      return null;
    }
  };

  // increment button function
  const onIncrementBtn = () => {
    if (roomsCount < 5) {
      return setState((state) => ({
        ...state,
        roomsCount: state.roomsCount + 1,
      }));
    } else {
      return null;
    }
  };

  const onClickBookRoomBtn = () => {};

  const renderHomeBannerSection = () => (
    <div className="home-banner-bg-container">
      <div className="home-banner-card">
        <div className="home-banner-content">
          <h2 className="home-banner-head">Work from ladakh</h2>
          <p>India’s first true digital tourism ecosystem</p>
          <FaFacebook className="social-media-icons" />
          <RiInstagramFill className="social-media-icons" />
        </div>
        <img
          src="https://res.cloudinary.com/dhfhuqtqi/image/upload/v1731045086/BP-1_sxuatu.jpg"
          className="home-banner-img"
          alt="ladakh-img"
        />
      </div>

      <div className="home-banner-booking-card">
        {/* Check-in Time  */}
        <div className="booking-options">
          <label>CHECK-IN</label>
          <div className="check-in-date-cont">
            <div>
              <DatePicker
                minDate={new Date()}
                className="date-picker"
                selected={checkIn}
                onChange={onCheckInDate}
                dateFormat="dd MMM yyyy" // Ensures the display is in "01 Feb 2022" format
                placeholderText="Select a date"
              />
            </div>
            <FaCaretDown className="arrow-icon" />
          </div>
        </div>
        <hr />

        {/* Check-out Time  */}
        <div className="booking-options">
          <label>CHECK-OUT</label>
          <div className="check-in-date-cont">
            <div>
              <DatePicker
                minDate={checkIn}
                className="date-picker"
                selected={checkOut < checkIn ? checkIn : checkOut}
                onChange={onCheckOut}
                dateFormat="dd MMM yyyy" // Ensures the display is in "01 Feb 2022" format
                placeholderText="Select a date"
              />
            </div>
            <FaCaretDown className="arrow-icon" />
          </div>
        </div>
        <hr />

        {/* Rooms Count  */}
        <div className="booking-options">
          <label>ROOMS</label>
          <div className="inc-dec-btn-cont">
            <button className="inc-dec-btn" onClick={onDecrementBtn}>
              <FiMinusCircle className="inc-dec-btn-icon" />
            </button>
            <span className="room-count">{roomsCount}</span>
            <button className="inc-dec-btn" onClick={onIncrementBtn}>
              <FaCirclePlus className="inc-dec-btn-icon" />
            </button>
          </div>
        </div>

        {/* Book Room Button  */}
        <div className="booking-options">
          <Link to="/booking" className="button-link">
            <button className="booking-btn" onClick={onClickBookRoomBtn}>
              Book
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="home-bg-container">
      {renderHomeBannerSection()}
      <Discover />
      <Services />
    </div>
  );
};

export default Home;
