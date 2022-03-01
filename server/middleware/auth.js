const jwt = require("jsonwebtoken");

const auth = async (req, res, next)=>{
    let decodeData;
    try{
        const token = req.headers.authorization.split(" ")[1];
        //google OAuth length is less than 500
        const isCustomToken = token.length < 500;
        if(token && isCustomToken){
            decodeData = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decodeData?.id;
        }else{
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub;
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "something went wrong",
            err: err.message
        })
    }
};
module.exports = auth;