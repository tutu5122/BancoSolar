// Importamos express
import express from 'express';
// Importamos nuestro moto de plantilla
import { create } from 'express-handlebars';

// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";

// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

// IMPORTAMOS NUESTRAS RUTAS
import vistaHomeRoute from '../routes/vistaHome.routes.js';
import agregarRoute from '../routes/agregar.routes.js';
import consultarRoute from '../routes/consultarUsuario.routes.js';
import eliminarRoute from '../routes/eliminar.routes.js';


// Creamos nuestro modelo o clase de servidor
class Server {

    // Vamos a crear nuestro constructor para que ejecute 
    // Middleware
    // Rutas o Routes
    constructor(){
        
        // Cramos la app  de express
        this.app = express();
        this.port = process.env.PUERTO || 8000;

        this.frontEndPaths = {
            rootHome:'/',
            rootAgregar:'/usuario',
            rootConsultar:'/usuarios',
            rootModificar:'/modificar',
            rootEliminar:'/usuario'
        }

        // Iniciamos nuestros metodos iniciales
        this.middlewares();
        this.routes()
    }


    middlewares(){

        this.app.use( express.json() );
        
        this.app.use( express.static('public') );
        // this.app.use('/css', express.static(`${__dirname}/../public/assets/css`));
        // this.app.use('/img', express.static( `${__dirname}/../public/assets/img`));
        // this.app.use('/js', express.static( `${__dirname}/../public/assets/js`));
        // this.app.use('/jquery', express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
          
    }


    routes(){
        // Routing al Home
        this.app.use( this.frontEndPaths.rootHome , vistaHomeRoute );
        this.app.use( this.frontEndPaths.rootAgregar , agregarRoute );
        this.app.use( this.frontEndPaths.rootConsultar , consultarRoute );
        this.app.use( this.frontEndPaths.rootEliminar , eliminarRoute );
  
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    }

    initHandelbars(){

        this.hbs = create({
            partialsDir:["views"],
            defaultLayout: false
        })

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
        
    }




}

export default Server;