const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
let products = [];

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productColor = document.getElementById("productColor").value;
  const productSize = document.getElementById("productSize").value;

  if (productName && productPrice && productColor && productSize) {
    const newProduct = {
      name: productName,
      price: productPrice,
      color: productColor,
      size: productSize,
    };

    products.push(newProduct);
    renderProductList();
    saveToLocalStorage();
    productForm.reset();
  }
});

function renderProductList() {
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <div>
        <strong>${product.name}</strong><br>
        Price: $${product.price}<br>
        Color: ${product.color}<br>
        Size: ${product.size}
      </div>
      <button onclick="deleteProduct(${index})">Delete</button>
    `;

    productList.appendChild(productItem);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  renderProductList();
  saveToLocalStorage();
}

function loadFromLocalStorage() {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    renderProductList();
  }
}


// axios.post("https://crudcrud.com/api/abbdc63fa24842a894907806a02a5a9f/productData",products)
// .then((respons) => {
//  showNewUserOnScreen(respone.data)
//  console.log(respone)

// })
// .catch((err) => {
//  console.log(err)
// })

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

loadFromLocalStorage(); // Load the data when the page loads

// After loading the data, set the input values from the local storage
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productColorInput = document.getElementById("productColor");
const productSizeInput = document.getElementById("productSize");

productNameInput.value = localStorage.getItem("productName") || "";
productPriceInput.value = localStorage.getItem("productPrice") || "";
productColorInput.value = localStorage.getItem("productColor") || "";
productSizeInput.value = localStorage.getItem("productSize") || "";

// Save input values to local storage whenever they change
productNameInput.addEventListener("change", () => {
  localStorage.setItem("productName", productNameInput.value);
});

productPriceInput.addEventListener("change", () => {
  localStorage.setItem("productPrice", productPriceInput.value);
});

productColorInput.addEventListener("change", () => {
  localStorage.setItem("productColor", productColorInput.value);
});

productSizeInput.addEventListener("change", () => {
  localStorage.setItem("productSize", productSizeInput.value);
});
