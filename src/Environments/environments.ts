//*Variables de entorno para desarrollo:


export const environments = {
    //*Obtener token de seguridad:
    getTokenSecurity: ' http://localhost:3002/api/token',

    //*Registrar cliente:
    registerClient: 'http://localhost:3001/api/clientes',

    //*Validacion del token: 
    validateToken: 'http://localhost:3002/api/token/validar',
    /*
    *El cliente (frontend) no necesita llamar directamente a este endpoint, solo lo hace 
    *el microservicio de clientes internamente.
    */
}

