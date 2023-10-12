// This function fetches reservations from your Spring Boot application
function fetchReservations() {
    fetch('http://localhost:3333/order')
        .then(response => response.json())
        .then(orders => {
            console.log('Orders:', orders); // Log the orders
            const reservationTableBody = document.getElementById('reservation-table-body');

            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.reservationDTO.id}</td>
                    <td>${order.reservationDTO.customerName}</td>
                    <td>
                        <h4>Air Hockey</h4>
                        <ul>
                            ${order.airhockeyDTO
                    ? `<li>Time: ${order.airhockeyDTO.localDateTime}, Tables: ${order.airhockeyDTO.numberOfTables}, Playtime: ${order.airhockeyDTO.playtime}</li>`
                    : 'No air hockey reservation'}
                        </ul>
                        <h4>Bowling</h4>
                        <ul>
                            ${order.bowlingDTO
                    ? `<li>Time: ${order.bowlingDTO.localDateTime}, Alleys: ${order.bowlingDTO.numberOfAlleys}, Playtime: ${order.bowlingDTO.playtime}</li>`
                    : 'No bowling reservation'}
                        </ul>
                        <h4>Dining</h4>
                        <ul>
                            ${order.diningDTO
                    ? `<li>Time: ${order.diningDTO.localDateTime}, Table Reservation: ${order.diningDTO.tableReservation}</li>`
                    : 'No dining reservation'}
                        </ul>
                    </td>
                    <td class="action-buttons">
                        <button class="btn-edit" data-id-edit-reservation="${order.reservationDTO.id}">Edit</button>
                        <button class="btn-delete" data-id-delete-reservation="${order.reservationDTO.id}">Delete</button>
                    </td>
                `;
                reservationTableBody.appendChild(row);
            });

            // After dynamically creating "Delete" buttons, add event listeners
            const deleteButtons = document.querySelectorAll('.btn-delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const reservationId = event.target.getAttribute('data-id-delete-order');
                    deleteReservation(orders);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

// Rest of your JavaScript code remains the same

// Add an event listener to call fetchReservations when the page loads
window.addEventListener('load', fetchReservations);



function deleteReservation(reservationId) {
    fetch(`http://localhost:3333/order/${reservationId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 204) {
                // Successfully deleted from the database, now remove it from the UI
                const rowToDelete = document.querySelector(`[data-id-delete-reservation="${reservationId}"]`).closest('tr');
                rowToDelete.remove();
            } else {
                console.error('Error deleting reservation');
            }
        })
        .catch(error => {
            console.error('Error deleting reservation:', error);
        });
}












