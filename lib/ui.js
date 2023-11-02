import { formatNumber } from './helpers.js';
import { updatetotal } from '../main.js';

function deleteLineFromCart(event) {
  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);
  Cartemptyupdater()
  Checkoutupdaterdelete()
  updatetotal()
}

function Cartemptyupdater() {
  const cartempty = document.querySelector('.cart table tbody');
  const cartElement = document.querySelector('.cart');
  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');
  if (cartempty.childElementCount === 0) {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}

function Checkoutupdateradd() {
  const cartempty = document.querySelector('.cart table tbody');
  const checkoutform = document.querySelector('.checkout');
  if (cartempty.childElementCount === 0) {
    checkoutform.classList.remove('hidden');
  }
}

function Checkoutupdaterdelete() {
  const cartempty = document.querySelector('.cart table tbody');
  const checkoutform = document.querySelector('.checkout');
  if (cartempty.childElementCount === 0) {
    checkoutform.classList.add('hidden');
  } else {
    checkoutform.classList.remove('hidden');
  }
}

/**
 * Búa til línu í cart töflu
 * @param {import('../main.js').Product} product
 * @param {number} quantity
 * @returns HTMLElement
 */

export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  /*
  <tr data-cart-product-id="1">
    <td>HTML húfa</td>
    <td>1</td>
    <td><span class="price">5.000 kr.-</span></td>
    <td><span class="price">5.000 kr.-</span></td>
    <td>
      <form class="remove" method="post">
        <button>Eyða</button>
      </form>
    </td>
  </tr>
  */
 
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.productId = product.id.toString();

  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement)

  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity.toString();
  cartLineElement.appendChild(quantityElement);

  const priceElement = document.createElement('td');
  priceElement.textContent = formatNumber(product.price);
  cartLineElement.appendChild(priceElement);

  const totalElement = document.createElement('td');
  totalElement.textContent = formatNumber(product.price * quantity);
  cartLineElement.appendChild(totalElement);

  const formTdElement = document.createElement('td');

  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart)

  const buttonElement = document.createElement('button');
  buttonElement.textContent= 'Eyða';
  formElement.appendChild (buttonElement);
  formTdElement.appendChild(formElement);
  cartLineElement.appendChild(formTdElement);

  Checkoutupdateradd()

  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}


