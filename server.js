const express = require('express');
const app = express();


const port = process.env.PORT || 8000;

app.use(express.json({limit: '50mb', extended : true}));
app.use(express.urlencoded({limit: '50mb', extended : true}));

//AuthenticationRoute
app.use('/auth', require('./routes/authentication'));
//sellerRoute
app.use('/sell-ushop', require('./routes/sellUshop'));
//ushop route
app.use('/ushop', require('./routes/ushop'));


app.listen(port, () => {
    console.log(`listen to ${port}`)
});