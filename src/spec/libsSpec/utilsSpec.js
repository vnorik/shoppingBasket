'use strict';

import utils from '../../libs/utils';

describe("Utils functoins on returning the corect results for the helper functions", () => {
    it("getPromotionQuantity function, calculate how many product items would be offered for free", function() {
        expect(utils.getPromotionQuantity(7, {quantity: 3, freeQuantity: 2})).toEqual(4);
        expect(utils.getPromotionQuantity(5, {quantity: 3, freeQuantity: 1})).toEqual(1);
        expect(utils.getPromotionQuantity(3, {quantity: 4, freeQuantity: 1})).toEqual(0);
    });

    it("getPromotionCount function, calculate how many times promotion might be applied", function() {
        expect(utils.getPromotionCount(10, 1)).toEqual(10);
        expect(utils.getPromotionCount(9, 2)).toEqual(4);
        expect(utils.getPromotionCount(3, 2)).toEqual(1);
    });

    it("getRoundedPrice function, total price of items with a provided item price and quantity, rounded by 2 digits after come", function() {
        expect(utils.getRoundedPrice(0.3, 3)).toEqual(0.9);
        expect(utils.getRoundedPrice(0.25, 7)).toEqual(1.75);
        expect(utils.getRoundedPrice(0.7, 4)).toEqual(2.80);
    });
});