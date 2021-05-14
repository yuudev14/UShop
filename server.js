const express = require('express');
const app = express();


const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

//sellerAuthenticationRoute
app.use('/sellerAuth', require('./routes/sellerAuthentication'));

app.listen(port, () => {
    console.log(`listen to ${port}`)
});