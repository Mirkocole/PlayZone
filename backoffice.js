// Token di autenticazione API
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjZmMDljNDM3MDAwMTkzYzM2MjMiLCJpYXQiOjE3MDg0MzkyODEsImV4cCI6MTcwOTY0ODg4MX0.OoZd_Pn5IgAjj6qyrwG_lanESNFUAYjDlQrAv9uDjFk';

// Inputs Form Create Product
const productName = document.getElementById('input-name');
const description = document.getElementById('input-description');
const brand = document.getElementById('input-brand');
const imgUrl = document.getElementById('input-imgUrl');
const price = document.getElementById('input-price');
// const btnAction = document.getElementById('btnCreateProduct');
const alertAction = document.getElementById('alertCreateProduct');


// Inputs Form Edit Product
const productNameEdit = document.getElementById('edit-name');
const descriptionEdit = document.getElementById('edit-description');
const brandEdit = document.getElementById('edit-brand');
const imgUrlEdit = document.getElementById('edit-imgUrl');
const priceEdit = document.getElementById('edit-price');
const btnActionEdit = document.getElementById('edit-btn');
const alertActionEdit = document.getElementById('alertActionEdit');

// Spinners
const spinnerAdd = document.getElementById('spinnerAdd');
const spinnerEdit = document.getElementById('spinnerEdit');

// Table results
const tableResults = document.getElementById('listProducts');


async function addProduct() {


    if (productName.value && description.value && brand.value && imgUrl.value && price.value) {
        let product = {
            'name': productName.value,
            'description': description.value,
            'brand': brand.value,
            'imageUrl': imgUrl.value,
            'price': price.value
        }
        try {
            spinnerAdd.classList.toggle('d-none');
            let res = await fetch('https://striveschool-api.herokuapp.com/api/product/',
                {
                    headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + token },
                    body: JSON.stringify(product),
                    method: "POST"
                });

                
    
            if (res.status == 200) {
                spinnerAdd.classList.toggle('d-none');

                alertAction.innerText = 'Prodotto caricato con successo!';
                alertAction.classList.toggle('d-none');
                showProducts();
    
                setTimeout(() => {
                    alertAction.classList.toggle('d-none');
                }, 5000)
            }else{
                // INSERIRE CONTROLLO INPUT
            }
        } catch (error) {
            console.log(error);
            spinnerAdd.classList.toggle('d-none');
        }
    }else{
        // Campi input add non completi
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

        // Azione Edit
        btnEdit.setAttribute('data-bs-toggle','modal');
        btnEdit.setAttribute('data-bs-target','#modalEdit');
        btnEdit.addEventListener('click',()=>{
            productNameEdit.value = product.name;
            descriptionEdit.value = product.description;
            brandEdit.value = product.brand;
            imgUrlEdit.value = product.imageUrl;
            priceEdit.value = product.price;

            btnActionEdit.addEventListener('click',()=>{
                product.name = productNameEdit.value;
                product.description = descriptionEdit.value;
                product.brand = brandEdit.value;
                product.imageUrl = imgUrlEdit.value;
                product.price = priceEdit.value;
                editProduct(product);
            })
        })


        // Collegamento Nodi
        colActions.append(btnEdit,btnDelete);
        row.append(colName,colDescription,colBrand,colPrice,colActions);

        tableResults.appendChild(row);
}


async function editProduct(product){

    if (productNameEdit && productNameEdit && brandEdit && imgUrlEdit && priceEdit) {
        try {
            spinnerEdit.classList.toggle('d-none');
            let res = await fetch('https://striveschool-api.herokuapp.com/api/product/'+product._id,
                {
                    headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + token },
                    body: JSON.stringify(product),
                    method: "PUT"
                });
    
            if (res.status == 200) {
                spinnerEdit.classList.toggle('d-none');

                alertActionEdit.classList.toggle('d-none');
                showProducts();
    
                setTimeout(() => {
                    alertActionEdit.classList.toggle('d-none');
                }, 5000);
            }else{
                // INSERIRE CONTROLLO INPUT
            }
        } catch (error) {
            console.log(error);
            spinnerEdit.classList.toggle('d-none');
        }
    }else{
        // Campi input edit non completi
    }

    
}

window.onload = showProducts();