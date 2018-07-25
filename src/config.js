export default{
    MAX_ATTACHMENT_SIZE:5000000,
    s3: {
       REGION: "us-east-1",
       BUCKET: "notely-app-uploads"
    },
    apiGateway:{
        REGION:"us-east-1",
        URL: "https://qtlkkm6dpf.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito:{
        REGION:"us-east-1",
        USER_POOL_ID:"us-east-1_63s0336hs",
        APP_CLIENT_ID:"1bs4s5cribkm3h73npffht6qs7",
        IDENTITY_POOL_ID:"us-east-1:e667bfe3-578f-429c-8b07-bbcb0eb24695"
    }
};