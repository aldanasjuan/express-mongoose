const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24


function now(){
    return Math.round(Date.now() / 1000)
}
function toSnippet(v){ // used to generate vscode snippets
    console.log(JSON.stringify(v.split("\n"), null, 2))
}

module.exports = {
    MINUTE,
    HOUR,
    DAY,
    toSnippet,
    now
}