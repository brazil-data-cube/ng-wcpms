# ng-wcpms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## Quick start

Add the `NgWcpmsModule` into the main app module of your project
```typescript
import { NgWcpmsModule } from 'src/assets/ng-wcpms'

@NgModule({
    imports: [CommonModule, NgWcpmsModule],
    ...
})
export class AppModule { }
```
Then use the `<lib-ng-wcpms>` component to display the component
```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'ng-wcpms-example',
    template: '
    <lib-ng-wcpms
        collection = "S2-16D-2"
        band = "NDVI"
        freq = "16D"
        latitude = "-29.20"
        longitude = "-55.95"
        access_token = "YOUR_ACCESS_TOKEN"
        start_date = "2021-01-01"
        end_date = "2021-12-31"
	></lib-ng-wcpms>',
})
export class NgWcpmsExampleComponent {
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
