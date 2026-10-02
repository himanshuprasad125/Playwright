//while sending test data using fixture, we can only send one set of data
import {test as baseTest} from '@playwright/test';

interface TestData 
{
            userName: string;
            password: string;
            productName: string;
            cardNumber: string;
            expiryMonth: string;
            expiryYear: string;
            cvv: string;
            nameOnCard: string;
            enterCoupon: string;
            shipToCountry: string;
            orderConfirmationMessage: string;
}

export const testDataFixture = baseTest.extend<{testData:TestData}>( //created interface above and implementing it here
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

