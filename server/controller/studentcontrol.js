const mysql =require("mysql2");
const { connect } = require("../router/student");

const con=mysql.createPool({
    connectionLimit:10, 
    host :process.env.DB_HOST,
    user :process.env.DB_USER,
    password :process.env.DB_PASS,
    database :process.env.DB_NAME
});

exports.view =(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                console.log("Good")
                res.render("home",{rows})

            }
            else{
                console.log("error"+err)
            }
        })
    });

};
exports.adduser=(req,res)=>{
    res.render("adduser");
}
exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,adminno,year,course} = req.body;

        connection.query("insert into users (NAME,ADMINNO,ADMINYEAR,COURSE) values(?,?,?,?)",[name,adminno,year,course],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:'user details added success'});
            }
            else{
                console.log("error in listen data"+err)
            }
        })
    });
    res.render("adduser");
}
exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;

        connection.query("select * from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("edituser",{rows})

            }
            else{
                console.log("error"+err)
            }
        })
    });

}
exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,adminno,year,course} = req.body;
        let id=req.params.id;
 

        connection.query("update users set NAME=?,ADMINNO=?,ADMINYEAR=?,COURSE=?, where ID=?",[name,adminno,year,course,id],(err,rows)=>{
            connection.release();
            if(!err){
    
                res.render("edituser",{msg:"user details added success"});
            }
            else{
                console.log("error in listen data"+err)
            }
        })
    });
    res.render("adduser");
}

exports.delete =(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
        
        let id = req.params.id;
        connection.query("delete from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/")
            }
            else{
                console.log(err);
            }
        })
    });
}