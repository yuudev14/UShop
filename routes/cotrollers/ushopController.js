const db = require('../../db');

const getMostPopularProducts = async(req, res) => {
    try {
        const popularProducts = await db.query(
            ``
        )
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    getMostPopularProducts,
}