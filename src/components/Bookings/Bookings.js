import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    useEffect(()=>{
        // using query paramter for reading specific users email 
        fetch('http://localhost:4200/bookings?email='+ loggedInUser.email, {
            //third step second part
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=> res.json())
        .then(data => setBookings(data))
    },[])
    return (
        <div>
            <h1>You have {bookings.length} Bookings</h1>
            {
                bookings.map(book => <li>From: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} To: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;