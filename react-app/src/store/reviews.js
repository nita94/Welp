const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_ONE_REVIEW = 'reviews/GET_ONE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const SET_REVIEW_ERROR = 'reviews/SET_REVIEW_ERROR';
const SET_REVIEW_LOADING = 'reviews/SET_REVIEW_LOADING';

export const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    payload: reviews,
});

const getOneReview = (review) => ({
    type: GET_ONE_REVIEW,
    payload: review,
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    payload: reviewId,
});

const setReviewError = (error) => ({
    type: SET_REVIEW_ERROR,
    payload: error,
});

const setReviewLoading = (isLoading) => ({
    type: SET_REVIEW_LOADING,
    payload: isLoading,
});

export const getReviews = (businessId) => async (dispatch) => {
    try {
        dispatch(setReviewLoading(true));
        const res = await fetch(`/api/reviews/${businessId}`);
        if (!res.ok) throw res;
        const reviews = await res.json();
        dispatch(getAllReviews(reviews.reviews));
    } catch (error) {
        dispatch(setReviewError(error.toString()));
    } finally {
        dispatch(setReviewLoading(false));
    }
};

// Rest of your actions remain unchanged...


export const getReview = (reviewId) => async (dispatch) => {
    try {
        dispatch(setReviewLoading(true));
        const res = await fetch(`/api/reviews/${reviewId}`);
        if (res.ok) {
            const review = await res.json();
            dispatch(getOneReview(review));
        } else {
            throw new Error('Error fetching review');
        }
    } catch (error) {
        dispatch(setReviewError(error.toString()));
    } finally {
        dispatch(setReviewLoading(false));
    }
};

export const getReviewsForBusiness = (businessId) => async (dispatch) => {
    try {
        dispatch(setReviewLoading(true));
        const res = await fetch(`/api/businesses/${businessId}/reviews`);
        if (!res.ok) throw res;
        const reviews = await res.json();
        dispatch(getAllReviews(reviews));
    } catch (error) {
        dispatch(setReviewError(error.toString()));
    } finally {
        dispatch(setReviewLoading(false));
    }
};


export const createReview = (review) => async (dispatch) => {
    try {
        dispatch(setReviewLoading(true));
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
            throw new Error('Error creating review: ' + errorData);
        }
    } catch (error) {
        dispatch(setReviewError(error.toString()));
    } finally {
        dispatch(setReviewLoading(false));
    }
};

export const updateReview = (reviewId, updatedReview) => async (dispatch) => {
    try {
        dispatch(setReviewLoading(true));
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
            throw new Error('Error updating review');
        }
    } catch (error) {
        dispatch(setReviewError(error.toString()));
    } finally {
        dispatch(setReviewLoading(false));
    }
};

export const deleteReview = (reviewId, businessId) => async (dispatch) => {
    try {
        dispatch(setReviewLoading(true));
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            dispatch(removeReview(reviewId));
            // Fetch the updated list of reviews for the business
            const updatedReviewsRes = await fetch(`/api/reviews/${businessId}`);
            if (!updatedReviewsRes.ok) throw updatedReviewsRes;
            const updatedReviews = await updatedReviewsRes.json();
            dispatch(getAllReviews(updatedReviews.reviews));
        } else {
            throw new Error('Error deleting review');
        }
    } catch (error) {
        dispatch(setReviewError(error.toString()));
    } finally {
        dispatch(setReviewLoading(false));
    }
};


const initialState = {
    reviewsList: {},
    singleReview: {},
    isLoading: false,
    error: null,
};

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            const allReviews = {};
            action.payload.forEach(review => {
                allReviews[review.id] = review;
            });
            return { 
                ...state, 
                reviewsList: allReviews,
            };
        case GET_ONE_REVIEW:
            return { 
                ...state, 
                singleReview: action.payload,
                reviewsList: {
                    ...state.reviewsList,
                    [action.payload.id]: action.payload,
                },
            };
        case REMOVE_REVIEW:
            const updatedReviews = { ...state.reviewsList };
            delete updatedReviews[action.payload];
            return {
                ...state,
                reviewsList: updatedReviews,
            };
        case SET_REVIEW_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case SET_REVIEW_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
