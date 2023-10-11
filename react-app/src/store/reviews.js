// ACTION TYPES
const READ_REVIEWS = 'reviews/READ_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const SET_ERROR = 'reviews/SET_ERROR';
const SET_LOADING = 'reviews/SET_LOADING';

// ACTION CREATORS
export const readReviews = (reviews) => ({
    type: READ_REVIEWS,
    payload: reviews,
});

export const postReview = (review) => ({
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

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

// THUNKS
export const getReviews = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${businessId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(readReviews(data.reviews));
    }
};

export const createReview = (review, businessId) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const res = await fetch(`/api/reviews/${businessId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });

        if (res.ok) {
            const createdReview = await res.json();
            dispatch(postReview(createdReview));
            dispatch(getReviews(businessId));
            return createdReview;
        } else {
            dispatch(setError(res.statusText));
            return Promise.reject(res.statusText);
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateReview = (reviewId, updatedReview) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedReview),
        });

        if (res.ok) {
            const updated = await res.json();
            dispatch(updateReviewAction(updated));
            return updated;
        } else {
            console.error("Error updating review:", res.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error updating review:", error);
        return null;
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
    if (res.ok) {
        dispatch(removeReview(reviewId));
    }
};

// INITIAL STATE
const initialState = { allReviews: [], isLoading: false, error: null };

// REDUCER
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case READ_REVIEWS:
            return { ...state, allReviews: [...action.payload] };
        case POST_REVIEW:
            const updatedState = {
                ...state,
                allReviews: [...state.allReviews, action.payload],
            };
            return updatedState;
        case UPDATE_REVIEW:
            const updatedReview = action.payload;
            return {
                ...state,
                allReviews: state.allReviews.map((review) =>
                    review.id === updatedReview.id ? updatedReview : review
                ),
            };
        case REMOVE_REVIEW:
            const newState = { ...state };
            newState.allReviews = newState.allReviews.filter(
                (review) => review.id !== action.payload
            );
            return newState;
        case SET_ERROR:
            return { ...state, error: action.payload };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}
