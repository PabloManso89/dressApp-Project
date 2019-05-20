# dressApp-Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0
and it makes use of Angular 6 framework, Firebase 6 as DDBB and @angular/fire as module that helps to connect each other.

This readme assumes you have the following tools available on your system: EcmaScript6, Node and Yarn.

Easiest way to install Node is through Homebrew:

    node --version
    brew install node@6

Npm latest version:
    
    npm --version
    npm list -g -depth=0
    npm i -g npm
    
Yarn. Follow [these instructions](https://yarnpkg.com/en/docs/install).

    yarn --version
    brew install yarn

## Clean everything

    yarn clean
    
    or 
    
    rm -rf node_modules
    
    
## Install the node modules

    yarn install

## Development server

Run `yarn start` for a dev server and navigate to `http://localhost:4200/` or simply `yarn start --open`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Build - production (only for locally demo)
Run `ng build --prod --base-href ./` to build a production version. Need some changes as well:
* On `app-routing.module.ts` add `{useHas: true}` after `{enableTracing:true}`
* In the `index.html` file
  Removed base Href="/" tag from html and added it like this.
  `<script>document.write('<base href="' + document.location + '" />');</script>`

### Deploy in ....

-------


## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Other documentation

-`Reactive programming` by using [RxJS](http://reactivex.io/)

-[Image Carousel on detail](https://github.com/lukasz-galka/ngx-gallery)

-`Spinner` made by using [ngx-spinner](https://www.npmjs.com/package/ngx-spinner)

-`i18n` : Its created by using Angular6 module i18n and through this command: 
`ng xi18n --outputPath src/client/i18n --outFile texts.es.xlf ng xi18n --locale es`
This way we are saying:
* Create a i18n file for translation
* in the path we specify
* and name the file with this name
* and its going to be used for this location (es in the example)

To add a new literal with translation, we have to add the html attribute i18n `<h1 i18n>Hello i18n!</h1>`
We should add an Id for persistence and descriptions. Check [i18n Angular](https://angular.io/guide/i18n)

* then run the command: `npm run translate` (ng xi18n --outputPath src/client/i18n --outFile texts.xlf)
* then copy the missing nodes for the files of each language (eg: texts.es.xlf) and paste them in the right order
* then set a tag `<target>` under the tag `sources` with the translation > `<target>Je ne montre aucun élément</target>`

Now you can either use aot mode of the angular compiler to set the translation in compiling (there are commands for several languages) time or in running time using JIT. 
For this app we are going to use JIT as we want to change the translations dynamically. So just run the app normally by using `npm start`.

In order to be able to change the language when the app is running, we are going to store the used language in localStorage,
when selecting other language, we save that language in the localStorage, refresh the application and when loading check the 
localStorage to fetch the chosen language and load its corresponding translation file

-`DDBB` :
The used DDBB is Firebase, a nonSQL document-oriented database, located in [Firebase DDBB](https://console.firebase.google.com/project/dressapp-fa71f/database/firestore/data~2Fusers~2) .

You can learn how to build it by following this tutorial https://angular-templates.io/tutorials/about/angular-crud-with-firebase

1. Add to the dependencies of your package.json

    ```
    "npm install --save @angular/fire": "5.0.0",
    "npm install --save firebase": "5.1.0",
    ```
  
    And do `npm install`.
    
2. Set up a simple DDBB: Log in with a Google account, go to Firebase app and create a new Project. We have create the collection Users, with all the users of the application. Each user document has the following structure: 

    ```
    pablo.manso@gmail.com: 
    
      age: 29
      gender: true
      name: 'Pablo'
      email: 'pab.manso@gmail.com'
    ```

    The id of the document is unique, as the name of the document, in this case `pab.manso@gmail.com`

3. The configuration to connect to the DDBB is in `environment.ts`, and it can be taken from the Firebase app once the project has been created.

4. Set up the modules for Firebase: 

    ```
    import { AngularFireModule } from '@angular/fire';
    import { AngularFirestoreModule } from '@angular/fire/firestore';
    import { environment } from '../environments/environment';
    ```
    
    ```
    imports: [
     	AngularFireModule.initializeApp(environment.firebase),
     	AngularFirestoreModule,
    	...
    [
    ```
    
    We also have a dedicated service to interact with the database, `users.service.ts`

