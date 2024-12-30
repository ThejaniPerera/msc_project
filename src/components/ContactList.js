import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContacts, deleteContact } from '../services/contactService';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getContacts()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setContacts(res.data);
                } else {
                    console.error("Invalid data format received.");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch contacts:", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!id || typeof id !== 'number') {
            alert('Invalid contact ID.');
            return;
        }

        const userConfirmed = window.confirm("Are you sure you want to delete this contact?");
        if (!userConfirmed) {
            return;
        }

        try {
            await deleteContact(id);
            setContacts(contacts.filter((contact) => contact.id !== id));
            alert('Contact deleted successfully!');
        } catch (error) {
            console.error("Error deleting contact:", error);
            alert('Failed to delete contact.');
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading contacts...</div>;
    }

    const containerStyle = {
        minHeight: '100vh',
        padding: '20px',
        backgroundImage: 'linear-gradient(135deg, #a8edea, #fed6e3)',
        fontFamily: "'Roboto', sans-serif",
        color: '#333',
    };

    const headerStyle = {
        fontFamily: "'Poppins', sans-serif",
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
    };

    const cardStyle = {
        border: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%', // Ensure equal card heights
    };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    };

    const cardBodyStyle = {
        padding: '15px',
        color: '#555',
        flexGrow: 1, // Makes sure the card body takes up extra space
    };

    const cardFooterStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: '10px 15px',
        borderTop: '1px solid #e0e0e0',
    };

    const deleteButtonStyle = {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const editButtonStyle = {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Welcome to Your Contact List</h1>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add" style={buttonStyle}>
                    Add Contact
                </Link>
            </div>
            <div className="row">
                {contacts.length === 0 ? (
                    <p className="text-center">No contacts available.</p>
                ) : (
                    contacts.map((contact) => (
                        <div className="col-md-4 mb-4" key={contact.id}>
                            <div
                                style={cardStyle}
                                className="contact-card"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = cardHoverStyle.transform;
                                    e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <img
                                    src={`http://localhost:5000${contact.profile_image}`}
                                    alt={contact.name}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div style={cardBodyStyle}>
                                    <h5>{contact.name}</h5>
                                    <p><strong>Address:</strong> {contact.address}</p>
                                    <p><strong>Email:</strong> {contact.email}</p>
                                    <p><strong>Phone Number:</strong> {contact.phone_number}</p>
                                </div>
                                <div style={cardFooterStyle}>
                                    <button
                                        onClick={() => handleDelete(contact.id)}
                                        style={deleteButtonStyle}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/edit/${contact.id}`} style={editButtonStyle}>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContactList;
