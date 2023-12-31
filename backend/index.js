const connectToMongoose = require("./db");
const cors = require("cors");
connectToMongoose();
const express = require('express')
const app = express()
const port = 5000

app.use(cors())


//available routes

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


app.use(express.json())
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
 

app.listen(port, () => {
  console.log(`inotebook app listening on port ${port}`)
})