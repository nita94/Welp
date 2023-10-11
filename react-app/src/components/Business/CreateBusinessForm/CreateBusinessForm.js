import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBusiness } from '../../../store/businesses';

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

    const handleCreateBusiness = async (e) => {
        e.preventDefault();

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

        // Log the payload before sending it
        console.log("Sending payload:", payload);

        const res = await dispatch(createBusiness(payload));
        if (res) {
            history.push(`/businesses/${res.id}`);
        }
    };

    return (
        <div className="create-business-form-container">
            <div className="form-section">
                <h2>Create a Business</h2>
                <form onSubmit={handleCreateBusiness}>
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
