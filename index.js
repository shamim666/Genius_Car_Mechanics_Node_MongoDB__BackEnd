const express = require('express');
const { MongoClient } = require('mongodb');
// to hide the db user and password from being exposed
require('dotenv').config()
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId 
const app = express();
const port = process.env.PORT || 5000;


//middleware

app.use(cors())
app.use(express.json())


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

        // GET API (find all services)
        app.get('/services' , async(req,res) =>{
            const cursor = servicesCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })

        // GET API (find specific one service)
        app.get('/services/:id' , async(req,res) =>{
            const id = req.params.id
            console.log('specific service id ' , id)
            const query = {_id:ObjectId(id)}
            const service = await servicesCollection.findOne(query)
            res.json(service)
        })


        // POST API (add one service)
        app.post('/services', async (req, res) => {
            const service = req.body
            console.log('hit the API' , service)
            const result = await servicesCollection.insertOne(service)
            console.log(result)
            res.json(result)

        
        })
        
        // DELETE API (delete one service)
        app.delete('/services/:id' , async(req,res) =>{
            const id = req.params.id
            console.log('deleted service id ' , id)
            const query = {_id:ObjectId(id)}
            const result = await servicesCollection.deleteOne(query)
            res.json(result)
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