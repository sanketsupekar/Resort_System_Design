import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/components/bookWidget.css";

function BookWidget(props) {
  const [formData, setFormData] = useState({
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalDays: 1,
    adults: 0,
    childrens: 0,
  });
  const [checkInDate, setStartDate] = useState(new Date());
  const [checkOutDate, setEndDate] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  function handleCheckAvailability() {
    // console.log(formData);
    props.handleCheckAvailability(formData);
  }
  function totalDaysSelected() {
    const timeDifference = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return totalDays + 1;
  }

  useEffect(() => {
    if (checkInDate > checkOutDate) {
      setEndDate(checkInDate);
    }
  }, [checkInDate]);
  useEffect(() => {
    setFormData({
      ...formData,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalDays: totalDaysSelected(),
      adults: adultCount,
      childrens: childrenCount,
    });
  }, [checkInDate, checkOutDate, adultCount, childrenCount]);
  return (
    <>
      <div className="book_widget">
        <div className="book_widget_container">
          <div className="date_picker">
            <div className="start_date_container">
              <label className="date_picker_lable">Check-In </label>
              <DatePicker
                className="start_picker"
                selected={checkInDate}
                onChange={handleStartDateChange}
                selectsStart
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 60)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            {/* <label> TO </label> */}
            <div className="end_date_container">
              <label className="date_picker_lable">Check-Out </label>
              <DatePicker
                className="end_picker"
                selected={checkOutDate}
                onChange={handleEndDateChange}
                selectsEnd
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                minDate={checkInDate}
                maxDate={new Date().setDate(checkInDate.getDate() + 30)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            {/* <div className="total_days">
          <label>Total Days: {totalDays} </label>
        </div> */}
          </div>
          <div className="person_picker">
            <div className="adult_picker">
              <label className="person_lable">Adult</label>
              <div className="person_count">
                <i
                  className="fa-solid fa-plus"
                  onClick={() => {
                    setAdultCount(adultCount + 1);
                  }}
                ></i>
                <label>{adultCount}</label>
                <i
                  className="fa-solid fa-minus"
                  onClick={() => {
                    setAdultCount(adultCount > 1 ? adultCount - 1 : adultCount);
                  }}
                ></i>
              </div>
            </div>
            <div className="children_picker">
              <label className="person_lable"> Children</label>
              <div className="person_count">
                <i
                  className="fa-solid fa-plus"
                  onClick={() => {
                    setChildrenCount(childrenCount + 1);
                  }}
                ></i>
                <label>{childrenCount}</label>
                <i
                  className="fa-solid fa-minus"
                  onClick={() => {
                    setChildrenCount(
                      childrenCount > 0 ? childrenCount - 1 : childrenCount
                    );
                  }}
                ></i>
              </div>
            </div>
          </div>
          <div className="check_availability">
            <button
              className="availability_button"
              onClick={handleCheckAvailability}
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BookWidget;
