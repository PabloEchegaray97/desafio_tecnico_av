# Gestion de planes de carrera - empleados
<table>
  <tr>
    <td align="center">
      <img src="https://static-00.iconduck.com/assets.00/nestjs-icon-512x510-9nvpcyc3.png" alt="Logo de Nest.js" width="200" height="200" />
      <br />
      Nest.js
    </td>
    <td align="center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="Logo de React" width="200" height="200" />
      <br />
      React
    </td>
    <td align="center">
      <img src="https://w7.pngwing.com/pngs/915/519/png-transparent-typescript-hd-logo-thumbnail.png" alt="Logo de TypeScript" width="200" height="200" />
      <br />
      TypeScript
    </td>
    <td align="center">
      <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png" alt="Logo de MongoDB" width="200" height="200" />
      <br />
      MongoDB
    </td>
  </tr>
</table>


Este proyecto consiste en una aplicación web para gestionar los planes de carrera de los colaboradores de una empresa. Utiliza React para el frontend, Nest.js para el backend, MongoDB como base de datos y TypeScript en todo el proyecto.

## Requisitos Básicos

### Backend (Nest.js)

- Configuración de una API RESTful para gestionar los colaboradores y sus habilidades.
- Uso de MongoDB para almacenar los datos.
- Implementación de operaciones CRUD para colaboradores y habilidades.

### Frontend (React)

- Creación de una interfaz de usuario para interactuar con la API del backend.
- Implementación de las siguientes funcionalidades:
  - Listar todos los colaboradores y sus habilidades.
  - Agregar un nuevo colaborador y asignarle habilidades.
  - Editar la información de un colaborador existente.
  - Eliminar un colaborador y sus habilidades asociadas.

## Tipado Seguro

- Utilización de TypeScript en todo el proyecto para asegurar la integridad de los tipos de datos.

## Funcionalidades Adicionales

### Estadísticas y Reporte

- Mostrar estadísticas sobre las habilidades más solicitadas o el progreso de los colaboradores en sus planes de carrera.
- Generar reporte en formato PDF o Excel sobre el estado de los planes de carrera.

## Comandos para el Backend

1. **Instalación de dependencias:**
```bash
cd backend
npm install
```

3. **Configuración del entorno:**
- Crear un archivo `.env` en el directorio `backend` y configurar las variables de entorno necesarias, como la conexión a la base de datos MongoDB.

3. **Ejecución del servidor:**
npm run start:dev


Este comando ejecutará el servidor en modo de desarrollo.

## Comandos para el Frontend

1. **Instalación de dependencias:**
```bash
cd frontend
npm install
```

3. **Ejecución del servidor de desarrollo:**
```bash
npm run dev
```

Este comando iniciará el servidor de desarrollo para el frontend y abrirá automáticamente la aplicación en el navegador predeterminado.




