import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBusiness, getSelectedBusiness } from "../../../store/businesses"; // Ensure this import is correct
import { useModal } from "../../../context/Modal";
import './UpdateBusinessForm.css';

const UpdateBusinessForm = ({ business }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false); // Added to track update status, similar to UpdateReviewForm

    // Extracting business properties
    const [name, setName] = useState(business.name);
    const [address, setAddress] = useState(business.address);
    const [description, setDescription] = useState(business.description);
    const [hours, setHours] = useState(business.hours);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);

    const handleUpdateBusiness = async (e) => {
        e.preventDefault();

        // Validations
        const errorsObj = {};

        // Your validation logic here...

        if(Object.keys(errorsObj).length > 0) {
            setErrors(errorsObj);
            return;
        }

        // Preparing payload
        const payload = {
            business: { name, address, description, hours, city, state },
            businessId: business.id,
        };

        try {
            setIsUpdating(true); // Set updating status

            // Log the state before sending
            console.log("State before sending:", {
                name,
                address,
                description,
                hours,
                city,
                state,
            });

            const updatedBusiness = await dispatch(updateBusiness(payload));
            if (!updatedBusiness) {
                throw new Error("An error occurred while updating the business.");
            }

            setErrors({});
            closeModal();
            setIsUpdating(false);

            // Refresh the business data
            dispatch(getSelectedBusiness(updatedBusiness.id));
        } catch (err) {
            console.error("Error updating business:", err);
            setErrors(["An error occurred while updating the business."]);
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        let isMounted = true; // initially, the component is mounted

        // ... other code inside useEffect ...

        return () => {
            isMounted = false; // set it to false when the component unmounts
        };
    }, [business, closeModal, dispatch]);

    return (
        <div className="update-business-container">
            <div className="update-business-header">Update a Business</div>
            <form onSubmit={handleUpdateBusiness}>
                <ul className="error-list">
                    {Object.values(errors).map((error, idx) => (<li key={idx}>{error}</li>))}
                </ul>
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
                <button className="submit-button" type="submit" disabled={isUpdating}>Update Business</button>
            </form>
        </div>
    );
};

export default UpdateBusinessForm;
