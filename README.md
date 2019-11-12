# Whether to unit-test and/or end-to-end test
This app is based on [Getting Started with Angular: Your First App](https://angular.io/start). 
Few changes are introduced to add element selectors. 
Getting started instructions found [here](https://github.com/xgirma/unit-vs-e2e/blob/master/docs/getting.started.md). 
If you encounter errors look [here](https://github.com/xgirma/unit-vs-e2e/blob/master/docs/google.is.your.friend.md) or 
create an issue with this [template](https://github.com/xgirma/unit-vs-e2e/blob/master/.github/ISSUE_TEMPLATE/bug_report.md).

## Testing Pyramid
<img width="1179" alt="Screen Shot 2019-11-11 at 12 03 08 AM" src="https://user-images.githubusercontent.com/5876481/68562273-e9693800-0416-11ea-9db2-4c29d87e0841.png">

Which testing approach? a, b, or c.

    a. pyramid 
    b. test.allTheThings()
    c. cone

test.allTheThings()<sup id="a1">[1](#f1)</sup>

## Background
[Your First App](https://angular.io/start) is a small Angular application containing the four pages, shown below.

<img width="1179" alt="Screen Shot 2019-11-11 at 12 48 06 AM" src="https://user-images.githubusercontent.com/5876481/68563873-0274e780-041d-11ea-9876-6d39dc5f3f2e.png">

Products page display list of products. 
Details page display product details. 
Cart page display items added to the cart. 
Shipping page shows shipping options.  

The goal is to attempt to get near-full unit- and e2e-test coverage for each of the pages. 
On doing so document which testing pyramid is viable for the app.

## Limitations: :warning:
Only a single front-end framework (Angular 8) and a single integration test framework (Protractor) is used. Testability varies from one framework to another. Using different frameworks may or may not present a different result.<sup id="a1">[2](#f1)</sup>
   
What is a unit of software-code is arguable. 

Intuitively, we use Angular's classification of application modules; and have seven-unit of applications (six components and one service) to experiment. For clarity and time, we ignore other parts of the application. 


--------------
<b id="f1">1</b> SauceLabs: test.allTheThings(). [↩](#a1)

<b id="f1">2</b> Extended future work might be trying the same application in different frameworks and see if the result found to have some correlations.
