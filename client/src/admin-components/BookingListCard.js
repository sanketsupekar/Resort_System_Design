import React, { useEffect, useState } from 'react'
import "../styles/admin-styles/bookingListCard.css";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from '../components/UserFunctions';
import { API_ADMIN_getRoomDetails,API_ADMIN_getCustomerDetails } from '../api';

export default function BookingListCard(props) {
    const navigate = useNavigate();
   const [room,setRoom] = useState({});
   const [customer,setCustomer] = useState({});
   const [dataFetch, setDataFetch] = useState(false);
    async function getCustomerDetails(){
        const respones = await fetchAPI({_id : props.card.customerId}, API_ADMIN_getCustomerDetails, "POST");
        const json = await respones.json();
        setCustomer(json);
        console.log(json);
    }
    async function getRoomDetails()
    {
        // console.log(props.roomId);
        const respones = await fetchAPI({_id : props.card.roomId}, API_ADMIN_getRoomDetails, "POST");
        const json = await respones.json();
        setRoom(json);
        console.log(json);
        
    }
    function handleOnProcessClick()
    {
        navigate("/admin/"+props.card._id);
    }
    useEffect(()=>{
        // console.log(props.card);
        getCustomerDetails();
        getRoomDetails();
        setDataFetch(true);

    },[])
  return (
    <>
    {dataFetch && <div className='booking-list-card'>
        <div className='card-container'>
            <div className='customer-name item'>
            <i class="fa-solid fa-user icon"></i>
                    <h4 className='title'>{customer.firstName +" "+customer.lastName}</h4>
            </div>
            <div></div>
            <div className='room-name item'>
            <i class="fa-solid fa-house icon"></i>
            
                    <p className='title'>{room.title}</p>
            </div>
            <div className='check-in-date item'>
            <i class="fa-solid fa-calendar-days icon"></i>
                    <p className='title'>{new Date(props.card.checkInDate).toDateString()}</p>
            </div>
            <div className='check-out-date item'>
                    <p className='title'>To</p>
            </div>
            <div className='check-out-date item'>
            <i class="fa-solid fa-calendar-days icon"></i>
                    <p className='title'>{new Date(props.card.checkOutDate).toDateString()}</p>
            </div>
            <div>
                <button className='button' onClick={handleOnProcessClick}> Process </button>
            </div>
        </div>
    </div>}
    </>
  )
}
