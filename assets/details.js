// RECUPERO DATI DELL'OGGETTO INDICATO
const addressBarParameters = new URLSearchParams(location.search)
const itemId = addressBarParameters.get('itemId')
console.log('itemId', itemId)



fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTY3NmYyNjBjYzAwMTVjYzBkZDUiLCJpYXQiOjE3MjE5ODA1MzQsImV4cCI6MTcyMzE5MDEzNH0.r2ELxq_VqGzZPZykThRkVjcLKgI_RdXtMGlqvCGWqco"
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("Errore nella chiamata, OK non troppo OK")
        }
    })
    .then((listItems) => {
        console.log(listItems)
        const itemDetailsRow = document.getElementById("row-details")
        itemDetailsRow.innerHTML = `
        <div class="col-12 col-md-8 text-center mt-5">
            <div class="card">
            <img src="${listItems.imageUrl}" class="card-img-top w-100" alt="article photo preview">
            <div class="card-body">
                <h5 class="card-title fs-2">${listItems.name}</h5>
                <p class="fs-4">${listItems.brand}</p>
                <p class="card-text fs-3">${listItems.description}</p>
                <p class="fs-2">${listItems.price}<i class="bi bi-currency-euro"></i></p>
                <a href="./create.html?itemId=${listItems._id}" class="btn btn-warning w-25">MODIFICA</a>
                <button class="btn btn-danger w-25" onclick="deleteItem()">ELIMINA</button>
            </div>
        </div>
        </div>
    `
    })
    .catch((error) => {
        alert("ERRORE, CATCH HA PRODOTTO UN ERRORE, CONTROLLA LA CONSOLE LOG")
        console.log(error)
    })


const deleteItem = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTY3NmYyNjBjYzAwMTVjYzBkZDUiLCJpYXQiOjE3MjE5ODA1MzQsImV4cCI6MTcyMzE5MDEzNH0.r2ELxq_VqGzZPZykThRkVjcLKgI_RdXtMGlqvCGWqco"
        }
    })
        .then((response) => {
            if (response.ok) {
                alert("ITEM ELIMINATO CON SUCCESSO")
                location.assign('../home.html')
            } else {
                throw new Error("PROBLEMA NELL'ELIMINAZIONE, GUARDA CONSOLE LOG")
            }
        })
        .catch((err) => {
            console.log('error', err)
        })
}

