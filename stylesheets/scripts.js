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
