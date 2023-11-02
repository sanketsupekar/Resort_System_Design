import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/admin-styles/searchWidget.css";

function SearchWidget (props) {
  const dayStartWith = 9;
  const dayEndWith = 8;

  const initalInDate = new Date();
  const initalOutDate = new Date(
    new Date().setDate(initalInDate.getDate() + 1)
  );

  const [formData, setFormData] = useState({
    checkInDate: initalInDate,
    checkOutDate: initalOutDate,
    searchBar : ""
  });
  const [checkInDate, setStartDate] = useState(initalInDate);
  const [checkOutDate, setEndDate] = useState(initalOutDate);
  const [searchBar, setSearchBar] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // console.log(formData);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    
  };

  const handleSearchClick = (e) =>{
    const {name , value} = e.target;
    setSearchBar(value);

  }
  function handleCheckAvailability(){
    props.dateOnChangeHandle(formData);
  }
  const handleSearchOnChange = (e) =>{
     const {name , value} = e.target;
     setSearchBar(value);
  }
  // Update  checkOutDate when checkIndate is equal to its
  //complete time formate

  function checkInToCheckOut() {
    setEndDate(new Date(checkInDate.getTime() + (24 * 60 * 60 * 1000)));
  }


  useEffect(() => {
    if ( new Date(checkInDate.setHours(0, 0, 0, 0)) >= new Date(checkOutDate.setHours(0, 0, 0, 0))) {
      // console.log("Check_In_Less");
      checkInToCheckOut();
    }
  }, [checkInDate]);
  useEffect(() => {
    setFormData({
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      searchBar : searchBar
    });
  }, [checkInDate, checkOutDate,searchBar]);
  return (
    <>
      <div className="search_widget">
        
        <div className="book_widget_container">
          <div className="date_picker">
            <div className="start_date_container">
              <label className="date_picker_lable">From </label>
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
              <label className="date_picker_lable">To </label>
              <DatePicker
                className="end_picker"
                selected={checkOutDate}
                onChange={handleEndDateChange}
                selectsEnd
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                minDate={new Date().setDate(checkInDate.getDate() + 1)}
                maxDate={new Date().setDate(checkInDate.getDate() + 30)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            {/* <div className="total_days">
          <label>Total Days: {totalDays} </label>
        </div> */}
          </div>
          {/* <div class="wrap">
   <div class="search">
      <input type="text" name="searchBar" value={searchBar} onChange={handleSearchOnChange} class="searchTerm" placeholder="Customer Name / Email / Phone"/>
      <button  onClick={handleSearchClick} class="searchButton">
        <i class="fa fa-search"></i>
     </button>
   </div>
</div> */}
          <div className="check_availability">
            <button
              className="availability_button"
              onClick={handleCheckAvailability}
            >
              Search Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchWidget;
