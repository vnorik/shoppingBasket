'use strict';

import './index.scss';

import basketService from './services/basketService';
import utils from './libs/utils';

/*
 * items list available within the basket
 */
let items = {};

/*
 * initialize the basket by fetching the random basket details, render the content and update the total price
 */
const renderBasket = (data = {}) => {
    basketService.getRandomBasketItems()
        .then((basketItems) => {
            items = basketItems;
            renderBasketContent(items);
            updateTotalPrice(items);
        })
        .catch((error) => {
            alert(error);
        });
};

/*
 * Render basket content from the specified template and preset all the data.
 * Basket items are created as a clone of template and appended to the document fragment.
 * When the all basket items are ready, document fragment appended to the items list.
 */
const renderBasketContent = (items) => {
    if (!('content' in document.createElement('template'))) {
        // Another way to process the template if the HTML template element is not supported
        return;
    }

    const $itemsList = document.getElementById('itemsList');
    const $noItemTemplate = document.getElementById('noItemsTemplate');
    const itemsKeys = items && Object.keys(items);

    $itemsList.innerHTML = '';

    if (!itemsKeys || itemsKeys.length === 0) {
        $itemsList.appendChild($noItemTemplate.content.cloneNode(true));
        return;
    }

    const $itemTemplate = document.getElementById('itemTemplate');
    const itemListDocumentFragment = document.createDocumentFragment();

    // build item items from the template and append them to the documentFragment
    itemsKeys.forEach((key) => {
        const item = items[key];
        const itemNode = $itemTemplate.content.cloneNode(true);
        const itemIdNodes = itemNode.querySelectorAll('.tmplItemId');
        const extraQuantity = utils.getPromotionQuantity(item.quantity, item.promotion);

        itemNode.querySelector('.tmplItemTitle').textContent = item.title;
        itemNode.querySelector('.tpmlItemPromotionTitle').textContent = item.promotion && item.promotion.title || '';
        itemNode.querySelector('.tmplItemQuantity').textContent = item.quantity;
        itemNode.querySelector('.tmplItemPrice').textContent = item.price;
        itemNode.querySelector('.tmplItemTotalPrice').textContent = utils.getRoundedPrice(item.price, item.quantity);
        itemNode.querySelector('.tmplItemPromotionQuantity').textContent = getPromotionNoteIfNeeded(extraQuantity);
        itemNode.querySelector('.tmplItemQuantityValue').value = item.quantity;

        itemIdNodes.forEach((node) => {
            node.dataset.id = item.id;
        });

        itemListDocumentFragment.appendChild(itemNode);
    });

    $itemsList.appendChild(itemListDocumentFragment);
};

const registerBasketEventListeners = () => {
    const $itemsList = document.getElementById('itemsList');

    $itemsList.addEventListener("click", addRemoveItemListener);
    $itemsList .addEventListener("change", addUpdateItemQuantityListener);
};

/*
 * delegate of removing the items by button click with action = delete within a items list
 */
const addRemoveItemListener = (e) => {
    const $element = e.target;
    const $currentTarget = e.currentTarget;
    const id = $element.dataset.id;

    // validate if the element has a delete action and a present item Id to be deleted
    if (!$element || $element.dataset.action !== 'delete' || !id || !items[id]) {
        return;
    }

    delete items[id];
    $currentTarget.querySelector(`.itemCard[data-id=${id}]`).remove();
    updateTotalPrice(items);
};

/*
 * delegate of updating the items quantityby data attribute action = 'quantity' on item quantity change and update the totalPrice
 */
const addUpdateItemQuantityListener = (e) => {
    const $element = e.target;
    const $currentTarget = e.currentTarget;
    const id = $element.dataset.id;

    // return if the  element isn't a quantity action or there are no item with specified id in the items list
    if (!$element || $element.dataset.action !== 'quantity' || !items[id]) {
        return;
    }

    const item = items[id];

    // set the item quantity in the items model and update the UI
    item.quantity = $element.value;

    const $itemNode = $currentTarget.querySelector(`.itemCard[data-id=${id}]`);
    const extraQuantity = utils.getPromotionQuantity(item.quantity, item.promotion);

    $itemNode.querySelector('.tmplItemQuantity').textContent = item.quantity;
    $itemNode.querySelector('.tmplItemTotalPrice').textContent = utils.getRoundedPrice(item.price, item.quantity);
    $itemNode.querySelector('.tmplItemPromotionQuantity').textContent = getPromotionNoteIfNeeded(extraQuantity);

    updateTotalPrice(items);
};

/*
 * Checks and generate the promotion note if any promotion quantity exists
 */
const getPromotionNoteIfNeeded = (extraQuantity) => {
    return extraQuantity === 0 ? '' : ` + ${extraQuantity} for free`
}

/*
 * Recalculate and Update the Items Total Price
 */
const updateTotalPrice = (items) => {
    let totalPrice = Object.keys(items).reduce((total, key) => {
        const price = items[key].price;
        const quantity = items[key].quantity;

        return total + (price && quantity ? utils.getRoundedPrice(price, quantity) : 0);
    }, 0);

    document.getElementById('totalPrice').innerHTML = totalPrice;

    return totalPrice;
};


/*
 * render the content and register event listeners
 */
renderBasket();
registerBasketEventListeners();


