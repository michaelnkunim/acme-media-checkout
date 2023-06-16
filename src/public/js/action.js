function handlePaymentMethodChange(event) {
       
    const creditCardForm = document.getElementById('credit-card-form');
    const mobileMoneyForm = document.getElementById('mobile-money-form');
    const creditCardRadio = document.getElementById('credit');
    const mobileMoneyRadio = document.getElementById('debit');

    if(creditCardRadio){
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

// Update the cart item count badge
const cartItemCountElement = document.getElementById('cartItemCount');
cartItemCountElement.textContent = data.length.toString();

// Populate the cart items list
const cartItemsListElement = document.getElementById('cartItemsList');
cartItemsListElement.innerHTML = '';
let  cartTotal = 0;
data.forEach(item => {
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
  const itemTotalPrice = item.price * item.quantity;
  cartTotal += itemTotalPrice;

  const itemContent = `
  <div>
      <h6 class="my-0">${item.name}</h6>
      <small class="text-muted">ID: ${item.id}</small><br/>
      <small class="text-muted hide">${item.description}</small><br/>
      <span class="">Quantity: ${item.quantity}</span><br/>
      <span class="text-primary">Sub Total: $${itemTotalPrice}</span>
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

const cartTotalInput = document.getElementById('cartTotal');
if(cartTotalInput){
  cartTotalInput.value = cartTotal;
}
})
.catch(error => {
console.error('Error fetching cart data:', error);
const cartItemCountElement = document.getElementById('cartItemCount');
cartItemCountElement.textContent = 'Error';
});

}

getCartitems();


function validateForm(){
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      //  console.log(form.checkValidity())
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
    })
    return forms[0] && forms[0].checkValidity();
}




function validateCreditCard(creditCardNumber) {
    // Regular expression pattern for credit card number validation
    const regex = /^(?:[0-9]{4}-){3}[0-9]{4}$|^[0-9]{16}$/;
    const valid = regex.test(creditCardNumber);
    if(valid){ markInputAsValid('cardNumber') }else{markInputAsInValid('cardNumber') }
    return valid;
  }

 function validatePhoneNumber(phoneNumber){
  const regex = /^(\+\d{1,3})?\d{9}$/
  return regex.test(phoneNumber);
}

function validateCreditCardName(name) {
  const regex = /^[A-Za-z\s\-.'()]+$/;
  return regex.test(name);
}

function validateCVV(cvv){
  const regex = /^\d{3}$/
  const valid = regex.test(cvv);
  if(valid){ markInputAsValid('cvv') }else{markInputAsInValid('cvv') }
  return valid;
}

async function postData(formObject){
  try {
    const response = await fetch('http://localhost:3000/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    });

    const responseData = await response.json();
     console.log(responseData.errors);
     if(responseData.status === 200 && !responseData.errors.length){
      alert('Thank You For Your Order!');
      window.location.href = "http://localhost:3000"
     }else{
       responseData.errors.forEach(error=>{
       
       const outputElem = document.getElementById(error.field+"_validate_message");
       outputElem.innerHTML = error.message
       outputElem.style.display = 'block';

       setTimeout(() => {
        markInputAsInValid(error.field);
        console.log(error.field)
       }, 2000);
  
       });
     }
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    //alert(error);
    throw error;
  }
}

 function markInputAsValid(inputId){
  const element = document.getElementById(inputId);
  element.classList.remove('invalid-form-input');
  element.classList.add('valid-form-input');
}


function markInputAsInValid(inputId){
  const element = document.getElementById(inputId);
  element.classList.remove('valid-form-input');
  element.classList.add('invalid-form-input');
}


function validateExpiryDate(expiryDate) {
  let  valid;
  const formatRegex = /^\d{4}\/\d{2}$/;
  valid = formatRegex.test(expiryDate);
  if(valid){ markInputAsValid('expirationDate') }else{markInputAsInValid('expirationDate') }
  if (!valid) { return false; }
  
  const [year, month] = expiryDate.split('/');
  const expiry = new Date(Number(year), Number(month) - 1, 1); 
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  if (expiry <= today) {
    valid = false;
    if(valid){ markInputAsValid('expirationDate') }else{markInputAsInValid('expirationDate') }
    return valid;
  }
  valid = true;
  return valid;
}


var submitButton = document.querySelectorAll('#submitForm');

        submitButton.forEach(function(button) {
        button.addEventListener('click', function() {
        const formIsValid = validateForm();
      
        const formData = $('form').serializeArray();
        const formObject = {};
        formData.forEach(element =>{
          Object.assign(formObject,{[element.name]: element.value})
        });
        
        if(formIsValid){
        //submit Form Data
        const paymentMethod = formObject.paymentMethod;
        if(paymentMethod === 'momo'){
        const  phoneValid = validatePhoneNumber(formObject.momoNumber);
        if(phoneValid){  
          markInputAsValid('phoneNumber')
        }else{ 
          markInputAsInValid('phoneNumber')
         }

         const networkInvalidElement  = document.getElementById("networkValidateError");
     
         if(phoneValid && formObject.paymentMethod && formObject.network ){
          console.log('hello')
          markInputAsValid('network');
          networkInvalidElement.style.display = 'none';
          postData(formObject);
         }else{
          markInputAsInValid('network');
          networkInvalidElement.style.display = 'block';
         }

        }else if(paymentMethod === 'card'){

          const validName = validateCreditCardName(formObject.nameOnCard);
          if(validName){  
            markInputAsValid('nameOnCard')
          }else{ 
            markInputAsInValid('nameOnCard')
           }
           console.log('validName',validName)

           const validCardNumber = validateCreditCard(formObject.cardNumber);
           if(validCardNumber){  
             markInputAsValid('cardNumber')
           }else{ 
             markInputAsInValid('cardNumber')
            }

           const validateCardExpiry = validateExpiryDate(formObject.expirationDate);
           if(validateCardExpiry){  
            markInputAsValid('expirationDate');
          }else{ 
            markInputAsInValid('expirationDate');
           }

           const validateCvv = validateCVV(formObject.cvv);
           if(validateCvv){  
            markInputAsValid('cvv');
          }else{ 
            markInputAsInValid('cvv');
           }


        if(formIsValid & validName && validCardNumber && validCardNumber && validateCVV){
          postData(formObject);
        }

        }


      }
      })
      });