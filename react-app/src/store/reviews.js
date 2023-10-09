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
        console.error('Error fetching reviews');
    }
};

export const getReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`);

    if (res.ok) {
        const review = await res.json();
        dispatch(getOneReview(review));
    } else {
        console.error('Error fetching review');
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
    } else {
        const errorData = await res.json();
        console.error('Error creating review:', errorData);
        return errorData;
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
        console.error('Error updating review');
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(removeReview(reviewId));
        return reviewId;
    } else {
        console.error('Error deleting review');
    }
};

// INITIAL STATE
const initialState = { reviewsList: [], singleReview: {} };

// REDUCER
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return { ...state, reviewsList: action.payload };
        case GET_ONE_REVIEW:
            return { ...state, singleReview: action.payload };
        case REMOVE_REVIEW:
            return {
                ...state,
                reviewsList: state.reviewsList.filter(review => review.id !== action.payload),
            };
        default:
            return state;
    }
}
