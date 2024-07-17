# AlmuerzosGratis

Proyecto hecho en Angular como prueba tecnica para Alegra

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Getting started

Este proyecto necesita que tengas instalado Node.js para el desarrollo y ejecucion puedes descargarlo aqui: [Download & install Node.js](https://nodejs.org/en/download/package-manager)

Luego de instalar Node.js debes instalar las dependecias del proyeto, para esto correo el comando

`npm install`

## App Configuration

Debes generar los archivos environment y agregar las siguientes propiedades dentro para configurar los
servicios a consumir

```
environment = {
    ALMUERZOS_API_URL: "https://almuerzos-htkb55fnyq-uc.a.run.app/api",
    BODEGA_API_URL: "https://bodega-htkb55fnyq-uc.a.run.app/api",
    FIREBASE_CONFIG: {
    },
    FCMvapidKey: "secret"
};
```

para esto debes ejecutar el comando

`ng generate environments`

### Firebase

Este proyecto utiliza Firebase Cloud Messaging para actualizar algunos mensajes y mostrar notificaciones al usuario, debes agreagar
la configuracion en el archivo [environment.ts](src%2Fenvironments%2Fenvironment.ts) y [firebase-messaging-sw.js](public%2Ffirebase-messaging-sw.js) para que la libreria
lo lea y configure la cuenta, puedes usar los siguientes links como apoyo

[Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)

[Firebase console](https://firebase.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=latam-LATAM-all-es-dr-SKWS-all-all-trial-b-dr-1707800-LUAC0020239&utm_content=text-ad-none-any-DEV_c-CRE_654758081663-ADGP_Hybrid%20%7C%20SKWS%20-%20BRO%20%7C%20Txt_Compute-Firebase-KWID_43700076085058368-kwd-308670941208&utm_term=KW_firebase-ST_Firebase&gad_source=1&gclid=CjwKCAjwtNi0BhA1EiwAWZaANEWnGCFDLED8sj3cIu_k72sW3__Y0GLR4hucFXWsYXjVXQEFljK_QBoC7RMQAvD_BwE&gclsrc=aw.ds)
[Locale Firebase Server key - vapiKey](https://docs.appmachine.com/app-details/firebase/locate-firebase-server-key)

## API Dependencies

Debes descargar los siguientes repos para usarlos como API's, en caso de no tener acceso, solicitalos a anxrosales@gmail.com

[bodega-be](https://github.com/tonioros/bodega-be)

[almuerzos-be](https://github.com/tonioros/almuerzos-be)


## Development server

Ejecuta `ng serve`o `npm start` para iniciar el servidor de desarrollo. Abre el navegador con la URL `http://localhost:4200/` para visualizar la aplicacion web

## Build

Ejecuta `ng build` para compilar el proyecto, esto generara los archivos para el servidor en la carpeta `dist/`

## Docker Build

Este proyecto esta contenido dentro de un container docker, para crear el container debes ejecutar el siguiente comando

`docker build -t tonioros/almuerzos-fe:latest -f Dockerfile .`

Para iniciar el container debes ejecutar el siguiente comando:

`docker run --name almuerzos-fe -p 8080:80 tonioros/almuerzos-fe:latest`

## Code scaffolding

Ejecuta `ng generate component component-name` para generar un nuevo componente. Tambien puede usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

