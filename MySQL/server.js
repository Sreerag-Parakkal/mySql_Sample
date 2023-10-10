const express = require("express");
const app = express();
const PORT = 4000;
const mysql = require("mysql"); 

const connection  = mysql.createConnection({
    user:'root',
    password:'sreekuttan@2001',
    host:'localhost',
    database:'mern_data'
});

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Home');
});

app.post('/signup',(req,res)=>{
    console.log(req.body);
    const {userName,email,password} = req.body;
    const query = `INSERT INTO users (userName,email,password) VALUES ('${userName}','${email}','${password}')`;

    connection.query(query,(err,result)=>{
        if (err) {
            console.log(err.message);
        }
        console.log(result);

        res.send('Signup successfully completed');
    })
});

app.get('/users',(req,res)=>{

    const query = 'SELECT * FROM users';
    connection.query(query,(err,result) => {
        if(err){
            console.log(err.message);
        }
        console.log(result);

        res.send(result);
    })
});

app.listen(PORT, ()=>{
    console.log('Server is running on port 4000');
})