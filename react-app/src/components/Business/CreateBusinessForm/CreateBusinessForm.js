import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBusiness } from '../../../store/businesses';
import './CreateBusinessForm.css';

const CreateBusinessForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [hours, setHours] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    const handleCreateBusiness = async (e) => {
        e.preventDefault();

        const errorsObj = {};

        // Validate inputs
        if (name.length < 4) errorsObj.name = "Name must be at least 4 characters";
        if (address.length < 5) errorsObj.address = "Address must be at least 5 characters";
        if (state.length < 2) errorsObj.state = "State must be at least 2 characters";
        if (city.length < 4) errorsObj.city = "City must be at least 4 characters";
        if (hours.length < 4) errorsObj.hours = "Hours must be at least 4 characters";
        if (imageUrl.length < 10) errorsObj.imageUrl = "Image Url must be at least 10 characters";
        if (!imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.png') && !imageUrl.endsWith('.jpeg'))
            errorsObj.imageUrl = "Image Url must be a .jpg, .png, or .jpeg";

        // If no errors, create business
        if (Object.keys(errorsObj).length === 0) {
            const payload = {
                owner_user_id: userId,
                name,
                address,
                city,
                state,
                description,
                hours,
                image_url: imageUrl,
            };
            const res = await dispatch(createBusiness(payload));
            if (res) {
                history.push(`/businesses/${res.id}`);
            }
        } else {
            setErrors(errorsObj); // If errors, set state
        }
    };

    return (
        <div className="create-business-form-container">
            <div className="form-section">
                <h2>Create a Business</h2>
                <form onSubmit={handleCreateBusiness}>
                    {/* Render errors */}
                    <ul>
                        {Object.values(errors).map((error, idx) => <li key={idx} className="error">{error}</li>)}
                    </ul>

                    <label>Name
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Business Name"
                        />
                    </label>
                    <label>Address
                        <input
                            type="text"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Business Address"
                        />
                    </label>
                    <label>City
                        <input
                            type="text"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                        />
                    </label>
                    <label>State
                        <input
                            type="text"
                            value={state}
                            required
                            maxLength="2"
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State Abbreviation"
                        />
                    </label>
                    <label>Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the business..."
                        />
                    </label>
                    <label>Hours
                        <input
                            type="text"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="Business Hours"
                        />
                    </label>
                    <label>Image URL
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Image URL"
                        />
                    </label>
                    <button type="submit">Create new Business</button>
                </form>
            </div>
            {/* Add an image section or other content here */}
            <div className="image-section">
                {/* Content goes here */}
            </div>
        </div>
    );
};

export default CreateBusinessForm;
