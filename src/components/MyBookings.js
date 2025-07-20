import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../styles/MyBookings.css';
import { useState } from "react";

const MyBooking = () => {

    const [bookings, setBookings] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ name: '', phoneNumber: '' });

    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/booking', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await res.json();
            setBookings(data);
        }
        catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            await fetch(`http://localhost:8080/api/booking/${id}`, {
                method: 'DELETE',
                 headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            fetchBookings();
        }
    }

    const handleEdit = (booking) => {
        setEditId(booking.id);
        setEditData({ name: booking.name, phoneNumber: booking.phoneNumber });
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditData({ name: '', phoneNumber: '' });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/booking/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editData),
            });
            if (!response.ok) {
                throw new Error('Failed to update booking');
            }
            setEditId(null);
            setEditData({ name: '', phoneNumber: '' });
            fetchBookings();
        }
        catch (error) {
            console.error('Error updating booking:', error);
        }
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="my-bookings-container">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={booking.id} className="booking-item">
                            {editId === booking.id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleEditChange}
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={editData.phoneNumber}
                                        onChange={handleEditChange}
                                        placeholder="Phone Number"
                                    />
                                    <button className="save-button" onClick={handleEditSave}>
                                        Save
                                    </button>
                                    <button className="cancel-button" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <strong>Name:</strong> {booking.name}<br />
                                    <strong>Phone:</strong> {booking.phoneNumber}<br />
                                    <button className="edit-button" onClick={() => handleEdit(booking)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(booking.id)}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );


}
export default MyBooking;