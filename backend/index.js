const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./routes/user.routes")
const filmRoutes = require("./routes/film.routes")

require('dotenv').config()

const app = express()

// Configuración de CORS para permitir solicitudes desde cualquier origen

app.use(cors());

app.use(express.json())

app.set("secretKey", process.env.JWTSECRET)

const CONNECTIONSTRING = process.env.CONNECTIONSTRING

mongoose.connect(CONNECTIONSTRING)
.then(()=>{
    console.log(`Conexion con base de datos exitosa`)
})
.catch((err)=>{
    console.log(`Error al conectar con la base de datos: ${err}`)
})

app.use("/api/users",userRoutes)
app.use("/api/films",filmRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`API funcionado... puerto CORRECTO!`)
})