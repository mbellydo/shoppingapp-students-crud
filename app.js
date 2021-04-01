// API Url
const url = 'http://ec2-35-181-5-201.eu-west-3.compute.amazonaws.com:8080'
const idTeam = 'test' // CHANGEME

//Product Constructor
class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year; 
  }
}

//UI Constructor
class UI {
  //Product template
  static addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card text-center mb-4">
      <div class="card-body">
      <h5><strong>${product.name}</strong></h5>
      <strong>Price</strong>: ${product.price}€
      <strong>Year</strong>: ${product.year}
      <a href="#" onclick="UI.deleteProduct(event)" class="dlt btn btn-danger ml-5" name="delete">Delete</a>
      </div>
      </div>
      `;
    productList.appendChild(element);
  }

  static resetForm() {
    document.getElementById("product-form").reset();
  }

  static deleteProduct(event) {
    console.log("event", event)
    event.target.closest("div.card.text-center.mb-4").remove();
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

  static retreiveAllProductsFromServer() {
    fetch(`CHANGAME`, {
      method: 'GET', // So, we can specify HTTP Methods here. Uh, interesting.
      headers: { 'Content-Type': 'application/json' }, // Type of data to retrieve. 
      mode: 'cors', // What is CORS?? https://developer.mozilla.org/es/docs/Web/HTTP/CORS 
    })
  }
}

//DOM Events
document.getElementById("product-form").addEventListener("submit",  e => {
  const name = document.getElementById("product-name").value
  price = document.getElementById("product-price").value
  year = document.getElementById("product-year").value




  //Save product
  const product = new Product(name, price, year);

  UI.addProduct(product);
  UI.resetForm();
  UI.showMessage("Product added successfully", "success");

  e.preventDefault();
});