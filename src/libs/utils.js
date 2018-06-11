'use strict';

/*
 * Utils are a list of short independent helper functions which might be used across the whole application
 */

/*
 * Get extra quantity offerd by the running promotion
 */
const getPromotionQuantity = (quantity, promotion) => {
    if (!quantity || !promotion || !promotion.quantity || !promotion.freeQuantity) {
        return 0;
    }
    return getPromotionCount(quantity, promotion.quantity) * promotion.freeQuantity;
};

/*
 * Get the total amount of possible promotions to be applied
 */
const getPromotionCount = (quantity, promotionQuantity) => {
    if (!quantity || !promotionQuantity) {
        return 0;
    }

    const remainder = quantity % promotionQuantity;

    return (quantity - remainder) / promotionQuantity;
};

/*
 * Round the product price per quantity to the 2 decimals after coma
 */
const getRoundedPrice = (price, quantity) => {
    return Math.round(price*quantity*100) / 100;
};

export default {
    getPromotionQuantity,
    getPromotionCount,
    getRoundedPrice
}