// API Url
const url = 'http://ec2-35-181-5-201.eu-west-3.compute.amazonaws.com:8080/list-products/'
const urlPost = 'http://ec2-35-181-5-201.eu-west-3.compute.amazonaws.com:8080/add-product/'
const urlDelete = 'http://ec2-35-181-5-201.eu-west-3.compute.amazonaws.com:8080/delete-product/'
const idTeam = 'albatross' // CHANGEME
productMarquet = [];

//Product Constructor
class Product {
  constructor(id, title, price, year) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.year = year; 
  }
}

//UI Constructor
class UI {
  //Product template
  static addProduct(product) {
    const actualYear = new Date().getFullYear();
    if (product.year <= actualYear) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div id="${product.id}" class="card text-center mb-4">
      <div class="card-body">
      <h5><strong>${product.title}</strong></h5>
      <strong>Price</strong>: ${product.price}€
      <strong>Year</strong>: ${product.year}
      <a href="#" onclick="UI.deleteProduct(event)" class="dlt btn btn-danger ml-5" name="delete">Delete</a>
      </div>
      </div>
      `;
    productList.appendChild(element);
    }
  }

  static resetForm() {
    document.getElementById("product-form").reset();
  }

  static deleteProduct(event) {
    console.log("event", event)
    event.target.closest("div.card.text-center.mb-4").remove();
    UI.deleteProductFromServer(event.target.closest("div.card.text-center.mb-4").id)
    UI.showMessage("Product removed successfully", "danger");
  }

  static showMessage(message, cssClass) {
    const msg = document.createElement("div");
    msg.className = `alert alert-${cssClass} mt-2 text-center`;
    msg.appendChild(document.createTextNode(message));

    //Show in the DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");

    //Insert message in the UI
    container.insertBefore(msg, app);

    //Remove after 2 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  static retreiveAllProductsFromServer(cb) {
    fetch(url + idTeam, {
      method: 'GET', // So, we can specify HTTP Methods here. Uh, interesting.
      headers: { 'Content-Type': 'application/json' }, // Type of data to retrieve. 
      mode: 'cors', // What is CORS?? https://developer.mozilla.org/es/docs/Web/HTTP/CORS 
    }).then(response => response.json()
    ).then(data => cb(data));
  }

  static postProductFromServer(productMarquet) {
    console.log(productMarquet.title + " " + productMarquet.price + " " + productMarquet.year)
    fetch(urlPost + idTeam, {
      method: "POST", // So, we can specify HTTP Methods here. Uh, interesting.
      headers: { 'Content-Type': 'application/json' }, // Type of data to retrieve. 
      mode: 'cors', // What is CORS?? https://developer.mozilla.org/es/docs/Web/HTTP/CORS 
      body: JSON.stringify({
        title: productMarquet.title,
        price: productMarquet.price,
        year: productMarquet.year
      })
    }).then(response => response.json());
  }

  static deleteProductFromServer(id) {
    fetch(urlDelete + idTeam + '/' + id, {
      method: "GET", // So, we can specify HTTP Methods here. Uh, interesting.
      headers: { 'Content-Type': 'application/json' }, // Type of data to retrieve. 
      mode: 'cors', // What is CORS?? https://developer.mozilla.org/es/docs/Web/HTTP/CORS 
    });
  }
}

//DOM Events
document.getElementById("product-form").addEventListener("submit",  e => {
  const id = "";
  const title = document.getElementById("product-name").value
  const price = document.getElementById("product-price").value
  const year = document.getElementById("product-year").value




  //Save product
  const product = new Product(id, title, price, year);
  UI.addProduct(product);
  UI.postProductFromServer(product);
  UI.resetForm();
  UI.showMessage("Product added successfully", "success");
  console.log("ola");
  e.preventDefault();
});

UI.retreiveAllProductsFromServer((data) => {
  productMarquet = data
  console.log(productMarquet);
  productMarquet.forEach(productMarquet => {
    UI.addProduct(productMarquet);
  });
});