import React, { useState } from 'react';
import axios from 'axios';

const AddContact = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Phone number validation
        if (!phone_number) {
            setErrorMessage('Phone number is required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('phone_number', phone_number);
        formData.append('profile_image', profileImage);

        try {
            await axios.post('http://localhost:5000/contacts', formData);
            alert('Contact added successfully!');
            setName('');
            setAddress('');
            setEmail('');
            setPhoneNumber('');
            setProfileImage(null);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            // Check if there's a response from the server and display it
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('Failed to add contact. Please try again.');
            }
        }
    };

    const containerStyle = {
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
    };

    const formContainerStyle = {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
    };

    const headerStyle = {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    };

    const labelStyle = {
        fontWeight: '500',
        fontSize: '1rem',
        marginBottom: '5px',
    };

    const inputStyle = {
        borderRadius: '10px',
        border: '1px solid #ccc',
        padding: '10px 15px',
        fontSize: '1rem',
        width: '100%',
        marginBottom: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer',
        width: '100%',
        textTransform: 'uppercase',
        transition: 'background-color 0.3s ease-in-out',
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049',
    };

    const errorMessageStyle = {
        color: 'red',
        fontSize: '0.9rem',
        marginBottom: '10px',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h1 style={headerStyle}>Add Contact</h1>
                {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" style={labelStyle}>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" style={labelStyle}>Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" style={labelStyle}>Phone Number</label>
                        <input
                            type="tel"
                            id="phone_number"
                            placeholder="Enter phone number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profileImage" style={labelStyle}>Profile Image</label>
                        <input
                            type="file"
                            id="profileImage"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            style={inputStyle}
                        />
                    </div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                    >
                        Add Contact
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddContact;
