const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// database work
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentOptionsCollection = client.db('doctorsPortalDB').collection('appointmentOptions');
        const bookingsCollection = client.db('doctorsPortalDB').collection('bookings');

        // appointment options [GET]
        app.get('/appointmentOptions', async (req, res) => {
            const query = {};
            const options = await appointmentOptionsCollection.find(query).toArray();
            res.send(options);
        })

        // bookigns [POST]
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })
    }
    finally { }
}

run().catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('Doctors Portal Server is running');
})

app.listen(port, () => console.log("Server is running on port:", port));