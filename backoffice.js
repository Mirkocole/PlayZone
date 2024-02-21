// Token di autenticazione API
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjZmMDljNDM3MDAwMTkzYzM2MjMiLCJpYXQiOjE3MDg0MzkyODEsImV4cCI6MTcwOTY0ODg4MX0.OoZd_Pn5IgAjj6qyrwG_lanESNFUAYjDlQrAv9uDjFk';

// Inputs Form Create Product
const productName = document.getElementById('input-name');
const description = document.getElementById('input-description');
const brand = document.getElementById('input-brand');
const imgUrl = document.getElementById('input-imgUrl');
const price = document.getElementById('input-price');
const btnCreateProduct = document.getElementById('btnCreateProduct');
const alertCreateProduct = document.getElementById('alertCreateProduct');

// Table results
const tableResults = document.getElementById('listProducts');


async function addProduct() {

    let product = {
        'name': productName.value,
        'description': description.value,
        'brand': brand.value,
        'imageUrl': imgUrl.value,
        'price': price.value
    }
    try {
        let res = await fetch('https://striveschool-api.herokuapp.com/api/product/',
            {
                headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + token },
                body: JSON.stringify(product),
                method: "POST"
            });

        if (res.status == 200) {
            console.log(res.status)
            alertCreateProduct.classList.toggle('d-none');
            showProducts();

            setTimeout(() => {
                alertCreateProduct.classList.toggle('d-none');
            }, 5000)
        }else{
            // INSERIRE CONTROLLO INPUT
        }
    } catch (error) {
        console.log(error);
    }
}

async function showProducts() {

    try {
        let res = await fetch('https://striveschool-api.herokuapp.com/api/product/',
            {
                headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + token },
            });
        let json = await res.json();
        tableResults.innerHTML = '';
        json.forEach(element => {
            createTableRow(element);
        });
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}


async function deleteProduct(id){
    try {
        let res = await fetch('https://striveschool-api.herokuapp.com/api/product/'+id,
            {
                headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + token },
                method: "DELETE"
            });

        console.log(res);
        showProducts();
    } catch (error) {
        console.log(error);
    }
}

function createTableRow(product) {

    

        // Creazione degli elementi (Nodi)
        let row = document.createElement('tr');
        let colId = document.createElement('th');
        let colName = document.createElement('td');
        let colDescription = document.createElement('td');
        let colBrand = document.createElement('td');
        let colPrice = document.createElement('td');
        let colActions = document.createElement('td');
        let btnEdit = document.createElement('button');
        let btnDelete = document.createElement('button');

        // Stilizzazione Elementi
        colId.scope = 'row';
        btnEdit.classList = ['btn btn-primary me-2 mb-2'];
        btnDelete.classList = ['btn btn-outline-danger mb-2'];

        // Valorizzazione Nodi
        colId.innerText = product._id;
        colName.innerText = product.name;
        colDescription.innerText = product.description;
        colBrand.innerText = product.brand;
        colPrice.innerText = `${Number(product.price).toFixed(2)}€`;
        btnEdit.innerText = 'Edit';
        btnDelete.innerText = 'Delete';

        // Azione Delete
        btnDelete.addEventListener('click',()=>{
            deleteProduct(product._id);
        })


        // Collegamento Nodi
        colActions.append(btnEdit,btnDelete);
        row.append(colName,colDescription,colBrand,colPrice,colActions);

        tableResults.appendChild(row);
}


window.onload = showProducts();