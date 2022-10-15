const fs = require("fs")
module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(item => {
        if(item === "index.js") return
        const file = require(`./${item}`)
        app.use(file)
    })
}
