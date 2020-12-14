'use strict'
const jwt = require('jsonwebtoken')
const fs = require('fs')
//Verifica token
const tokenverify = {
    verificacion : (req, res, next) => {
        const token = req.headers['access-token']
        if(token){
            const key = fs.readFileSync('config/jwtRS256.key')
            jwt.verify(token, key, { algorithms: ['RS512'] }, (err, decoded) => {
                if(err) {
                    console.log(err)
                    res.json({ message: 'Unauthorized'} )}
                else{
                    req.decoded = decoded
                    next()
                }
            })
        }
        else{
            res.send({ message: 'Unauthorized' })
        }
    }
}


module.exports = tokenverify