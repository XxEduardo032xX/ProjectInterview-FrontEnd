//*Variables de entorno para desarrollo:


export const environments = {
    //*Tokens de seguridad - Microservicio de seguridad:
    getTokenSecurity: 'http://localhost:3002/api/token/generar',
    saveToken: 'http://localhost:3002/api/token/guardar',

    //*Registrar cliente - Microservicio de cliente:
    registerClient: 'http://localhost:3001/api/clientes',

    //*Validacion del token - Microservicio de seguridad:  
    validateToken: 'http://localhost:3002/api/token/validar/',
}

