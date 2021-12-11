const express = require('express');
const { MongoClient } = require('mongodb');
// to hide the db user and password from being exposed
require('dotenv').config()
const app = express();
const port = 5000;

// changing the original js string ("")to template string (``)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s3dal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// to check the database uri
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        const database = client.db('carMechanic')
        const servicesCollection = database.collection('services')

        // POST API
        app.post('/services', async (req, res) => {
            const seervice = {
                "name": "ENGINE DIAGNOSTIC",
                "price": "300",
                "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
                "img": "https://i.ibb.co/dGDkr4v/1.jpg"
            }

            const result = await servicesCollection.insertOne(service)
            console.log(result)


        })
    }
    finally {
        //await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Genius Server')
})

app.listen(port, () => {
    console.log('Running Genius Server on Port', port)
})