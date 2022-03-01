const x = require("dotenv").config();
const express    = require("express"),
      cors       = require("cors"),
      mongoose   = require("mongoose"),
      bodyParser = require("body-parser"),
      app        = express(),
      PORT       = process.env.PORT || 8081,
      posts      = require("./routes/posts"),
      user       = require('./routes/user');

app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true})); 
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));      

mongoose.connect("mongodb://localhost/memories", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server started!listening at ${PORT}`);
    });
}).catch((err)=>{
    console.log(err.message);
});


app.use("/api/post/", posts);
app.use("/api/user/", user);

// mongoose.set('useFindAndModify', false);