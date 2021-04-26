var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'xutao9478abc',       
  port: '3306',                   
  database: 'cloudhealth' 
}); 
 
connection.connect();
 
var  sql = 'SELECT * FROM tb_emp where id=2 and name=1';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log(result); 
});
 
connection.end();