import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBusiness } from "../../../store/businesses";
import { useModal } from "../../../context/Modal";

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

    // Use useEffect to update the local state when Redux state changes
    useEffect(() => {
        if (updatedBusiness) {
            setName(updatedBusiness.name);
            setAddress(updatedBusiness.address);
            setDescription(updatedBusiness.description);
            setHours(updatedBusiness.hours); // Update for new field
            setCity(updatedBusiness.city); // Update for new field
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
        <>
            <div>Update a Business</div>
            <form onSubmit={handleUpdateBusiness}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Hours
                    <input
                        type="text"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <button type="submit">Update Business</button>
            </form>
        </>
    );
};

export default UpdateBusinessForm;
