import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FcOk } from "react-icons/fc";

import { FaCirclePlus, FaArrowRight } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { AppContext } from "../../context/AppContext";
import { Oval } from "react-loader-spinner";
const apiStatus = [
  {
    initial: "INITIAL",
    inProgress: "IN_PROGRESSING",
    success: "SUCCESS",
    failure: "FAILURE",
  },
];

const BookingDetails = () => {
  const { state, setState } = useContext(AppContext);
  const { checkIn, checkOut, roomsCount, isOrderPlaced } = state;
  console.log(isOrderPlaced);
  // const [isOrderPlaced, setPlaceOrder] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    mail: "",
    phoneNo: "",
    adult: "",
    child: "",
  }); // initial user Dummy data
  const [errorMsg, setErrorMsg] = useState(false);

  const [currentApiStatus, setApiStatus] = useState(apiStatus[0].initial);

  const diffInMs = Math.abs(checkOut - checkIn);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const payment = 1775 * parseInt(roomsCount) * (diffInDays + 1) + 5;

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

  //on change username
  const onChangeName = (e) => {
    setUserData((preVal) => ({
      ...preVal,
      name: e.target.value,
    }));
  };

  //on change mail
  const onChangeMail = (e) => {
    setUserData((preVal) => ({
      ...preVal,
      mail: e.target.value,
    }));
  };

  //on change phone number
  const onChangePhoneNo = (e) => {
    setUserData((preVal) => ({
      ...preVal,
      phoneNo: e.target.value,
    }));
  };

  //on change adult count
  const onChangeAdult = (e) => {
    setUserData((preVal) => ({
      ...preVal,
      adult: e.target.value,
    }));
  };

  //on change children count
  const onChangeChildren = (e) => {
    setUserData((preVal) => ({
      ...preVal,
      child: e.target.value,
    }));
  };

  //posting data to JSONPlaceholder mock api
  const storeDataInDatabase = async (data) => {
    setApiStatus(apiStatus[0].inProgress);
    const url = "https://jsonplaceholder.typicode.com/posts/1"; // taken from JSONPlaceholder mock api
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer {Access-token}", // this line for security checkup access with jwt token
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        setApiStatus(apiStatus[0].failure);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setApiStatus(apiStatus[0].success);
      setUserData(responseData);
      // console.log(responseData);
    } catch (e) {
      console.log("Error:", e.message);
    }
  };

  // on Clicking Book button
  const onClickBookRoomBtn = () => {
    const { name, mail, phoneNo, adult, child } = userData;

    if ([name, mail, phoneNo, adult, child].every((value) => value !== "")) {
      // setUserData({ name, mail, phoneNo, adult, child });
      setState((state) => ({
        ...state,
        isOrderPlaced: true,
      })); // order confirm
      const data = {
        name: name,
        mail: mail,
        phoneNo: phoneNo,
        adult: adult,
        child: child,
      }; // creating a object to send data to backend
      storeDataInDatabase(data);
      setErrorMsg(false); // updating no error
    } else {
      setErrorMsg(true);
    }
  };

  //on clicking return booking button
  const onClickReturnBooking = () => {
    setState((state) => ({
      ...state,
      isOrderPlaced: false,
    }));
    setErrorMsg(false);
  };

  //rendering Booking form
  const renderRoomBookingForm = () => {
    return (
      <>
        <div className="booking-banner-card">
          <form className="booking-form-container">
            <input
              onChange={onChangeName}
              type="text"
              placeholder="Enter your name"
              className="name-mail-number"
            />
            <input
              onChange={onChangeMail}
              type="text"
              placeholder="Enter your email"
              className="name-mail-number"
            />
            <input
              onChange={onChangePhoneNo}
              type="number"
              placeholder="Enter your phone number"
              className="name-mail-number"
            />
            <input
              onChange={onChangeAdult}
              type="number"
              placeholder="Adults"
              className="adult-child-input"
            />
            <input
              onChange={onChangeChildren}
              type="number"
              placeholder="Children"
              className="adult-child-input"
            />
          </form>
          {errorMsg && (
            <p className="error-msg">
              Some field(s) are missing. Fill the all details.
            </p>
          )}
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
                <FaRupeeSign className="rupee-icon" />
                <span className="payment-text">{payment.toLocaleString()}</span>

                <span className="arrow-icon-right">
                  <FaArrowRight />
                </span>
              </button>
            </Link>
            <p className="click-to-pay-text">Click to pay token amount</p>
          </div>
        </div>
      </>
    );
  };

  // rendering order confirm view
  const renderOrderConfirm = () => {
    const { name, mail, phoneNo, adult, child } = userData;
    return (
      <>
        <div className="booking-banner-card booking-done">
          <div className="user-booking-details">
            <h2>{name}</h2>
            <p>{mail}</p>
            <p>{phoneNo}</p>
            <p>
              {adult} Adults and {child} Children
            </p>
          </div>
          <hr className="booking-done-hr" />
          <div className="booking-done-cont">
            <FcOk className="right-tick-icon" />
            <div className="order-contact-cont">
              <h3>Order Complete</h3>
              <p>Have questions?</p>
              <p className="read-more">contact us</p>
            </div>
          </div>
        </div>

        <div className="home-banner-booking-card">
          {/* Check-in Time  */}
          <div className="booking-options">
            <label>CHECK-IN</label>
            <div className="check-in-date-cont">
              <div>
                <DatePicker
                  disabled={true}
                  className="date-picker"
                  selected={checkIn}
                  dateFormat="dd MMM yyyy" // Ensures the display is in "01 Feb 2022" format
                />
              </div>
            </div>
          </div>
          <hr />

          {/* Check-out Time  */}
          <div className="booking-options">
            <label>CHECK-OUT</label>
            <div className="check-in-date-cont">
              <div>
                <DatePicker
                  disabled={true}
                  className="date-picker"
                  selected={checkOut < checkIn ? checkIn : checkOut}
                  onChange={onCheckOut}
                  dateFormat="dd MMM yyyy" // Ensures the display is in "01 Feb 2022" format
                />
              </div>
            </div>
          </div>
          <hr />

          {/* Rooms Count  */}
          <div className="booking-options">
            <label>ROOMS</label>
            <div className="inc-dec-btn-cont">
              <span className="room-count">{roomsCount}</span>
            </div>
          </div>

          {/* Book Room Button  */}
          <div className="booking-options">
            <Link to="/booking" className="button-link">
              <button className="booking-btn">
                <FaRupeeSign className="rupee-icon-done" />
                <span className="payment-text">{payment.toLocaleString()}</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="return-home-btn-cont">
          <Link to="/" onClick={onClickReturnBooking}>
            <button className="home-btn">Home</button>
          </Link>
          <Link to="/booking">
            <button className="return-btn" onClick={onClickReturnBooking}>
              Return to Booking
            </button>
          </Link>
        </div>
      </>
    );
  };

  // rendering loader view
  const renderLoaderView = () => (
    <div className="loading-view-cont">
      <Oval height={80} width={80} color="blue" ariaLabel="loading" />
    </div>
  );

  //rendering failure view / for any bad requests
  const renderFailureView = () => {
    return (
      <div>
        <h3>Oops! Something Error</h3>
        <p>Retry again!</p>
      </div>
    );
  };

  // rendering order confirm view according to the api status
  const renderMainProject = () => {
    switch (currentApiStatus) {
      case "SUCCESS":
        return renderOrderConfirm();
      case "IN_PROGRESSING":
        return renderLoaderView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="room-booking-details-bg-container">
      {isOrderPlaced ? (
        <>{renderMainProject()}</>
      ) : (
        <>{renderRoomBookingForm()}</>
      )}
    </div>
  );
};

export default BookingDetails;