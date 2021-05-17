const express = require('express');
const app = express();


const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

//AuthenticationRoute
app.use('/auth', require('./routes/authentication'));
//sellerRoute
app.use('/sell-ushop', require('./routes/sellUshop'));

app.listen(port, () => {
    console.log(`listen to ${port}`)
});