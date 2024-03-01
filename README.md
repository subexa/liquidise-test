# Liquidise - QA Engineer Code Challenge

## Overview

This is a technical test for a QA Engineer role at Liquidise.

We've included the coding challenge below. Please review this and email Brendan at `brendan@liquidise.com` if you have any questions.

Once you receive this challenge, you will have 48 hours to complete your submission, which must be uploaded to a public GitHub repository.

We will assess:

1. Your code quality and comments
2. The way you utilise Git features to progress your work
3. Your ability to complete each item in the `Objectives` list below

We will then evaluate your job application based on this review.

## Setup

Using Node 16 and Yarn, run:

```
yarn install
```

Run the service after this, using:

```
npm run pizza
```

## Challenge

We've launched a new service, which adds the ability to order pizzas.

The system collects all the orders and then sends them to the Kitchen Partner, who is well known for their amazing pizzas.

Once the orders are sent to the Kitchen Partner, a contract is given for cooking.

We don't wait for those orders to be completed before accepting other orders but we keep track of their current status.

The Kitchen Partner verifies whether each order can be processed, including verification of the required ingredients.

If it finds that the order can be processed, it starts cooking the pizza. The orders don't need to be processed sequentially. They have a lot of chefs ready to start cooking.

If they can't process an order, the service should notify us. Hopefully we hear it.

## Objectives

The objectives of this challenge are:

1. Ensure that the Kitchen Partner can take order(s) and process them if the right conditions are met
2. Ensure that we keep track of the current status of order(s)
3. Ensure that once the orders are given for cooking, the chefs go ahead and collect the required ingredients and then bake the pizza.
4. Add any future improvement ideas, challenges, suggestions or comments to the `Candidate Notes` section below
5. Assuming a simple front-end was built for this service:
   a. Note your preferred UI testing framework
   b. Your opinions on it's suitability for our tech stack - TypeScript, React, MongoDB
   c. Pros and cons of this framework
   d. Note your responses in the `Candidate UI Testing Framework Recommendations` section below

## Requirements

1. Must be built using TypeScript
2. Add a suitable testing framework that supports the code in the `src` directory
3. Build Jest test script(s) that validate the code in the `src` directory meets each of the Objectives listed above
4. Ensure the Jest configuration is correct and there is a easy way to run your Jest test script(s)

## Candidate Notes

Objectives 1,2,3: Added unit test for ContractService, IngredientsService and OrdersService. Added integration test for PizzaService

## Candidate UI Testing Framework Recommendations

Playwright framework has been added to this project with an example stub for test.

1. Playwright is well-suited for TypeScript projects, providing strong typing support.
2. Playwright works well with most javascript frontend frameworks, allowing you to test html elements and interactions.
3. Playwright can interact with MongoDB indirectly through the front-end UI, but it's not directly related to MongoDB itself.

### Pros and Cons of Playwright:

Pros:

1. Supports TypeScript, providing type safety and better code quality.
2. Offers a simple and expressive API for writing UI tests.
3. Provides cross-browser testing capabilities, which is beneficial for a diverse user base.
4. Good documentation and active community support.

Cons:

1. Requires some learning curve, especially for those new to UI testing or automation testing in general.
