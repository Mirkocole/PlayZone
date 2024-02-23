// Token di autenticazione API
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YjZmMDljNDM3MDAwMTkzYzM2MjMiLCJpYXQiOjE3MDg0MzkyODEsImV4cCI6MTcwOTY0ODg4MX0.OoZd_Pn5IgAjj6qyrwG_lanESNFUAYjDlQrAv9uDjFk';

const results = document.getElementById('results');
let listaProdotti;

window.onload = showProducts();


async function showProducts(){

    try {
        let res = await fetch('https://striveschool-api.herokuapp.com/api/product/',
        {
            headers : {"Content-Type": "application/json", Authorization:'Bearer '+token},
        });
        let json = await res.json();
        json.forEach(element => {
            createCard(element);
        });
        
    } catch (error) {
        console.log(error);
    }
}

function createCard(product){

    // Creazione Nodi
    let column = document.createElement('div');
    let card = document.createElement('div');
    let image = document.createElement('img');
    let cardBody = document.createElement('div');
    let cardName = document.createElement('h5');
    let cardDescription = document.createElement('p');
    let cardBrand = document.createElement('span');
    let cardPrice = document.createElement('span');
    let cardBtn = document.createElement('a');

    // Stilizzazione Nodi
    column.classList.add('col-6');
    card.classList.add('card','border','border-0');
    image.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    cardName.classList.add('card-title');
    cardDescription.classList = ['card-text m-0 fs-6 fw-lighter my-2'];
    cardBrand.classList = ['card-text fw-5 d-block'];
    cardPrice.classList = ['card-text text-danger d-block fs-4'];
    cardBtn.classList = ['mt-4'];
    cardBtn.href = 'dettagli.html?id='+product._id;


    // Valorizzo i nodi
    image.src = product.imageUrl;
    image.alt = product.name;
    cardName.innerText = product.name;
    cardDescription.innerText = product.description;
    cardBrand.innerText = product.brand;
    cardPrice.innerText = `${Number(product.price).toFixed(2)}€`;
    cardBtn.innerHTML = '<i class="fa-solid fa-circle-info fs-3 mt-3"></i>';

    // Collego i nodi
    cardBody.append(cardName,cardDescription,cardBrand,cardPrice,cardBtn);
    card.append(image,cardBody);
    column.appendChild(card);

    results.append(column);

}