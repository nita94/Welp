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

    if(res.ok){
        const data = await res.json();
        dispatch(getAllBusinesses(data.businesses));
    } else {
        console.log('No businesses found');
    }
};

export const getSelectedBusiness = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`);

    if(res.ok){
        const data = await res.json();
        dispatch(getSingleBusiness(data));
    } else {
        console.log('No business found');
    }
};

export const createBusiness = (business) => async (dispatch) => {
    const res = await fetch('/api/businesses', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    });
    if(res.ok){
        const data = await res.json();
        dispatch(getSelectedBusiness(data.id));
        return data;
    }
};

export const updateBusiness = (business, businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    });
    if (res.ok){
        const data = await res.json();
        dispatch(getSelectedBusiness(businessId));
        return data;
    } else {
        console.log('errors');
    }
};

export const deleteBusiness = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE',
    });
    if (res.ok){
        dispatch(removeBusiness(businessId));
        return businessId;
    }
};

// REDUCER
const initialState = {
    byId: {},
    allIds: [],
};

export default function businessesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BUSINESSES: {
            const businessesById = {};
            action.businesses.forEach(business => {
                businessesById[business.id] = business;
            });
            return {
                ...state,
                byId: businessesById,
                allIds: action.businesses.map(business => business.id),
            };
        }
        case GET_ONE_BUSINESS: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.business.id]: action.business,
                },
                allIds: [...new Set([...state.allIds, action.business.id])],
            };
        }
        case REMOVE_BUSINESS: {
            const newState = { ...state };
            delete newState.byId[action.businessId];
            newState.allIds = newState.allIds.filter(id => id !== action.businessId);
            return newState;
        }
        default:
            return state;
    }
}