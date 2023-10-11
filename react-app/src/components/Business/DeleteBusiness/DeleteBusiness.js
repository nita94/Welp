import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBusiness, getBusinesses } from "../../../store/businesses";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import './DeleteBusiness.css';

const DeleteBusiness = ({ businessId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteBusiness = async (e) => {
        e.preventDefault();
        setShowConfirm(true);
    }

    const confirmDelete = async () => {
        await dispatch(deleteBusiness(businessId));
        await dispatch(getBusinesses());
        history.push('/businesses');
        closeModal(); // Close the modal after deleting the business
    }

    const cancelDelete = () => {
        closeModal(); // Close the modal if the user cancels the deletion
    }
    
    return (
        <div className="delete-business-container">
            <h2>Delete Business</h2>
            {showConfirm ? (
                <>
                    <p>Are you sure you want to delete this business?</p>
                    <button onClick={confirmDelete} className="common-button">Yes, Delete</button>
                   
                    <button onClick={cancelDelete} className="common-button">Cancel</button>
                </>
            ) : (
                <button onClick={handleDeleteBusiness} className="delete-button">Delete Business</button>
            )}
        </div>
    );    
};

export default DeleteBusiness;
