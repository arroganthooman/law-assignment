const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { db } = require('./util/database')
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false})

const {
    fetchToken,
    createOne,
    fetchResource
} = require('./controller')


app.get("/", (req, res) => {
    res.json({message:"Hello World"})
})

app.post("/create", urlEncodedParser, createOne);
app.post("/oauth/token", urlEncodedParser, fetchToken);


app.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            error: "No credentials!"
        })
    }

    next();
})

// Protected routes (need bearer)
app.post("/oauth/resource",fetchResource)

const start = async () => {
    try {
        await db.sync(
            {force: false}
        );

        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`)
        })

    } catch (err) {
        console.log(err);
    }
}

start();