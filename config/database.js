const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log(chalk.green("Connected to Database"));
})
.catch((err)=>{
    console.log(chalk.red(err));
});