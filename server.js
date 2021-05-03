const express = require('express');
const app = express();


const port = process.env.PORT || 8000;

app.get('/sample', (req,res) => {
    res.send('asdasd')
})
app.listen(port, () => {
    console.log(`listen to ${port}`)
});