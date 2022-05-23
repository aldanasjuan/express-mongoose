const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

//let {hash,error} = await newPasswordHash(<password>)
async function newPasswordHash(password){
    return await argon2.hash(password)
}

//let {valid : bool, error : Error | Null } = await validatePasswordHash(<long hash string>, <password string>)
async function validatePasswordHash(hash, password){
    return await argon2.verify(hash, password)
}


async function isAuthorized(req, res, next){
    const header = req?.headers?.authorization
    if(!header){
        return res.status(401).end()
    }
    try{
        res.claims =  await jwt.verify(header, process.env.JWT_KEY)
    }catch(error){
        console.error(error)
        return res.status(401).end()
    }
    next()
}

module.exports = {
    newPasswordHash,
    validatePasswordHash,
    isAuthorized
}