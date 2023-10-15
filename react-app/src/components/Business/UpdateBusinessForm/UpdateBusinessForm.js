import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBusiness } from "../../../store/businesses";
import { useModal } from "../../../context/Modal";
import './UpdateBusinessForm.css'

const UpdateBusinessForm = ({ business }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { updatedBusiness } = useSelector((state) => state.businesses);
    const { closeModal } = useModal();

    const [name, setName] = useState(business.name);
    const [address, setAddress] = useState(business.address);
    const [description, setDescription] = useState(business.description);
    const [hours, setHours] = useState(business.hours); // Placeholder new field
    const [city, setCity] = useState(business.city); // Placeholder new field
    const [state, setState] = useState(business.state); // New "state" field

    // Use useEffect to update the local state when Redux state changes
    useEffect(() => {
        if (updatedBusiness) {
            setName(updatedBusiness.name);
            setAddress(updatedBusiness.address);
            setDescription(updatedBusiness.description);
            setHours(updatedBusiness.hours); // Update for new field
            setCity(updatedBusiness.city); // Update for new field
            setState(updatedBusiness.state); // Update for new "state" field
        }
    }, [updatedBusiness]);

    const handleUpdateBusiness = async (e) => {
        e.preventDefault();

        const payload = {
            business: {
                name,
                address,
                description,
                hours, // Include new field
                city, // Include new field
                state, // Include new "state" field
            },
            businessId: business.id,
        };

        console.log("Payload before dispatch:", payload);

        try {
            const updatedBusiness = await dispatch(updateBusiness(payload));
            console.log("Updated Business:", updatedBusiness);

            if (updatedBusiness) {
                closeModal();
                history.push(`/businesses/${business.id}`);
            }
        } catch (err) {
            console.error("Error updating business:", err);
        }
    };

    return (
        <div className="update-business-container">
            <div className="update-business-header">Update a Business</div>
            <form onSubmit={handleUpdateBusiness}>
                <label className="label">
                    Name
                    <input
                        type="text"
                        className="input-text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="label">
                    Address
                    <input
                        type="text"
                        className="input-text"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label className="label">
                    Description
                    <textarea
                        className="text-area"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label className="label">
                    Hours
                    <input
                        type="text"
                        className="input-text"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                    />
                </label>
                <label className="label">
                    City
                    <input
                        type="text"
                        className="input-text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label className="label">
                    State
                    <input
                        type="text"
                        className="input-text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <button type="submit" className="submit-button">Update Business</button>
            </form>
        </div>
    );
};

export default UpdateBusinessForm;
