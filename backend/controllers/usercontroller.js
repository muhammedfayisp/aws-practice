const db = require("../config/db")

const getUsers = (req,res) =>{
    const query = "SELECT * FROM Users"

    db.query(query,(err,result) =>{
        if (err) res.status(500).send(err);
        res.json(result);
    })
}

const createUsers = (req,res) => {
    const {name,email} = req.body;
     const query = "INSERT INTO users (name, email) VALUES (?, ?)"

     db.query(query,[name,email],(err,result)=>{
        if (err) res.status(500).json({
            message:"error",
            error:err
        })

        res.status(201).json({
            message:"Created succesfully",
            userid:result.insertId
        })
     })
}

module.exports = {
    getUsers,
    createUsers
}