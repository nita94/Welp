import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getSelectedBusiness } from "../../../store/businesses";
import UpdateBusinessForm from '../UpdateBusinessForm/UpdateBusinessForm';
import DeleteBusiness from '../DeleteBusiness/DeleteBusiness';
import './SingleBusiness.css';

const SingleBusiness = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    // Ensure businessId is a string and fetch the business data from the state
    const business = useSelector(state => state.businesses.allBusinesses[String(businessId)]);

    useEffect(() => {
        // Fetch business data if not available
        if (!business) {
            dispatch(getSelectedBusiness(businessId));
        }
    }, [dispatch, businessId, business]);

    // Handle loading state
    if (!business) {
        return <p>Loading...</p>;
    }

    // Your render logic here
    return (
        <>
            <div className="single-business-container">
                <h2>{business.name}</h2>
                <div>{business.address}</div>
                <div>{business.description}</div>

                {/* Uncomment the below lines when UpdateBusinessForm and DeleteBusiness are implemented */}
                {/* <UpdateBusinessForm business={business} />
                <DeleteBusiness businessId={business.id} /> */}
                
                {/* Add a button to manage the business */}
                <Link to={`/businesses/${businessId}/managebusiness`} className="manage-business-button">
                    Manage Your Business
                </Link>
            </div>
        </>
    );
};

export default SingleBusiness;
