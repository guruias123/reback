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
dotenv.config()

const port = process.env.PORT || 3002

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", authRoute)
app.use("/api", resumeRoute)
app.use("/api", smartCardRoute)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('/', (req, res) => {
  res.status(200).json({
    status: "success"
  })
})
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})
