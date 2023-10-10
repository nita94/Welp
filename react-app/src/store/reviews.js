// ACTION TYPES
const READ_REVIEWS = 'reviews/READ_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW'; // Updated action type
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const SET_ERROR = 'reviews/SET_ERROR'; // Added error action type
const SET_LOADING = 'reviews/SET_LOADING'; // Added loading action type

// ACTION CREATORS
export const readReviews = (reviews) => ({
    type: READ_REVIEWS,
    payload: reviews,
});

export const postReview = (review) => ({ // Updated action creator
    type: POST_REVIEW,
    payload: review,
});

export const updateReviewAction = (review) => ({
    type: UPDATE_REVIEW,
    payload: review,
});

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    payload: reviewId,
});

export const setError = (error) => ({ // Added error action creator
    type: SET_ERROR,
    payload: error,
});

export const setLoading = (isLoading) => ({ // Added loading action creator
    type: SET_LOADING,
    payload: isLoading,
});

// THUNKS
export const getReviews = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${businessId}`);
    if (res.ok) {
        const data = await res.json();
        console.log('Fetched reviews:', data);
        // Dispatch the array directly, not the object
        dispatch(readReviews(data.reviews));
    }
};

export const createReview = (review, businessId) => async (dispatch) => { // Updated thunk
    // Log the variables just before they're used in the fetch call
    console.log('Business ID:', businessId);
    console.log('Review Data:', review);

    dispatch(setLoading(true)); // Set loading state to true

    try {
        const res = await fetch(`/api/reviews/${businessId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });

        // Log the response status and status text
        console.log('Response Status:', res.status);
        console.log('Response Status Text:', res.statusText);

        if (res.ok) {
            const review = await res.json();
            console.log('Data Received:', review);
            dispatch(postReview(review));
            dispatch(getReviews(businessId));
            return review; // Add this line to return the response
        } else {
            console.log('Fetch Error:', res.statusText);
            dispatch(setError(res.statusText));
            return Promise.reject(res.statusText); // Reject the Promise with the error message
        }
        
    } catch (error) {
        // Log any errors that occur with the fetch call itself (e.g., network errors)
        console.log('Fetch Error:', error);
        dispatch(setError(error.message)); // Set the error state with the error message
    } finally {
        dispatch(setLoading(false)); // Set loading state to false after fetch
    }
};

export const updateReview = (reviewId, updatedReview) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview),
    });
    if (res.ok) {
        const updated = await res.json();
        dispatch(updateReviewAction(updated));
    }
    // Handle errors here (if needed)
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
    if (res.ok) {
        dispatch(removeReview(reviewId));
    }
    // Handle errors here (if needed)
};

// INITIAL STATE
const initialState = { allReviews: [], isLoading: false, error: null }; // Updated state structure

// REDUCER
export default function reviewReducer(state = initialState, action) {
    console.log('Action received in reducer:', action); // Log the received action

    switch (action.type) {
        case READ_REVIEWS:
            console.log('READ_REVIEWS payload:', action.payload, typeof action.payload);
            return { ...state, allReviews: [...action.payload] };
        case POST_REVIEW: {
            console.log('Handling POST_REVIEW', action.payload); // Log the action type
            const updatedState = {
                ...state,
                allReviews: [...state.allReviews, action.payload],
            };
            console.log('Updated state after POST_REVIEW:', updatedState); // Log the updated state
            return updatedState;
        }
        case UPDATE_REVIEW:
            console.log('Handling UPDATE_REVIEW'); // Log the action type
            return { ...state, allReviews: [...state.allReviews, action.payload] };
        case REMOVE_REVIEW:
            console.log('Handling REMOVE_REVIEW'); // Log the action type
            const newState = { ...state };
            newState.allReviews = newState.allReviews.filter(
                (review) => review.id !== action.payload
            );
            console.log('Updated state after REMOVE_REVIEW:', newState); // Log the updated state
            return newState;
        case SET_ERROR:
            return { ...state, error: action.payload }; // Update error state
        case SET_LOADING:
            return { ...state, isLoading: action.payload }; // Update loading state
        default:
            return state;
    }
}
