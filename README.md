# Proyecto de práctica para consultar el clima de diferentes ciudades

## Pasos para poder ejecutar la app localmente

## 1: Configurar API Key de OpenWeather
El proyecto hace uso del API de OpenWeather por lo cual es necesario generar una API Key en su sitio https://openweathermap.org/ .  
Esta api key se debe configurar en un archivo __*.env*__ en la raíz del proyecto con el siguiente campo

```bash
API_OPEN_WEATHER=<API KEY>
```
remplazando el valor de \<API KEY>

## 2: Iniciar el servido Metro con npm
```bash
npm start
```

## 3: Iniciar la aplicación en el sistema operativo deseado

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```
