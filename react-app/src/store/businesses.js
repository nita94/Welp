// ACTION TYPES
const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_ONE_BUSINESS = 'businesses/GET_ONE_BUSINESS';
const REMOVE_BUSINESS = 'businesses/REMOVE_BUSINESS';

// ACTION CREATORS
const getAllBusinesses = (allBusinesses) => ({
    type: GET_ALL_BUSINESSES,
    payload: allBusinesses
});

const getSingleBusiness = (business) => ({
    type: GET_ONE_BUSINESS,
    payload: business
});

const removeBusiness = (businessId) => ({
    type: REMOVE_BUSINESS,
    payload: businessId
});

// THUNKS
export const getBusinesses = () => async (dispatch) => {
    const res = await fetch('/api/businesses');

    if (res.ok) {
        const data = await res.json();
        
        dispatch(getAllBusinesses(data.businesses)); // Ensure your API sends businesses in an object like { businesses: [...] }
    } else {
        console.log('No businesses found');
    }
};


export const getSelectedBusiness = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getSingleBusiness(data))
    } else {
        console.log('No business found')
    }
}

export const createBusiness = (business) => async (dispatch) => {
    const res = await fetch('/api/businesses', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(getSingleBusiness(data.id))
        return data
    }
}

export const updateBusiness = ({ business, businessId }) => async (dispatch) => {
    console.log("UpdateBusiness Action", { business, businessId }); 

    if (!businessId) {
        console.error("Business ID is undefined or empty:", businessId);
        return null; 
    }

    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    });

    if (res.ok) {
        const updatedBusiness = await res.json();
        dispatch(getSelectedBusiness(updatedBusiness.id));
        return updatedBusiness;
    } else {
        console.error("Update business failed:", await res.text());
        return null;
    }
}



export const deleteBusiness = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(removeBusiness(businessId))
        return businessId
    }
}

// INITIAL STATE
const initialState = { allBusinesses: {}, singleBusiness: {} };

// REDUCER
export default function businessReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BUSINESSES:
            const allBusinesses = {};
            action.payload.forEach(business => {
                allBusinesses[business.id] = business;
            });
            return { 
                ...state, 
                allBusinesses 
            };
        case GET_ONE_BUSINESS:
            return { 
                ...state, 
                singleBusiness: action.payload 
            };
        case REMOVE_BUSINESS:
            const newAllBusinesses = { ...state.allBusinesses };
            delete newAllBusinesses[action.payload];
            return {
                ...state,
                allBusinesses: newAllBusinesses
            };
        default:
            return state;
    }
}
