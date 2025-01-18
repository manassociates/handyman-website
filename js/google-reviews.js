// Initialize the Google Places API
function initGooglePlaces() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = getBusinessReviews;
}

// Fetch reviews for your business
function getBusinessReviews() {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    
    const request = {
        placeId: 'YOUR_PLACE_ID', // Get this from Google Places API
        fields: ['reviews']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayReviews(place.reviews);
        }
    });
}

// Filter and display reviews
function displayReviews(reviews) {
    // Filter for 4 and 5 star reviews
    const highRatedReviews = reviews.filter(review => review.rating >= 4);
    
    // Get the container
    const container = document.querySelector('#testimonials .row');
    
    // Clear existing testimonials
    const sectionHeading = container.querySelector('.section-heading');
    container.innerHTML = '';
    container.appendChild(sectionHeading);

    // Add filtered reviews
    highRatedReviews.forEach(review => {
        const testimonial = document.createElement('blockquote');
        testimonial.className = 'col-3 testimonial classic';
        
        testimonial.innerHTML = `
            <img src="${review.profile_photo_url || 'images/user-images/default-user.jpg'}" alt="User"/>
            <q>${review.text}</q>
            <footer>${review.author_name} - ${review.relative_time_description}</footer>
        `;
        
        container.appendChild(testimonial);
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initGooglePlaces);