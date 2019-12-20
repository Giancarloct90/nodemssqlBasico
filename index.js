const express = require('express');
const app = express();
const sqlserver = require('mssql');
const morgan = require('morgan');

// DB Connect
require('./database');

// Setting
app.set('port', 5000);
app.use(morgan('short'));

// Routes
app.get('/', async (req, res) => {
    let name = 'JACK'
    sqlserver.query(`SELECT * FROM Users WHERE user_Nombre =` + `'${name}'` + ``).then((users) => {
        if (users.rowsAffected[0] == 0) {
            res.json({
                ok: false,
                message: 'El usuario no existe'
            })
            return;
        }
        res.json({
            ok: true,
            users: users.recordset[0]
        });
        console.log(users.recordset);
    }).catch(e => console.log('No existe el usuario'));
    // let name = 'JACK'
    // try {
    //     let users = await sqlserver.query(`SELECT * FROM Users WHERE user_Nombre =` + `'${name}'` + ``);
    //     if (users.rowsAffected[0] == 0) {
    //         res.status(400).json({
    //             ok: false,
    //             message: 'No hay users'
    //         });
    //     }
    //     if (users.rowsAffected[0] == 1) {
    //         res.status(200).json({
    //             ok: true,
    //             users: users.recordset
    //         });
    //     }
    // } catch (e) {
    //     res.json({
    //         ok: false,
    //         message: 'Error en query'
    //     });
    // }
});



// Starting SERVER
(async () => {
    try {
        await app.listen(app.get('port'));
        console.log(`Server on at port: ${app.get('port')}`)
    } catch (error) {
        console.log(`Hubo un error al conectar el server ${error}`);
    }
})();