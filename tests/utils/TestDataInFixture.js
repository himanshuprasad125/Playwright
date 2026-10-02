//while sending test data using fixture, we can only send one set of data
const base = require('@playwright/test');  //base --> it can be any name

exports.testDataFixture = base.test.extend(
    {
        testData: { //it is JS object not JSON
            userName: "himanshuprasad@gmail.com",
            password: "Himanshu1",
            productName: "ZARA COAT 3",
            cardNumber: "1111 2222 3333 4444",
            expiryMonth: "07",
            expiryYear: "25",
            cvv: "123",
            nameOnCard: "Himanshu Prasad",
            enterCoupon: "rahulshettyacademy",
            shipToCountry: "India",
            orderConfirmationMessage: "Thankyou for the order."
        }
    }
)

