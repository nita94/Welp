import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSelectedBusiness } from "../../../store/businesses";
import UpdateBusinessForm from '../UpdateBusinessForm/UpdateBusinessForm';
import DeleteBusiness from '../DeleteBusiness/DeleteBusiness';
import './SingleBusiness.css';


const SingleBusiness = () => {
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const business = useSelector(state => state.businesses.byId[businessId])

    useEffect(() => {
        dispatch(getSelectedBusiness(businessId));  // Updated
    }, [dispatch, businessId]);

    if (!business) return null

    return (
        <>
            <div className="single-business-container">
                <h2>{business.name}</h2>
                <div>{business.address}</div>
                <div>{business.description}</div>

                {/* For future development like managing reviews */}
                {/* {reviews.map((review) => (
                    <div key={review.id}>
                        <div>{review.user.username}</div>
                        <div>{review.rating}</div>
                        <div>{review.comment}</div>
                        <div>{review.createdAt}</div>
                    </div>
                ))} */}
                
                {/* Uncomment the below lines when UpdateBusinessForm and DeleteBusiness are implemented */}
                {/* <UpdateBusinessForm business={business} />
                <DeleteBusiness businessId={business.id} /> */}
            </div>
        </>
    )
}

export default SingleBusiness
