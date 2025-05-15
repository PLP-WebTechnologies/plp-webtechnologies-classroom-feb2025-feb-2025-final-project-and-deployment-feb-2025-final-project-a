// Global cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to toggle the cart sidebar
function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  if (cartSidebar) {
    cartSidebar.classList.toggle("open");
  } else {
    console.error("Cart sidebar element not found.");
  }
}

// Function to update the cart count
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
}

// Function to update the cart display
function updateCartDisplay() {
  const cartContainer = document.querySelector("#cart-sidebar .cart-items");
  const cartFooter = document.querySelector("#cart-sidebar .cart-footer");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p>Price: R${item.price}</p>
        <p>Quantity: 
          <button onclick="decreaseQuantity(${index})">-</button>
          ${item.quantity}
          <button onclick="increaseQuantity(${index})">+</button>
        </p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  cartFooter.innerHTML = `
    <p>Total: R${total.toFixed(2)}</p>
    <button onclick="proceedToCheckout()">Checkout</button>
    <button onclick="clearCart()">Clear Cart</button>
  `;
}

// Function to add an item to the cart
function addToCart(name, price, image) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart display and count
  updateCartDisplay();
  updateCartCount();
}

// Attach event listeners to Add-to-Cart buttons
document.querySelectorAll(".add-to-cart").forEach((button, index) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const name = productCard.querySelector("h3").textContent;
    const price = parseFloat(
      productCard.querySelector(".price").textContent.replace("R", "")
    );
    const image = productCard.querySelector("img").src;

    addToCart(name, price, image);
  });
});

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  updateCartDisplay();
  updateCartCount(); // Update the cart count
}

// Function to clear the cart
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    updateCartDisplay();
    updateCartCount(); // Update the cart count
  }
}

// Function to increase the quantity of an item
function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  updateCartDisplay();
  updateCartCount(); // Update the cart count
}

// Function to decrease the quantity of an item
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    removeFromCart(index);
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  updateCartDisplay();
  updateCartCount(); // Update the cart count
}

// Function to proceed to the checkout page
function proceedToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items to proceed to checkout.");
    return;
  }
  // Redirect to the checkout page
  window.location.href = "checkout.html";
}

// Function to display checkout items
function displayCheckoutItems() {
  const checkoutItemsContainer = document.getElementById("checkout-items");
  checkoutItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    checkoutItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const checkoutItem = document.createElement("div");
    checkoutItem.classList.add("checkout-item");
    checkoutItem.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: R${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
    `;
    checkoutItemsContainer.appendChild(checkoutItem);
  });

  const totalElement = document.createElement("p");
  totalElement.innerHTML = `<strong>Total: R${total}</strong>`;
  checkoutItemsContainer.appendChild(totalElement);
}

// Function to handle checkout form submission
function handleCheckout(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const paymentMethod = document.getElementById("payment").value;

  if (!name || !address || !paymentMethod) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Simulate checkout process
  alert(
    `Thank you for your purchase, ${name}! Your order will be shipped to ${address}.`
  );

  // Clear the cart after successful checkout
  clearCart();

  // Redirect to a confirmation page or home page
  window.location.href = "index.html";
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the cart from localStorage or initialize it as an empty array
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update the cart display and count
  updateCartDisplay();
  updateCartCount();

  // Call this function on the checkout page
  displayCheckoutItems();
});
