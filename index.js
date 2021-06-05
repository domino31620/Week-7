const express = require('express');
const app = express();
const secret = "suPErdUperBigSeCRet";
const PORT = 5000;
const jwt = require('jsonwebtoken');
app.use(express.json());

app.post('/create-token', (req,res) => {
    const payload = {
        username: req.body.username,
        id: req.body.id

    };
    
    const expiry = 36000
    jwt.sign(payload, secret, {expiresIn: expiry}, (err, token)=>{
        if(err){
            return res.status(500).json({err})
        }else{
            return res.status(200).json({token})
        }
    })
}) 

app.get('/decode-token', (req,res)=>{
    console.log(req.headers)
    if(!req.headers.authorization){
        res.status(403).json({message: 'Authentication token required!'})
    }
    const authHeader = req.headers.authorization;
    
    const splittedStr = authHeader.split(' ');
    console.log(splittedStr)
    const token = splittedStr[1]
    jwt.verify(token, secret, (err, decodedToken) =>{
        if(err){
            return res.status(500).json({err});
        }else{
            return res.status(200).json({ user: decodedToken})
        }
    })
})

app.listen(PORT, ()=>{ console.log(`Server is listening on ${PORT}`)})