// ACTION TYPES
const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_ONE_BUSINESS = 'businesses/GET_ONE_BUSINESS';
const REMOVE_BUSINESS = 'businesses/REMOVE_BUSINESS';

// ACTION CREATORS
const getAllBusinesses = (businesses) => ({
    type: GET_ALL_BUSINESSES,
    businesses
});

const getSingleBusiness = (business) => ({
    type: GET_ONE_BUSINESS,
    business
});

const removeBusiness = (businessId) => ({
    type: REMOVE_BUSINESS,
    businessId
});

// THUNKS
export const getBusinesses = () => async (dispatch) => {
    try {
        const res = await fetch('/api/businesses');
        if (res.ok) {
            const { businesses } = await res.json();
            console.log('Businesses data received:', businesses); // Debug log
            dispatch(getAllBusinesses(businesses));
        } else {
            console.error('Failed to fetch businesses');
        }
    } catch (error) {
        console.error('Error fetching businesses:', error);
    }
};

export const getSelectedBusiness = (businessId) => async (dispatch) => {
    console.log(`Fetching business with id: ${businessId}`);  // Debug log
    const res = await fetch(`/api/businesses/${businessId}`);

    if (res.ok) {
        const business = await res.json();
        console.log('Business data received:', business);  // Debug log
        dispatch(getSingleBusiness(business));
    } else {
        console.error('Failed to fetch business');
    }
};


export const createBusiness = (business) => async (dispatch) => {
    const res = await fetch('/api/businesses', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    });

    if (res.ok) {
        const newBusiness = await res.json();
        dispatch(getSingleBusiness(newBusiness));
        return newBusiness;
    } else {
        console.error('Failed to create business');
    }
};

export const updateBusiness = (payload) => async (dispatch) => {
    const { business, businessId } = payload;

    console.log(`Sending PUT request to: /api/businesses/${businessId}`); // Debugging line
    console.log('Payload:', payload); // Debugging line

    try {
        const response = await fetch(`/api/businesses/${businessId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(business),
        });

        if (response.ok) {
            const updatedBusiness = await response.json();
            console.log('Update successful:', updatedBusiness); // Debugging line
            dispatch(getSelectedBusiness(updatedBusiness.id)); // Assuming getSelectedBusiness is defined
            return updatedBusiness;
        } else {
            console.log('Response not ok:', response.statusText); // Debugging line
            throw response;
        }
    } catch (error) {
        console.error('Error in updateBusiness fetch:', error); // Debugging line
        // Here you might dispatch an action to set an error state in Redux
        return null;
    }
};

export const deleteBusiness = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeBusiness(businessId));
    } else {
        console.error('Failed to delete business');
    }
};

// INITIAL STATE
const initialState = { allBusinesses: {}, singleBusiness: null };

// REDUCER
export default function businessReducer(state = initialState, action) {
    console.log('Action received in reducer:', action);  // Debug log
    switch (action.type) {
        case GET_ALL_BUSINESSES:
            return { 
                ...state, 
                allBusinesses: action.businesses.reduce((acc, business) => {
                    acc[business.id] = business;
                    return acc;
                }, {}) 
            };
        case GET_ONE_BUSINESS:
            console.log('Updating single business:', action.business);
            return { 
                ...state, 
                singleBusiness: action.business 
            };
        case REMOVE_BUSINESS:
            const newAllBusinesses = { ...state.allBusinesses };
            delete newAllBusinesses[action.businessId];
            return {
                ...state,
                allBusinesses: newAllBusinesses
            };
        default:
            return state;
    }
}