function passwordValidator({ length = 8, lower = true, upper = true, num = true, symbol = true } = {}) {
    return function (str) {
        if (typeof str != 'string') {
            return false
        }
        let a = lower ? (/[a-z]/g).test(str) : true
        let b = upper ? (/[A-Z]/g).test(str) : true
        let c = num ? (/[0-9]/g).test(str) : true
        let d = symbol ? (/[^a-zA-Z\d]/g).test(str) : true
        let e = str.length >= length
        return  a && b && c && d && e
    }
}

const password = passwordValidator()

function email(email){
    if(typeof email != "string")return false
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email.toLowerCase());
}


module.exports = {
    password,
    email
}