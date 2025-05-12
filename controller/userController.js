const path = require('path');

const userController = {
    register:(req,res) =>{
        res.sendFile(path.join(__dirname, '../public/users/signup.html'));
    }
}

module.exports = userController