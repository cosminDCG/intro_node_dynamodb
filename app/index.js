const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const Config = require('./env/Config');
const Constants = require('./constants/TableName');

app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

var DynamoDB = require('./dao/DynamoDB');

initialize = async() => {
    response = await DynamoDB.listTables();
    if(response.TableNames.length == 0){
        await DynamoDB.createTable(Constants.USER_TABLE, 'uuid', 5, 5);
        await DynamoDB.createTable(Constants.POST_TABLE, 'uuid', 5, 5);
    }
    console.log(response)
}

var server = app.listen(Config.port, async() => {
    console.log('Tweeter is listening on port: ' + Config.port + '!');
    await initialize();
});
