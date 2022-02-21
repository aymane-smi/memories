const express    = require("express"),
      cors       = require("cors"),
      mongoose   = require("mongoose"),
      bodyParser = require("body-parser"),
      app        = express(),
      PORT       = process.env.PORT || 8081,
      posts      = require("./routes/posts");



app.use(bodyParser.json({limit: "30mb", extended: true})); 
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));      
app.use(cors());

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

// mongoose.set('useFindAndModify', false);