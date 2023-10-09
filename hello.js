//administrere liste over reservationer
let nextId = 10000;
let reservations = [
    {id: 1, name: "Bowling Jens"},
    {id: 2, name: "Airhockey Lilo"},
    {id: 3, name: "Dining Ian"}
]

const URLreservations = "http://localhost:3333/reservations";
const URLreservation = "http://localhost:3333/reservation";

function setUpHandlers(){
    document.getElementById("reservation-table-body").onclick = handleTableClick
    document.getElementById("btn-save").onclick = saveReservation
    document.getElementById("btn-add-reservation").onclick = makeNewReservation
}
setUpHandlers()

function handleTableClick(evt){
    evt.preventDefault()
    evt.stopPropagation()
    const target = evt.target;

    if(target.dataset.idDelete){
        //alert("Delete "+target.dataset.idDelete)
        const idToDelete = Number(target.dataset.idDElete)

        //apiStudentDelete(idToDelete)
        const options = makeOptions("DELETE")
        fetch('${URLreservation/${idToDelete}', options)
            .then(handleHttpErrors)
            .catch(err => {
                if(err.apiError){
                    console.error("Full API error: ", err.apiError)
                } else {
                    console.error(err.message)
                }
            })
        reservations = reservations.filter(r => r.id !== idToDelete)

        makeRows()
    }

    if(target.dataset.idEdit){
        const idToEdit = number(target.dataset.idEdit)
        const reservation = reservations.find(r => r.id ===idToEdit)
        showModal(reservation)
    }

    function makeNewReservation(){
        showModal({
            id: null,
            name:""
        })
    }

    function showModal(reservation) {
        const myModal = new bootstrap.Modal(document.getElementById('reservation-modal'))
        document.getElementById("modal-title").innerText = reservation.id ? "Edit Reservation" : "Add Reservation"
        document.getElementById("student-id").innerText = reservation.id
        document.getElementById("input-name").value = reservation.name
        myModal.show()
    }
    async function saveReservation() {
        let reservation = {}
        reservation.id = Number(document.getElementById("reservation-id").innerText)
        reservation.name = document.getElementById("input-name").value

        //Figure out how to update local data
        if (reservation.id){ //Edit
            //apiReservationPut(reservation)
            const options = makeOptions("PUT", reservation)
            try {
                reservation = await fetch(`${URLreservation}/${reservation.id}`, options)
                    .then(handleHttpErrors)
            } catch (err) {
                if (err.apiError){
                    console.error("Full API error: ", err.apiError)
                } else {
                    console.error(err.message)
                }

            }

            reservations = reservations.map(r => (r.id === reservation.id) ? reservation : r)
        } else {
            //apiReservationPost(reservation)
            const options = makeOptions("POST", reservation)
            try {
                reservation = await fetch(URLreservation, options)
                    .then(handleHttpErrors)
            } catch (err) {
                if (err.apiError){
                    console.error("Full API error: ", err.apiError)
                }   else {
                    console.error(err.message)
                }

            }
            //remove when calling api as db decided id
            //reservation.id = nextId++
            reservations.push(reservation)
        }

        makeRows()
    }

    async function fetchReservations() {
        try {
            reservations = await fetch(URLreservations)
                .then(handleHttpErrors)
            console.log(reservations)
        } catch (err) {
            if (err.apiError){
                console.log("Full API error: ", err.apiError)
            } else {
                console.log(err.message)
            }
        }

        makeRows()
    }

    function makeRows() {
        //make rows from data
        const rows = reservations.map(r => `
        <tr>
            <td>${r.id}</td>
            <td>${r.name}</td>
            <td><a data-id-delete=${r.id} href="#">Delete</a></td>
            <!-- <td><a data-data-edit='${JSON.stringify(r)}' href="#">Edit</a></td> -->
            <td><a data-id-edit='${r.id}' href="#">Edit</a></td>
        </tr>
        `)
        document.getElementById("reservation-table-body").innerHTML = rows.join("")
    }

    fetchReservations()

    function makeOptions(method, body) {
        const opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }
        if (body) { //Observe how we can add new fields to an object when needed
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    async function handleHttpErrors(res) {
        if (!res.ok) {
            const errorResponse = await res.json();
            const error = new Error(errorResponse.message)
            error.apiError = errorResponse
            throw error
        }
        return res.json()
    }

}