const { notStrictEqual } = require('assert');
const path = require('path');

const userController = {
    register:(req,res) =>{
        res.sendFile(path.join(__dirname, '../public/users/signup.html'));
    },
    registerProcess:(req,res) =>{
        console.log(req.body)
    }
}

module.exports = userController