const express = require("express")
const server = express()

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


const donors = [
    {
        name: "Gabriele Kiane",
        blood: "AB+"
    },
    {
        name: "Diego Pellegrine",
        blood: "O+"
    },     
]

// configurar o server para exibir arquivos estaticos
server.use(express.static('public'))

server.get("/", function(req, res) {
    return res.render("index.html", { donors })
})

server.post("/", function(req, res) {
    //pegar dados do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})

// criar servidor
server.listen(3000, function() {
    console.log("Servidor iniciado!")
})