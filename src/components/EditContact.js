import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateContact, getContactById } from '../services/contactService';

const EditContact = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');

    useEffect(() => {
        getContactById(id)
            .then((res) => {
                const { name, address, email, phone_number, profile_image } = res.data;
                setName(name);
                setAddress(address);
                setEmail(email);
                setPhoneNumber(phone_number);
                setExistingImage(profile_image);
            })
            .catch((error) => {
                console.error("Error fetching contact:", error);
                alert("Failed to fetch contact details.");
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('phone_number', phone_number);
        if (profileImage) formData.append('profile_image', profileImage);

        try {
            await updateContact(id, formData);
            alert('Contact updated successfully!');
        } catch (error) {
            alert('Failed to update contact.');
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
            <h1 className="text-center mb-4" style={{ color: '#5A5A5A' }}>Edit Contact</h1>
            <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded" style={{ backgroundColor: '#F9F9F9' }}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label" style={{ color: '#555' }}>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ borderColor: '#DDD' }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="form-label" style={{ color: '#555' }}>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ borderColor: '#DDD' }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label" style={{ color: '#555' }}>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderColor: '#DDD' }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone_number" className="form-label" style={{ color: '#555' }}>Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone_number"
                        placeholder="Enter phone number"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ borderColor: '#DDD' }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="profileImage" className="form-label" style={{ color: '#555' }}>Profile Image</label>
                    {existingImage ? (
                        <img
                            src={`http://localhost:5000${existingImage}`}
                            alt="Profile"
                            className="img-thumbnail mb-3"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                    ) : (
                        <p style={{ fontSize: '14px', color: '#999' }}>No profile image available</p>
                    )}
                    <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        style={{ borderColor: '#DDD' }}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-success w-100"
                    style={{
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        fontSize: '16px',
                        padding: '10px 0',
                    }}
                >
                    Update Contact
                </button>
            </form>
        </div>
    );
};

export default EditContact;
