# Shopping Basket

Get and show the Random Shopping Basket with specific promotion details if applicable.
Give user the ability change the quantity of products or delete any of them.

## Overview

### Web Application build flow
* Request Random Basket
* Analyze and render the list of products from the received basket
* Action elements available to edit the quantity or delete the product from the basket

### Application structure
* libs - utility, helpers
* services - remote service calls to get the data from the server
* main.js - main JS file that initiate all functionality (render basket and register listeners)
* stubs - mocked data to simulate data fetching from the server
* spec - unit tests of the available functionality

To simulate the server calls Promise with a setTimeout function is in use.

### Application Details

Application is done with Vanilla JS based on ES6 standart.
Build with webpack + babel.

## Running locally

To run the project on your local simple run the following command form the project root

```
npm run build
```

index.html would be available under the build folder.

For the dev purposes watch script is in place by running

```
npm run watch
```

To run the list of test please use the following command

```
npm run test
```

## Database Schema could be found by the URL

[Data Schema](https://goo.gl/oqn3yT)

## Deployment

Web Application is deployed as a static content under the AWS S3 bucket.
AWS CodeBuild service available to build the latest changes for the bucket.
Deployed version can be found by the URL:

[Shopping Basket](https://s3-eu-west-1.amazonaws.com/shopping-basket/index.html)

## Future improvements
* extend with more tests
* create more environment to build/watch - local/dev/staging/production
* errors handling improvements
* when Applicaiton will grow split the html/js/css per components, now only the main allocated under src
* use the template engine like handlebars, pug, etc. and split the view layer from logic
* if Application will grow switch to framework like React for example
* check in the earlier IE versions if needed
* responsive mobile friendly layout
* nicer look and feel, UX improvements
* support of multiple promotion types (for example discounts)
* show more detailed messages about the applied promotion and prices
* support different prices and promotions per country/currency
* add more product details (like description, image, etc.)
* add users support, has a user assigned to the basket if exists, by default would be a guest
* plug and configure linter tool to maintain and control the code quality