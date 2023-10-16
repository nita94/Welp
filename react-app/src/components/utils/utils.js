// Utility function to calculate and update the average rating of a business
export const calculateAndUpdateAvgRating = async (businessId, reviews) => {
    // Calculate average rating
    const totalRating = reviews.reduce((total, review) => total + (review.rating || 0), 0);
    const avgRating = (reviews.length > 0) ? (totalRating / reviews.length).toFixed(1) : 0;

    // Update the average rating in the database
    const response = await fetch(`/api/businesses/${businessId}/avg_rating`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avg_rating: avgRating })
    });

    if (!response.ok) {
        // Handle error if the update request fails
        console.error('Failed to update average rating.');
    }
};
