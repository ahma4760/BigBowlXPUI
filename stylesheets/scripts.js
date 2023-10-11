$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.transparent-header').addClass('navbar-dark');
        } else {
            $('.transparent-header').removeClass('navbar-dark');
        }
    });

});

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const customerName = document.getElementById("name").value
    const airHockeyDate = document.getElementById("airHockeyDate").value
    const airHockeyTime = document.getElementById("airHockeyTime").value
    const bowlingTime = document.getElementById("bowlingTime").value
    const bowlingDate = document.getElementById("bowlingDate").value
    const diningTime = document.getElementById("diningTime").value
    const diningDate = document.getElementById("diningDate").value

    const order = {
        "airhockeyDTO": {
            "reservation": {
                "customerName": customerName
            },
            "localDateTime": airHockeyDate + "T" + airHockeyTime + ":00",
            "numberOfTables": document.getElementById("numAirTables").value,
            "playtime": document.getElementById("airhockeyHours").value
        },
        "bowlingDTO": {
            "reservation": {
                "customerName": customerName
            },
            "numberOfAlleys": document.getElementById("numLanes").value,
            "localDateTime": bowlingDate + "T" + bowlingTime + ":00",
            "playtime": document.getElementById("bowlingHours").value
        },
        "diningDTO": {
            "reservation": {
                "customerName": customerName
            },
            "localDateTime": diningDate + "T" + diningTime + ":00",
            "tableReservation": document.getElementById("tableSelect").value
        },
        "reservationDTO": {
            "customerName": customerName
        }
    }

    fetch('http://localhost:3333/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to send data to the server.');
            }
        })
        .then(data => {

            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
