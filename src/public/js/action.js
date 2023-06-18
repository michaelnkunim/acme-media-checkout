function handlePaymentMethodChange(event) {

  const creditCardForm = document.getElementById('credit-card-form');
  const mobileMoneyForm = document.getElementById('mobile-money-form');
  const creditCardRadio = document.getElementById('credit');
  const mobileMoneyRadio = document.getElementById('debit');

  if (creditCardRadio) {
    if (creditCardRadio.checked) {
      creditCardForm.style.display = 'block';
      mobileMoneyForm.style.display = 'none';
    } else if (mobileMoneyRadio.checked) {
      creditCardForm.style.display = 'none';
      mobileMoneyForm.style.display = 'block'
    }
  }
}

const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
paymentMethodRadios.forEach((radio) => {
  radio.addEventListener('change', handlePaymentMethodChange);
});

handlePaymentMethodChange();

document.addEventListener('DOMContentLoaded', function () {
  var addToCartButtons = document.querySelectorAll('.addToCart');

  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var itemData = button.getAttribute('data-item');
      var itemID = button.getAttribute('data-id');
      var inputField = document.getElementById('input_' + itemID);
      var quantity = inputField.value;
      var updatedItemData = JSON.parse(itemData);
      updatedItemData.quantity = parseInt(quantity);
      let cartItems = []
      const cartItem = updatedItemData;
      const cartitemsString = localStorage.getItem('cartItems');
      cartItems = JSON.parse(cartitemsString) || [];
      addToCart(updatedItemData.id,cartItems,cartItem)
    });
  });
});

function addToCart(id,cartItems,cartItem){
  const existingItemIndex = cartItems.findIndex((item) => item.id === id);
  if (existingItemIndex > -1) {
    cartItems.splice(existingItemIndex, 1);
  }
  cartItems.push(cartItem)
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  getCartitems();
}

document.addEventListener('DOMContentLoaded', function () {
  const parentElement = document.getElementById('cartItemsList');
  parentElement.addEventListener('click', (event) => {

    const cartitemsString = localStorage.getItem('cartItems');
    cartItems = JSON.parse(cartitemsString) || [];
    
    const clickedElement = event.target;
    if (clickedElement.matches('.removeFromCart')) {
      var itemID = clickedElement.getAttribute('data-id');
      removeFromCart(itemID)
    }
    if (clickedElement.matches('.increaseItems')) {
      var itemID = clickedElement.getAttribute('data-id');
      var quantity = (clickedElement.getAttribute('data-quantity') * 1);
      var itemID = (clickedElement.getAttribute('data-id') * 1);
      var itemData = cartItems.filter((i)=> i.id === itemID)[0];
       quantity += 1;
       itemData.quantity = quantity;
       addToCart(itemID,cartItems,itemData);
    }
    if (clickedElement.matches('.decreaseItems')) {
      var quantity = (clickedElement.getAttribute('data-quantity') * 1);
      var itemID = (clickedElement.getAttribute('data-id') * 1);
      var itemData = cartItems.filter((i)=> i.id === itemID)[0];
       quantity -= 1;
      if(quantity  < 1){
        removeFromCart(itemID)
      }else{
        itemData.quantity = quantity;
        addToCart(itemID,cartItems,itemData)
      }
    }
  });
})

function removeFromCart(id){
  const cartitemsString = localStorage.getItem('cartItems');
  const cartItems = JSON.parse(cartitemsString) || [];
  console.log(cartItems)
  const existingItemIndex = cartItems.findIndex((item) => item.id === (id * 1) );
  console.log(existingItemIndex)
  if (existingItemIndex > -1) {
    cartItems.splice(existingItemIndex, 1);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  getCartitems();
}


function getCartitems() {

  const cartitemsString = localStorage.getItem('cartItems');
  const cartItems = JSON.parse(cartitemsString) || [];
  const cartItemCountElement = document.getElementById('cartItemCount');
  cartItemCountElement.textContent = cartItems.length.toString();
  const cartItemsListElement = document.getElementById('cartItemsList');
  cartItemsListElement.innerHTML = '';
  let cartTotal = 0;
  cartItems.sort((a,b) => b.id - a.id).forEach(data => {
    const item = data
    itemStringified = JSON.stringify(item);
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
    const itemTotalPrice = item.price * item.quantity;
    cartTotal += itemTotalPrice;

    const itemContent = `
  <div class="row">
      <h6 class="my-0">${item.name}</h6>
      <small class="text-muted">ID: ${item.id}</small><br/>
      <small class="text-muted hide">${item.description}</small><br/>
      <span class="">Quantity: ${item.quantity}</span><br/>
      <span class="text-primary">Sub Total: $${itemTotalPrice}</span>
      <div class="col-md-8 col-lg-8 col-xl-8"><button data-id="${item.id}"  class="w-100 mt-1 btn btn-sm btn-secondary removeFromCart" type="button">remove</button></div>
      <div class="col-md-2 col-lg-2 col-xl-2"> 
      <button class=" mt-1 btn btn-sm btn-secondary decreaseItems" data-id="${item.id}" data-quantity="${item.quantity}">-</button> </div>
      <div class="col-md-2 col-lg-2 col-xl-2">
      <button class="mt-1 btn btn-sm btn-secondary increaseItems" data-id="${item.id}"  data-quantity="${ item.quantity}">+</button></div>
    </div>
    <span class="">$${item.price}</span>
  `;
    listItem.innerHTML = itemContent;

    cartItemsListElement.appendChild(listItem);
  });
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
  const grandTotalMarkup = `<div><span>Grand Total (USD)</span></div><span class="pull-right"><strong>$${cartTotal}</strong></span>`;
  listItem.innerHTML = grandTotalMarkup;
  cartItemsListElement.appendChild(listItem);

  if(!cartItems.length){
  const listItem3 = document.createElement('li');
  listItem3.className = 'list-group-item d-flex justify-content-between lh-sm';
  const emptyCart = `<div class=''>You have No items in your cart </div>`;
  listItem3.innerHTML = emptyCart;
  cartItemsListElement.appendChild(listItem3);
  }

  const payForm =  document.getElementById('payForm');

  if(cartItems.length && !payForm){
  const listItem2 = document.createElement('li');
  listItem2.className = 'list-group-item d-flex justify-content-between lh-sm';
  const checkoutBtn = `<a href="/?do_payment=true"><button  id="submitForm" class="w-100 mt-2 btn btn-primary btn-lg text-white" type="submit"><span style="color:white"> Go To Checkout </span></buttton></a>`;
  listItem2.innerHTML = checkoutBtn;
  cartItemsListElement.appendChild(listItem2);
  }

  const submitForm =  document.getElementById('submitForm');

  if(submitForm && !cartItems.length){
   submitForm.style.display = 'none';
  }

  if(!cartItems.length && submitForm){
    const listItem4 = document.createElement('li');
    listItem4.className = 'list-group-item d-flex justify-content-between lh-sm';
    const backBtnn = `<a href="/"><button  class="w-100 mt-2 btn btn-secondary btn-lg text-white" type="button"><span style="color:white"> Back To Products Page </span></buttton></a>`;
    listItem4.innerHTML = backBtnn;
    cartItemsListElement.appendChild(listItem4);
    }


  const cartTotalInput = document.getElementById('cartTotal');
  if (cartTotalInput) {
    cartTotalInput.value = cartTotal;
  }
}

getCartitems();


function validateForm() {
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    })
  return forms[0] && forms[0].checkValidity();
}




function validateCreditCard(creditCardNumber) {
  const regex = /^(?:[0-9]{4}-){3}[0-9]{4}$|^[0-9]{16}$/;
  const valid = regex.test(creditCardNumber);
  if (valid) { markInputAsValid('cardNumber') } else { markInputAsInValid('cardNumber') }
  return valid;
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^(\+\d{1,3})?\d{9}$/
  return regex.test(phoneNumber);
}

function validateCreditCardName(name) {
  const regex = /^[A-Za-z\s\-.'()]+$/;
  return regex.test(name);
}

function validateCVV(cvv) {
  const regex = /^\d{3}$/
  const valid = regex.test(cvv);
  if (valid) { markInputAsValid('cvv') } else { markInputAsInValid('cvv') }
  return valid;
}

async function postData(formObject) {
  const cartitemsString = localStorage.getItem('cartItems');
  cartItems = JSON.parse(cartitemsString) || [];
  try {
    const response = await fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({formObject,cartItems})
    });

    const responseData = await response.json();
    console.log(responseData.errors);
    if (responseData.status === 200 && !responseData.errors.length) {
      localStorage.removeItem('cartItems')
      alert('Thank You For Your Order!');
      window.location.href = "http://localhost:3000"
      
    } else {
      responseData.errors.forEach(error => {
        console.log(error);
        const outputElem = document.getElementById(error.field + "_validate_message");
        outputElem.innerHTML = error.message
        outputElem.style.display = 'block';

        setTimeout(() => {
          markInputAsInValid(error.field);
          console.log(error.field)
        }, 1000);

      });
    }
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function markInputAsValid(inputId) {
  const element = document.getElementById(inputId);
  const elementStatus = document.getElementById(`${inputId}_validate_message`);
  elementStatus.style.display = 'none';
  element.classList.remove('invalid-form-input');
  element.classList.add('valid-form-input');
}


function markInputAsInValid(inputId) {
  console.log(inputId);
  const element = document.getElementById(inputId);
  const elementStatus = document.getElementById(`${inputId}_validate_message`);
  elementStatus.style.display = 'block';
  element.classList.remove('valid-form-input');
  element.classList.add('invalid-form-input');
}


function validateExpiryDate(expiryDate) {
  let valid;
  const formatRegex = /^\d{4}\/\d{2}$/;
  valid = formatRegex.test(expiryDate);
  if (valid) { markInputAsValid('expirationDate') } else { markInputAsInValid('expirationDate') }
  return valid;
}

function compareExpirationDate(expiryDate) {
  let valid;
  const [year, month] = expiryDate.split('/');
  const expiry = new Date(Number(year), Number(month) - 1, 1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (expiry <= today) {
    valid = false;
    if (valid) { markInputAsValid('expirationDate') } else { markInputAsInValid('expirationDate') }
    return valid;
  }
  return true;
}


var submitButton = document.querySelectorAll('#submitForm');

submitButton.forEach(function (button) {
  button.addEventListener('click', function () {
    const formIsValid = validateForm();

    const formData = $('form').serializeArray();
    const formObject = {};
    formData.forEach(element => {
      Object.assign(formObject, { [element.name]: element.value })
    });

    if (formIsValid) {
      const paymentMethod = formObject.paymentMethod;
      if (paymentMethod === 'momo') {
        const phoneValid = validatePhoneNumber(formObject.momoNumber);
        if (phoneValid) {
          markInputAsValid('phoneNumber')
        } else {
          markInputAsInValid('phoneNumber')
        }

        const networkInvalidElement = document.getElementById("network_validate_message");

        if (phoneValid && formObject.paymentMethod && formObject.network) {
          console.log('hello')
          markInputAsValid('network');
          networkInvalidElement.style.display = 'none';
          postData(formObject);
        } else {
          markInputAsInValid('network');
          networkInvalidElement.style.display = 'block';
        }

      } else if (paymentMethod === 'card') {

        const validName = validateCreditCardName(formObject.nameOnCard);
        if (validName) {
          markInputAsValid('nameOnCard')
        } else {
          markInputAsInValid('nameOnCard')
        }
        console.log('validName', validName)

        const validCardNumber = validateCreditCard(formObject.cardNumber);
        if (validCardNumber) {
          markInputAsValid('cardNumber')
        } else {
          markInputAsInValid('cardNumber')
        }

        const validateCardExpiry = validateExpiryDate(formObject.expirationDate) &&
          compareExpirationDate(formObject.expirationDate);
        if (validateCardExpiry) {
          markInputAsValid('expirationDate');
        } else {
          markInputAsInValid('expirationDate');
        }

        const validateCvv = validateCVV(formObject.cvv);
        if (validateCvv) {
          markInputAsValid('cvv');
        } else {
          markInputAsInValid('cvv');
        }


        if (formIsValid & validName && validCardNumber && validCardNumber && validateCVV) {
          postData(formObject);
        }

      }


    }
  })
});