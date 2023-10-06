// ACTION TYPE
const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_ONE_BUSINESS = 'businesses/GET_ONE_BUSINESS';
const REMOVE_BUSINESS = 'businesses/REMOVE_BUSINESS'

// ACTION CREATOR
const getAllBusinesses = (allBusinesses) => ({
    type: GET_ALL_BUSINESSES,
    payload: allBusinesses
})

const getSingleBusiness = (business) => ({
    type: GET_ONE_BUSINESS,
    payload: business
})

const removeBusiness = (businessId) => ({
    type: REMOVE_BUSINESS,
    payload: businessId
})

// THUNKS
export const getBusinesses = () => async (dispatch) => {
    const res = await fetch('/api/businesses')

    if (res.ok) {
        const data = await res.json();
        const allBusinesses = data.businesses
        console.log(allBusinesses)
        dispatch(getAllBusinesses(allBusinesses));
    } else {
        console.log('No businesses found')
    }
}

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

export const updateBusiness = (business, businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business)
    })
    console.log(res)
    console.log('BUSINESS ID', businessId)
    if (res.ok) {
        const data = await res.json()
        dispatch(getSelectedBusiness(businessId))
        return data
    } else {
        console.log('errors')
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

const initialState = { allBusinesses: {}, singleBusiness: {} }
// Business Reducer
export default function businessReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BUSINESSES:
            return { ...state, allBusinesses: action.payload }
        case GET_ONE_BUSINESS:
            return { ...state, singleBusiness: action.payload }
        default:
            return state
    }
}
