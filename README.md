# Proyecto - Sistema de Registro de Clientes con Validación de Token y microservicios con Node Js


## Tecnologías

Backend: Node.js + Express
Base de datos: MySQL
Cache: Redis
Mensajería: RabbitMQ
Frontend: Angular
Otros: Bootstrap 5



## Cómo correr el proyecto

Requisitos previos que se debe de tener antes de correr el proyecto:

Node.js
MySQL
Redis
RabbitMQ


Luego de cumplir con los requisitos anteriores, necesita saber que este proyecto usa variables de entorno,
el cual se ubica en el lado de src/Environments/environments.ts, debera de modificar las rutas http
que se encuentran en aquellas variables en base a las rutas de los microservicios que se encuentra 
explicado en el README.MD de aquel proyecto y que usted halla empleado:

Microservicios:

Seguridad - http://localhost:3002
Clientes - http://localhost:3001
Correos - http://localhost:3003


Endpoints de las variables de entorno:

http://localhost:3002/api/token/generar',
http://localhost:3002/api/token/guardar',
http://localhost:3001/api/clientes',
http://localhost:3002/api/token/validar/',



Cómo ejecutar:

Primero necesita correr todos los microservicios en el lado del backend (El cual se explica en el proyecto correspondiente), luego de realizar lo anterior debe de correr este proyecto con los siguientes comandos:

npm install
ng serve






