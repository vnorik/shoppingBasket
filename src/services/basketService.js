'use strict';

/*
 * service calls related to the basket functionality
 */

import {getRandomBasket} from '../stubs/basketStubs';

class basketService {
    async getRandomBasketItems(data = null) {
        let response = await getRandomBasket();
        let products = {};

        // Request error handler, in this case Mocked basket is always presented
        if (!response.success) {
            throw Error(response.error.message);
        }

        response.data.forEach((item, index) => {
            products[item.id] = item;
        });

        return products;
    }
}

const instance = new basketService();
Object.freeze(instance);

export default instance;