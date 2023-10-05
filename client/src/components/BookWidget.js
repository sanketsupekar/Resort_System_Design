import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/components/bookWidget.css";

function BookWidget(props) {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    totalDay: 1,
    adult: 0,
    children: 0,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  function handleCheckAvailability() {
    props.handleCheckAvailability(formData);
  }
  function totalDaysSelected() {
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return totalDays + 1;
  }

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);
  useEffect(() => {
    setTotalDays(totalDaysSelected);
    setFormData({
      ...formData,
      startDate: startDate,
      endDate: endDate,
      totalDay: totalDaysSelected(),
      adult: adultCount,
      children: childrenCount,
    });
  }, [startDate, endDate, adultCount, childrenCount]);
  return (
    <>
      <div className="book_widget">
        <div className="book_widget_container">
          <div className="date_picker">
            <div className="start_date_container">
              <label className="date_picker_lable">Check-In </label>
              <DatePicker
                className="start_picker"
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
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
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date().setDate(startDate.getDate() + 30)}
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
