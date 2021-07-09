const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
const port = process.env.PORT||8080;
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require('multer');
dotenv.config();
const app = express();
require('./config/database');
app.use(express.json());
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "images");
    }, filename:(req, res, cb)=>{
        cb(null, req.body.name);
    }
});

const upload = multer({storage:storage});

app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json({"message":"File Uploaded"});
})
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.listen(port, ()=>{
    console.log(chalk.yellow(`Listening to port ${port}`));
})