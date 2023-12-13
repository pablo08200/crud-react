//configuracion del backend conexion a la database
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"aguilas0807",
    database:"empleados_crud"
}); 

//creando peticiones 
//CREANDO UN EMPLEADO
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) values(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    } 
    );
}); //solicitud y respuesta

/**CREANDO MASCOTAS */

app.post('/createMascota',(req,res)=>{
    const nombreMascota = req.body.nombreMascota;
    const edadMascota = req.body.edadMascota;
    const id_empleado  = req.body.id_empleado ;

    db.query('INSERT INTO mascota(nombreMascota,edadMascota,id_empleado) values(?,?,?)',[nombreMascota,edadMascota,id_empleado],
    (error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    }
    
    );
})
//obteniendo empleados
app.get("/empleados",(req,res)=>{
   

    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    } 
    );
}); //solicitud y respuesta

/**OBTENER MASCOTAS */
app.get("/mascota",(req,res)=>{
    db.query('SELECT * FROM mascota',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    } 
    );
}); //solicitud y respuesta

/**ACTUALIZANDO EMPLEADOS */
app.put("/update",(req,res)=>{
    /**id para saber que elemento voy a cambiar */
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    } 
    );
}); //solicitud y respuesta

//ELIMINAR REGISTROS
app.delete("/delete/:id",(req,res)=>{
    /**id para saber que elemento voy a cambiar */
    const id = req.params.id; /**ira via url entonces se envia en parametro */
   
    db.query('DELETE FROM  empleados WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    } 
    );
}); //solicitud y respuesta

app.listen(3001,()=>{ 
    console.log("corriendo en el puerto 3001");
});

