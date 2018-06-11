'use strict';

import basketService from '../../services/basketService';

describe("getRandomBasketItems calls", () => {
    let products;

    beforeAll((done) => {
        basketService.getRandomBasketItems()
            .then((data) => {
                products = data;
                done();
            });
    });

    it("service reply with a valid products list", function() {
        expect(Object.keys(products).length >= 0).toEqual(true);
    });

    it("all products have a valid required fields price/quantity/title", function() {
        Object.keys(products).forEach((key) => {
            let item = products[key];

            expect(item.price).toEqual(jasmine.any(Number));
            expect(item.quantity).toEqual(jasmine.any(Number));
            expect(item.title).toEqual(jasmine.any(String));
        });
    });
});