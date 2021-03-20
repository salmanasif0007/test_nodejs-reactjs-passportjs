
var mysql = require('mysql');
const express = require('express')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser');
const initializePassport = require('./server.js')


app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

            // Inventory

app.get('/inventory', function (req, res) {
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "inventory"
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE inventory (Id int PRIMARY KEY NOT NULL AUTO_INCREMENT, Name VARCHAR(255), Price int NOT NULL,Quantity int NOT NULL,Amount int,ExpDate VARCHAR(255),MrpDate VARCHAR(255),Etc VARCHAR(255))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM inventory", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.send(result)
    });
});

    
})


app.post('/inventory',function async(req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "inventory"
    });
    const data = req.body
    console.log(data)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO inventory(Name, Price  ,Quantity  ,Amount ,ExpDate,MrpDate ,Etc) VALUES ?";
    var values = [
        [data.name,data.price,data.quantity,data.amount,data.expDate,data.mrpDate,data.etc]
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});


})


app.post('/delete',function async(req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "inventory"
    });
    const data = req.body
    console.log(data)
    // con.connect(function(err) {
    //     if (err) throw err;
    //     con.query("DELETE FROM inventory WHERE Id=", function (err, result, fields) {
    //         if (err) throw err;
    //         console.log('delete');
    //         // res.send(result)
    //     });
    // });
    con.connect(function(err) {
        if (err) throw err;
        var sql = "DELETE FROM inventory WHERE Id= VALUES ";
        var values = data.id;
        con.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });

})

                // Sales



app.get('/sales', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "inventory"
    });
    

    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     var sql = "CREATE TABLE sales (Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,PersonID int,FOREIGN KEY (PersonID) REFERENCES inventory(Id),Phone int NOT NULL, Name VARCHAR(255), Total int NOT NULL,CustomerId VARCHAR(255) NOT NULL)";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("Table created");
    //     });
    // });
    
    // con.connect(function(err) {
    //     if (err) throw err;
    //     var sql = "DROP TABLE sales";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("Table deleted");
    //     });
    // });
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM sales", function (err, result, fields) {
            if (err) throw err;
            // console.log(result);
            res.send(result)
        });
    });
    
        
    })
    
    
    app.post('/sales',function async(req, res) {

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "inventory"
        });
        const data = req.body
        console.log(data)
        // console.log(salesid)
    function sl(){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "inventory"
        });
        const data = req.body    
        con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        var sql = "INSERT INTO sales(PersonID,Phone , Name, Total,CustomerId) VALUES ?";
        var values = [
            [data.productId,data.phone,data.name,data.total,"#BD"+data.phone],
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log(result.insertId);
            
        // sa_read();
        cm(result.insertId);

        });
    })}
    
    function cm(x){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "inventory"
        });
        const data = req.body
        con.connect( function(err) {
            if (err) throw err;
            console.log("Connected!");
           
        
        var sql = "INSERT INTO coustomers (SalesID,Name ,Quantity ,Amount , Total) VALUES ?";
            var values = [
                [x,"asif",4,21,63],
            ];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        })
    }
    
        sl();
        // cm()
    
    })


                // Customer


app.get('/coustomers', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "inventory"
    });
    
    
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     var sql = "CREATE TABLE coustomers (Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,SalesID int,FOREIGN KEY (SalesID) REFERENCES sales(Id),Name VARCHAR(255),Quantity int NOT NULL,Amount int NOT NULL, Total int NOT NULL)";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("Table created");
    //     });
    // });
    
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM coustomers", function (err, result, fields) {
            if (err) throw err;
            // console.log(result);
            res.send(result)
        });
    });
    
        
    })
    
    
    app.post('/coustomers',function async(req, res) {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "inventory"
        });
        const data = req.body
        console.log(data)
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    
    
    var sql = "INSERT INTO coustomers (SalesID,Name ,Quantity ,Amount , Total) VALUES ?";
        var values = [
            [data.salesId,data.name,data.quantity,data.amount,data.total],
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
        
    
    })



                    // inventory_details


    app.post('/inventory_details',function async(req, res) {
        let dada;
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "inventory"
        });
        const data = req.body
        console.log(data.id)
       
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM inventory WHERE id = "+ mysql.escape(data.id), function (err, result) {
              if (err) throw err;
            //   dada = result;
                res.send(result)
            //   console.log(dada)
            });
        })
    })

                        // sales__details


app.post('/sales_details',function async(req, res) {
    
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "inventory"
    });  
    const data = req.body
    console.log(data)
    
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM inventory WHERE id = "+ mysql.escape(data.id), function (err, result) {
            if (err) throw err;
        //   dada = result;
            res.send(result)
        //   console.log(dada)
        });
        })
        
        
})
app.listen(8080)