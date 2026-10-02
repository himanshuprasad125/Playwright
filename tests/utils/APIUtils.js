class APIUtils
{
    constructor(apiContext,loginPayload,apiBaseURL)
    {
        //loginPayload is sent in constructor itself because this is very critical information and should be called before any script
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.apiBaseURL = apiBaseURL;
    }

    async getToken()
    {
        //Login API call
        const loginResponse = await this.apiContext.post(this.apiBaseURL+"/api/ecom/auth/login", {data:this.loginPayload} ); //making API call and storing response in loginResponse variable
        const loginResponseJson = await loginResponse.json(); //grabbing response and stroring it as json
        const token = loginResponseJson.token;  //grabbing token value from Json
        return token;
    }

    async createOrder(createOrderPayload)
    {
        let response = {}; //creating JS object which will store token & order, this object will be used in actual test as well
        response.token = await this.getToken();
        //Create Order API call
        const createOrderHeaders = {'authorization': response.token, 'content-type': 'application/json'};
        const createOrderResponse = await this.apiContext.post(this.apiBaseURL+"/api/ecom/order/create-order", {data : createOrderPayload , headers : createOrderHeaders} );
        const createOrderResponseJson = await createOrderResponse.json();
        const orderId = createOrderResponseJson.orders;

        response.orderId = orderId;
        return response;
    }
}

module.exports = {APIUtils};