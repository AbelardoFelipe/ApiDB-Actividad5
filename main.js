const { app, BrowserWindow, ipcMain, Notification} = require ('electron')
const path = require('path')
const mysql = require('mysql2')

/**
 * CREACION DE LA VENTANA
 */
let ventana
function createWindow(){
    ventana = new BrowserWindow({
        width: 800,
        height: 850,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    ventana.loadFile('renderer.html')
}

/**
 * CONEXION CON MYSQL
 */
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'AbelardoFelipe',
    password: '21000790',
    database: 'api_db'
})

/**
 * GUARDAR DATOS EN LA BASE DE DATOS
 */
ipcMain.on('guardar', (event, args) => {
    conexion.promise().execute('INSERT INTO datos_api(FECHA, IMAGEN, NOMBRE, EXPERIENCIA, ID_POKEMON, ATAQUE, DEFENSA) VALUES(?,?,?,?,?,?,?)', args)
    new Notification({
        title: 'Electron MySql',
        body: 'New Product Saved Successfully'
    }).show()
})

/**
 * CONSULTAR DATOS DE LA BASE DE DATOS
 */


/**
 * CONSULTAR DATOS GUARDADOS EN LA BASE DE DATOS (HISTORIAL)
 */
// 'SELECT ID_POKEMON, NOMBRE FROM datos_api'
ipcMain.on('consulta', (event, args) => {
    conexion.promise().query('SELECT FECHA, ID_POKEMON, NOMBRE FROM datos_api')
        .then(
            ([result, field]) => {
                ventana.webContents.send('historial', result)
            }
        )
})

ipcMain.on('consulta2', (event2, args2) => {
    conexion.promise().query('SELECT * FROM datos_api')
        .then(
            ([result2, field2]) => {
                ventana.webContents.send('historial2', result2)
            }
        )
})



app.whenReady().then(createWindow)











/*
conexion.query(
    'SELECT * FROM datos_api',
    (err, result, fields) => {
        if(err){
            console.log(err)
        }
        console.log(result)
    }
)
*/

/*
conexion.promise().query('SELECT * FROM datos_api')
    .then(
        ([result, field]) => {
            console.log(result)
        }
    )
*/