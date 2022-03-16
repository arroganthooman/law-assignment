const sha1 = require('js-sha1');
const { OAuth } = require('../models/OAuth');

const getToken = async (request) => {
    const currentDate = new Date();
    const accessToken = sha1(request.body.username + currentDate.toString());
    const refreshToken = sha1(request.body.username + new Date(currentDate.getTime() + 5*60000).toString());
    const OAuthModel = {
        access_token: accessToken,
        refresh_token: refreshToken,
        date_created: currentDate,
        date_expires: new Date(currentDate.getTime() + 5*60000),
        userId: request.body.username,
        client_id: request.body.client_id,
        client_secret: request.body.client_secret
    }

    const credential = await OAuth.create(OAuthModel);
    const response = {
        access_token: accessToken,
        expires_in: 300,
        token_type: "Bearer",
        scope: null,
        refresh_token: refreshToken
    }

    return response;
}


module.exports = {
    getToken
}