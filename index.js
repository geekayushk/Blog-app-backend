const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require('cors')
const port = process.env.PORT || 8080;


dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))
//allows to send json objects during post

//from mongoose documentation 
//MONGO_URL is defined in .env
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("connected to MongoDB "))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    //cb is callback
    destination: (req, file, cb) => {
        cb(null, "images")   //images is the folder under api
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    },

})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded");
});

app.use(cors())
app.use("/api/auth", authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.listen(port, () => {
    console.log("backend is onnn");
})