function handlePaymentMethodChange(event) {
       
    const creditCardForm = document.getElementById('credit-card-form');
    const mobileMoneyForm = document.getElementById('mobile-money-form');
    const creditCardRadio = document.getElementById('credit');
    const mobileMoneyRadio = document.getElementById('debit');

    if (creditCardRadio.checked) {
        creditCardForm.style.display = 'block';
        mobileMoneyForm.style.display = 'none';
    } else if (mobileMoneyRadio.checked) {
        creditCardForm.style.display = 'none';
        mobileMoneyForm.style.display = 'block'
    }
  }

    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethodRadios.forEach((radio) => {
        radio.addEventListener('change', handlePaymentMethodChange);
    });

     handlePaymentMethodChange();

 document.addEventListener('DOMContentLoaded', function() {
var addToCartButtons = document.querySelectorAll('.addToCart');

addToCartButtons.forEach(function(button) {
button.addEventListener('click', function() {
  var itemData = button.getAttribute('data-item'); 
  var itemID = button.getAttribute('data-id'); 
  var inputField = document.getElementById('input_'+itemID);
  var quantity = inputField.value; 
  var updatedItemData = JSON.parse(itemData);
  updatedItemData.quantity = parseInt(quantity);
  var updatedItemDataString = JSON.stringify(updatedItemData);

  // Send a POST request to the Node.js API to save the updated item data to cart.json
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'add-to-cart');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Item added to cart successfully');
        setTimeout(() => {
            getCartitems();
        }, 1000);
      } else {
        console.error('Error adding item to cart:', xhr.status);
      }
    }
  };
  xhr.send(JSON.stringify({ itemData: updatedItemDataString ,itemQuantity:quantity}));
});
});
});


function getCartitems(){
// Make a request to the Node.js endpoint to get cart data
fetch('get-cart')
.then(response => response.json())
.then(data => {

console.log(data);
// Update the cart item count badge
const cartItemCountElement = document.getElementById('cartItemCount');
cartItemCountElement.textContent = data.length.toString();

// Populate the cart items list
const cartItemsListElement = document.getElementById('cartItemsList');
cartItemsListElement.innerHTML = '';

data.forEach(item => {
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
  const itemTotalPrice = item.price * item.quantity;
  totalPrice += itemTotalPrice;
  totalQuantity += item.quantity;

  const itemContent = `
  <div>
      <h6 class="my-0">${item.name}</h6>
      <small class="text-muted">ID: ${item.id}</small><br/>
      <small class="text-muted hide">${item.description}</small><br/>
      <span class="">Quantity: ${item.quantity}</span><br/>
      <span class="text-primary">Total: $${itemTotalPrice}</span>
    </div>
    <span class="">$${item.price}</span>
  `;
  listItem.innerHTML = itemContent;

  cartItemsListElement.appendChild(listItem);
});
// const totalItemsElement = document.getElementById('totalItems');
// totalItemsElement.textContent = totalQuantity.toString();
// const totalPriceElement = document.getElementById('totalPrice');
// totalPriceElement.textContent = `$${totalPrice}`;
})
.catch(error => {
console.error('Error fetching cart data:', error);
const cartItemCountElement = document.getElementById('cartItemCount');
cartItemCountElement.textContent = 'Error';
});

}

getCartitems();