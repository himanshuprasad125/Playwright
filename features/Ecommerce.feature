Feature: Ecommerce Validation

    @Smoke @Regression
    Scenario: Placing the Order for Himanshu
        Given a login to Ecommerce application with "himanshuprasad@gmail.com" and "Himanshu1"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order for "himanshuprasad@gmail.com"
        Then Verify order in present in the OrderHistory
    
    @Regression
    Scenario: Placing the Order for Anshika 
        Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "ADIDAS ORIGINAL" to Cart
        Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
        When Enter valid details and Place the Order for "anshika@gmail.com"
        Then Verify order in present in the OrderHistory
