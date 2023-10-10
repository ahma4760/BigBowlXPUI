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

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Serialize form data to JSON
    const formData = new FormData(this);
    const formDataJSON = {};
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    // Send the data to the server using fetch
    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationDTO: formDataJSON }), // Assuming your DTO structure
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to send data to the server.');
            }
        })
        .then(data => {
            // Handle the server's response here
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
