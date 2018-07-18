const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const path = require('path');

const items = require('./routes/api/items.js');

const app = express();

//Bodyparser middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

// Serve static assets of in prod
if(process.env.NODE.ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));