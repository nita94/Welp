import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses } from "../../../store/businesses";
import UpdateBusinessForm from '../UpdateBusinessForm/UpdateBusinessForm';
import DeleteBusiness from '../DeleteBusiness/DeleteBusiness';
import OpenModalButton from "../../Landing/OpenModalButton";
import CreateBusinessForm from "../CreateBusinessForm/CreateBusinessForm";
import "./ManageYourBusinesses.css"; // Import the CSS file
import "../DeleteBusiness/DeleteBusiness.css"
import "../UpdateBusinessForm/UpdateBusinessForm.css"

const ManageYourBusinesses = () => {
    const dispatch = useDispatch();
    const businesses = useSelector(state => state.businesses.allBusinesses);
    const user = useSelector(state => state.session.user);
    const ownedBusinesses = user
        ? Object.values(businesses).filter(business => business.owner_user_id === user.id)
        : [];

    useEffect(() => {
        dispatch(getBusinesses());
    }, [dispatch]);

    return (
        <div className="manage-businesses-container">
            <h1>Manage Your Businesses</h1>
            <div>
                <OpenModalButton
                    buttonText="Add a Business"
                    modalComponent={<CreateBusinessForm />}
                    className="button" // Use the correct class name for styling
                />
                <div className="all-businesses-container">
                    {ownedBusinesses.map(business => (
                        <div className="business-tile-container" key={business.id}>
                            <Link to={`/businesses/${business.id}`}>
                                <img src={business.image_url} alt={business.name} /> {/* Display the business image */}
                                <div>{business.name}</div>
                                <div>{business.address}</div>
                            </Link>
                            <div>
                                <OpenModalButton
                                    buttonText="Update Business"
                                    modalComponent={<UpdateBusinessForm business={business} />}
                                    className="button button-update" // Use the correct class name for styling
                                />
                                <OpenModalButton
                                    buttonText="Delete Business"
                                    modalComponent={<DeleteBusiness businessId={business.id} />}
                                    className="button button-delete" // Use the correct class name for styling
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageYourBusinesses;
