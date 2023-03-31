import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import connectDb from "./Middlewares/dbConnection.js"
import authRoute from "./Routes/authRoute.js"
import resumeRoute from "./Routes/resumeRoute.js"
import smartCardRoute from "./Routes/smartCardRoute.js"

connectDb()
const app = express()
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

dotenv.config()

const port = process.env.POR || 3002

app.use(cors())
app.use(express.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(express.json())
// app.use(bodyParser.json({limit: '50mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use("/api", authRoute)
app.use("/api", resumeRoute)
app.use("/api", smartCardRoute)

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// })

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})
