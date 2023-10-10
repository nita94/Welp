// ACTION TYPES
const READ_REVIEWS = 'reviews/READ_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW'; // Updated action type
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

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

// THUNKS
export const getReviews = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${businessId}`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(readReviews(reviews));
    }
};

export const createReview = (review, businessId) => async (dispatch) => { // Updated thunk
    // Log the variables just before they're used in the fetch call
    console.log('Business ID:', businessId);
    console.log('Review Data:', review);

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
            // Log the data received from the server
            console.log('Data Received:', review);
            dispatch(postReview(review)); // Use postReview to align with provided structure
            dispatch(getReviews(businessId)); // Fetch fresh reviews from the server
            return null;
        } else {
            const error = await res.json();
            // Log any error data received from the server
            console.log('Error Data:', error);
            return error;
        }
    } catch (error) {
        // Log any errors that occur with the fetch call itself (e.g., network errors)
        console.log('Fetch Error:', error);
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
const initialState = { allReviews: {} }; // Updated state structure

// REDUCER
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case READ_REVIEWS:
            return { ...state, allReviews: { ...action.payload } }; // Updated state property
        case POST_REVIEW: {
            const updatedState = {
                ...state,
                allReviews: [...state.allReviews, action.payload], // Updated state property
            };
            return updatedState;
        }
        case UPDATE_REVIEW:
            return { ...state, allReviews: [...state.allReviews, action.payload] }; // Updated state property
        case REMOVE_REVIEW:
            const newState = { ...state };
            newState.allReviews = newState.allReviews.filter(
                (review) => review.id !== action.payload
            ); // Updated state property
            return newState;
        default:
            return state;
    }
}
