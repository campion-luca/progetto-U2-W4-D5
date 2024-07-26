// campi che mi servono :
// item name
// description
// brand
// image
// price

const addressBarParameters = new URLSearchParams(location.search)
const itemId = addressBarParameters.get('itemId')
console.log('itemId', itemId)

// MODIFICA
if (itemId) {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTY3NmYyNjBjYzAwMTVjYzBkZDUiLCJpYXQiOjE3MjE5ODA1MzQsImV4cCI6MTcyMzE5MDEzNH0.r2ELxq_VqGzZPZykThRkVjcLKgI_RdXtMGlqvCGWqco"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("errore, oggetto già venduto/non recuperato !")
            }
        })
        .then((singleItem) => {
            console.log(singleItem)
            document.getElementById("name").value = singleItem.name
            document.getElementById("description").value = singleItem.description
            document.getElementById("brand").value = singleItem.brand
            document.getElementById("imageUrl").value = singleItem.imageUrl
            document.getElementById("price").value = singleItem.price
        })
        .catch((err) => {
            console.log(err)
        })
}

class StampinoItems {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name
        this.description = _description
        this.brand = _brand
        this.imageUrl = _imageUrl
        this.price = _price
    }
}


// CLICK DEL BOTTONE - INSERIMENTO DATI NELLA FETCH
const itemCreation = document.getElementById("creation-item")
itemCreation.addEventListener("submit", function (e) {
    e.preventDefault() // NON ELIMINARLO LUCA

    // punto i valori ricevuti dal FORM
    const nameInput = document.getElementById("name")
    const descriptionInput = document.getElementById("description")
    const brandInput = document.getElementById("brand")
    const imageInput = document.getElementById("imageUrl")
    const priceInput = document.getElementById("price")

    // prendo i valori dentro gli stessi
    const nameItem = nameInput.value
    const descriptionItem = descriptionInput.value
    const brandItem = brandInput.value
    const imageItem = imageInput.value
    const priceItem = priceInput.value

    const itemClass = new StampinoItems(
        nameItem,
        descriptionItem,
        brandItem,
        imageItem,
        priceItem
    )

    // SWITCH METHOD
    let methodToUse
    if (itemId) {
        methodToUse = "PUT"
    } else {
        methodToUse = "POST"
    }

    const URL = "https://striveschool-api.herokuapp.com/api/product/"

    let URLToUse
    if (itemId) {
        URLToUse = URL + itemId
    } else {
        URLToUse = URL
    }

    fetch(URLToUse, {
        method: methodToUse,
        body: JSON.stringify(itemClass),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTY3NmYyNjBjYzAwMTVjYzBkZDUiLCJpYXQiOjE3MjE5ODA1MzQsImV4cCI6MTcyMzE5MDEzNH0.r2ELxq_VqGzZPZykThRkVjcLKgI_RdXtMGlqvCGWqco"
        },
    })

        .then((response) => {
            if (response.ok) {
                alert("SAVING OK")
                location.assign('../home.html')
            } else {
                alert("ERROR, ITEM NOT SAVED")
                throw new Error("errore nel salvataggio, guarda il console log")
            }
        })
        .catch((err) => {
            console.log('ERRORE', err)
        })
})
