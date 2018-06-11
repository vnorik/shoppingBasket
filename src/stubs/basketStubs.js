'use strict';

/*
 * Mocked services related to the basket functionality
 *
 * in the schema Product id type is marked as number, here productN is used to simplify readability, in real life would be value as coming from the schema
 */

/*
 * return the mocked data of the random basket to be rendered and shown to the user
 */
const getRandomBasket = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: [
                    {
                        id: 'product1',
                        title: 'Apple',
                        quantity: _getRandomQuantity(),
                        price: 0.25,
                        promotion: null
                    },
                    {
                        id: 'product2',
                        title: 'Orange',
                        quantity: _getRandomQuantity(),
                        price: 0.3,
                        promotion: null
                    },
                    {
                        id: 'product3',
                        title: 'Banana',
                        quantity: _getRandomQuantity(),
                        price: 0.5,
                        promotion: null
                    },
                    {
                        id: 'product4',
                        title: 'Kiwi',
                        quantity: _getRandomQuantity(),
                        price: 0.25,
                        promotion: {
                            quantity: 3,
                            freeQuantity: 2,
                            title: 'available as 5 for the price of 3'
                        }

                    },
                    {
                        id: 'product5',
                        title: 'Papaya',
                        quantity: _getRandomQuantity(),
                        price: 0.25,
                        promotion: {
                            quantity: 2,
                            freeQuantity: 1,
                            title: 'available as 3 for the price of 2'
                        }
                    }
                ]
            });
        }, 1000);
    });
};

const _getRandomQuantity = () => {
    return Math.floor(Math.random() * 9) + 1;
};

export {getRandomBasket}

