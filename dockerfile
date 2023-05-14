# Establecer la imagen base
FROM node:14-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación de React
EXPOSE 19006

# Iniciar la aplicación de Expo
CMD [ "npm", "start" ]