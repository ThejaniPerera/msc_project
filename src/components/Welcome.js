import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    const containerStyle = {
        backgroundImage: `url('/1.jpg')`, // Path to the image in the public folder
        backgroundSize: 'cover', // Ensures the image covers the entire container
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        minHeight: '100vh', // Full screen height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', // Centers text alignment
        padding: '20px', // Adds padding for better spacing
    };

    const headingStyle = {
        color: '#ffffff', // White color
        fontWeight: 'bold', // Bold text
        fontSize: '3rem', // Larger font size
        fontFamily: "'Poppins', sans-serif", // Modern font
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)', // Adds shadow to make text pop
    };

    const subheadingStyle = {
        color: '#f0f0f0', // Light gray color
        fontSize: '1.5rem', // Medium font size
        fontFamily: "'Roboto', sans-serif", // Clean font for subtext
        marginBottom: '30px', // Adds spacing below subtext
        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)', // Subtle shadow
    };

    const buttonStyle = {
        backgroundColor: '#ff5733', // Button background color
        color: 'white', // Button text color
        border: 'none', // Removes button border
        padding: '15px 30px', // Adds padding to the button
        fontSize: '1rem', // Button text size
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Changes cursor to pointer
        fontWeight: 'bold', // Bold button text
        transition: 'transform 0.3s, background-color 0.3s', // Smooth hover effect
    };

    const handleHover = {
        transform: 'scale(1.05)', // Slightly enlarge the button on hover
        backgroundColor: '#e84e2f', // Darker shade on hover
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Welcome to the Contact Management System</h1>
            <p style={subheadingStyle}>
                Manage your contacts efficiently and effortlessly!
            </p>
            <button
                onClick={() => navigate('/contacts')}
                className="btn btn-lg"
                style={buttonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, handleHover)}
                onMouseLeave={(e) =>
                    Object.assign(e.target.style, {
                        transform: 'scale(1)',
                        backgroundColor: '#ff5733',
                    })
                }
            >
                Go to Contacts
            </button>
        </div>
    );
};

export default Welcome;
