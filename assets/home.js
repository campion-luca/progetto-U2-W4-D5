// RECUPERO DATI DALLA FETCH " VUOTA "
const createItems = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTY3NmYyNjBjYzAwMTVjYzBkZDUiLCJpYXQiOjE3MjE5ODA1MzQsImV4cCI6MTcyMzE5MDEzNH0.r2ELxq_VqGzZPZykThRkVjcLKgI_RdXtMGlqvCGWqco"
        }
    })

        // SE TROVO DEI DATI LI INSERIRO' NELLA HOME PAGE
        .then((response) => {
            console.log("funziona pt.1", response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Errore nella chiamata, OK non troppo OK")
            }
        })
        .then((listItems) => {
            console.log("RISULTATO CHIAMATA", listItems)

            listItems.forEach(item => {
                const newItem = `
            <div class="card me-5 border border-danger-subtle border-4 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <img src="${item.imageUrl}" class="card-img-top w-100" alt="article photo preview">
                    <div class="card-body text-center">
                        <h5 class="card-title">${item.name}</h5>
                        <p>${item.price}</p>
                        <a href="./details.html?itemId=${item._id}" class="btn btn-outline-danger">DETAILS</a>
                    </div>
                </div>
            `
                const rowItem = document.getElementById("rowItem")
                rowItem.innerHTML = rowItem.innerHTML + newItem
            });
        })
        .catch((error) => {
            alert("ERRORE, CATCH HA PRODOTTO UN ERRORE, CONTROLLA LA CONSOLE LOG")
            console.log(error)
        })
}

createItems();