const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require("cors")
const app = express();
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000
// const port =  5000n
require('dotenv').config();

// middleware 

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSOWRD}@cluster0.4bmge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {

    try {
        await client.connect();

        const orderCollection = client.db("redio_db").collection("create");
        const packagesCollection = client.db("redio_db").collection("signUp");


        // post api 
        app.post('/create', async (req, res) => {
            const package = req.body
            console.log("hit thw poar api", package);
            const result = await packagesCollection.insertOne(package)
            console.log(result);
            res.json(result)
        })



        // get api 
        app.get('/show', async (req, res) => {
            const cursor = packagesCollection.find({})
            const data = await cursor.toArray();
            res.send(data)
            console.log(data)

        })


        // delete event

        app.delete("/show/:id", async (req, res) => {
            console.log(req.params.id);
            const result = await packagesCollection.deleteOne({
                _id: ObjectId(req.params.id)
            });
            res.send(result);
        });


    }
    finally {
        // await cllient.close()
    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("Assignment server is running")
})



app.listen(port, () => {
    console.log("Server Running Port", port);
})

    ;