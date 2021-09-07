const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();


const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json({limit: '50mb', extended : true}));
app.use(express.urlencoded({limit: '50mb', extended : true}));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

//AuthenticationRoute
app.use('/auth', require('./routes/authentication'));
//sellerRoute
app.use('/sell-ushop', require('./routes/sellUshop'));
//ushop route
app.use('/ushop', require('./routes/ushop'));

app.use('/cart', require('./routes/cart'));

app.use('/profile', require('./routes/profile'));


app.listen(port, () => {
    console.log(`listen to ${port}`)
});