import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBusiness } from "../../../store/businesses";
import { useModal } from "../../../context/Modal";

const UpdateBusinessForm = ({ business }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  // Use useSelector to select the updated business from Redux state
  const updatedBusiness = useSelector((state) => state.businesses.updatedBusiness);

  // Add a log to check the 'business' prop
  console.log("Business prop in UpdateBusinessForm:", business);

  // Initialize local state with the business data
  const [name, setName] = useState(business.name);
  const [address, setAddress] = useState(business.address);
  const [description, setDescription] = useState(business.description);

  // Use useEffect to update the local state when Redux state changes
  useEffect(() => {
    if (updatedBusiness) {
      setName(updatedBusiness.name);
      setAddress(updatedBusiness.address);
      setDescription(updatedBusiness.description);
    }
  }, [updatedBusiness]);

  const handleUpdateBusiness = async (e) => {
    e.preventDefault();

    const payload = {
      business: {
        name,
        address,
        description,
      },
      businessId: business.id, // Make sure to include the ID
    };

    console.log("Payload before dispatch:", payload);

    const updatedBusiness = await dispatch(updateBusiness(payload));


    closeModal();

    if (updatedBusiness) {
      history.push(`/businesses/${business.id}`);
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
        <button type="submit">Update Business</button>
      </form>
    </>
  );
};

export default UpdateBusinessForm;
