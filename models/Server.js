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
import editarRoute from '../routes/editar.routes.js';
import nuevaTrasferenciaRoute from '../routes/nuevaTrasferencia.routes.js';
import mostrarTrasferenciaRoute from '../routes/consultarTrasferencias.routes.js';



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
            rootEditar:'/usuario',
            rootEliminar:'/usuario',
            rootNuevaTrasferencia:'/transferencia',
            rootConsultarTrasferencia:'/transferencias',
        }

        // Iniciamos nuestros metodos iniciales
        this.middlewares();
        this.routes()
    }


    middlewares(){

        this.app.use( express.json() );
        
        this.app.use( express.static('public') );
          
    }


    routes(){
        // Routing al Home
        this.app.use( this.frontEndPaths.rootHome , vistaHomeRoute );
        this.app.use( this.frontEndPaths.rootAgregar , agregarRoute );
        this.app.use( this.frontEndPaths.rootConsultar , consultarRoute );
        this.app.use( this.frontEndPaths.rootEditar , editarRoute );
        this.app.use( this.frontEndPaths.rootEliminar , eliminarRoute );
        this.app.use( this.frontEndPaths.rootNuevaTrasferencia , nuevaTrasferenciaRoute );
        this.app.use( this.frontEndPaths.rootConsultarTrasferencia , mostrarTrasferenciaRoute );
        
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