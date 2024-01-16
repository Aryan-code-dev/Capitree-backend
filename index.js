const express = require('express');
var cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT || 3001;

app.use('/load',require('./src/routes/load'));
app.use('/update',require('./src/routes/update'));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
    }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

