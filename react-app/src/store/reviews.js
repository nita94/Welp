// ACTION TYPES
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_ONE_REVIEW = 'reviews/GET_ONE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

// ACTION CREATORS
const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    payload: reviews
});

const getOneReview = (review) => ({
    type: GET_ONE_REVIEW,
    payload: review
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    payload: reviewId
});

// THUNKS
export const getReviews = () => async (dispatch) => {
    const res = await fetch('/api/reviews');

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getAllReviews(reviews));
    } else {
        console.log('No reviews found');
    }
};

export const getReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`);

    if (res.ok) {
        const review = await res.json();
        dispatch(getOneReview(review));
    } else {
        console.log('No review found');
    }
};

export const createReview = (review) => async (dispatch) => {
    const res = await fetch('/api/reviews', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const newReview = await res.json();
        dispatch(getOneReview(newReview));
        return newReview;
    }
};

export const updateReview = (reviewId, updatedReview) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedReview)
    });

    if (res.ok) {
        const updated = await res.json();
        dispatch(getOneReview(updated));
        return updated;
    } else {
        console.log('Update failed');
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(removeReview(reviewId));
        return reviewId;
    }
};

// INITIAL STATE
const initialState = { allReviews: {}, singleReview: {} };

// REDUCER
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return { ...state, allReviews: action.payload };
        case GET_ONE_REVIEW:
            return { ...state, singleReview: action.payload };
        case REMOVE_REVIEW: 
            const newState = { ...state };
            delete newState.allReviews[action.payload];
            return newState;
        default:
            return state;
    }
}
