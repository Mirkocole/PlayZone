// Token di autenticazione API
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjZmMDljNDM3MDAwMTkzYzM2MjMiLCJpYXQiOjE3MDg0MzkyODEsImV4cCI6MTcwOTY0ODg4MX0.OoZd_Pn5IgAjj6qyrwG_lanESNFUAYjDlQrAv9uDjFk';


const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get('id')); 

const containerDetail = document.getElementById('container-detail');
const containerError = document.getElementById('container-error');


if (searchParams.has('id')) {
    getDetail(searchParams.get('id'));
}

async function getDetail(id){
    try {
        let res = await fetch('https://striveschool-api.herokuapp.com/api/product/'+id,
        {
            headers : {"Content-Type": "application/json", Authorization:'Bearer '+token},
        });

        let json = await res.json();

        
            createDetail(json);
            invertVisibility()
        
        
    } catch (error) {
        console.log(error);
    }
}


function createDetail(product){
    const image = document.querySelector('#container-detail img');
    image.src = product.imageUrl;

    const prodName = document.querySelector('#container-detail h4');
    prodName.innerText = 'Name: '+product.name;

    const prodDesc = document.querySelector('#container-detail p');
    prodDesc.innerText = 'Description: '+product.description;

    const prodBrand = document.querySelector('#brand');
    prodBrand.innerText = 'Brand: '+product.brand;
    const prodPrice = document.querySelector('#price');
    prodPrice.innerText = `Price: ${Number(product.price).toFixed(2)}€`;
}


function invertVisibility(){
    containerDetail.classList.toggle('d-none');
    containerError.classList.toggle('d-none');
}