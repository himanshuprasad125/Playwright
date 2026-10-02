Feature: Ecommerce Validation

    # We have parameterized below scenario using data table so it is scenario outline
    @Regression
    Scenario Outline: Validate Login Error
        Given a login to Second Ecommerce application with "<username>" and "<password>"
        Then Verify Error Message is displayed

        Examples:
            | username           | password |
            | himanshu@gmail.com | himanshu |
            | sristi@gmail.com   | sristi   |