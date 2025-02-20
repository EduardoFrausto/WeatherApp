# Proyecto de práctica para consultar el clima de diferentes ciudades

## Pasos para poder ejecutar la app localmente

## 1: Configurar API Key de OpenWeather
El proyecto hace uso del API de OpenWeather por lo cual es necesario generar una API Key en su sitio https://openweathermap.org/ .  
Esta api key se debe configurar en un archivo __*.env*__ en la raíz del proyecto con el siguiente campo

```bash
API_OPEN_WEATHER=<API KEY>
```
remplazando el valor de \<API KEY>

## 2: Descargar dependecias
Es necesario descargar las dependencias de nodejs para ejecutar el proyecto con el siguiente comando
```bash
npm install
```
De igual manera descargará automáticamente los Pods para iOS una vez que se terminen de descargar las dependencias de nodejs, 
esto en caso de que se ejecute en MacOS  
De no ser así se pueden volver a descargar con el comando
```bash
npx pod-install
```
## 3: Iniciar el servido Metro con npm
```bash
npm start
```

## 4: Iniciar la aplicación en el sistema operativo deseado

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```
