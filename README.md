# Instrucciones para levantar el proyecto

## 1 - Configurar las variables de entorno

Copia las variables de entorno de ejemplo y realiza los cambios necesarios en la configuración:
### cp ./src/config/env.dist.ts ./src/config/env.ts

## 2 - Instalar dependencias

Asegúrate de tener Node.js y npm instalados en tu máquina. Luego, ejecuta el siguiente comando para instalar las dependencias necesarias:
### npm install

## 3 - Levantar el servidor de desarrollo

Para iniciar la aplicación en modo desarrollo, utiliza el siguiente comando:
### npm run dev
El servidor estará disponible en http://localhost:3000 por defecto.

# Ejecución de tests

## 1 - Ejecución de todos los tests

Para ejecutar todos los tests definidos en el proyecto, utiliza:
### npm test

## 2- Ejecución de un test específico

Si deseas ejecutar un test específico, puedes usar el siguiente comando, reemplazando test-file-name con el nombre del archivo del test que deseas ejecutar:
### npx jest test-file-name

Por ejemplo:
### npx jest src/__tests__/components/WeatherOfCity.tsx
