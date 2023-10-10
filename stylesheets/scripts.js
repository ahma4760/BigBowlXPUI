$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.transparent-header').addClass('navbar-dark');
        } else {
            $('.transparent-header').removeClass('navbar-dark');
        }
    });

    $('.book-now').click(function(e) {
        e.preventDefault();
        // Implement your booking menu functionality here
    });
});

//Fetching data from the form
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(reservationForm);

    // Convert form data to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // Send a POST request to create a reservation
    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then((response) => {
            if (response.ok) {
                // Handle a successful response (e.g., show a success message)
            } else {
                // Handle errors (e.g., show an error message)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
