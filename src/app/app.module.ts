import {NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { MaterialModule} from './utils/material.module'
import { AppComponent } from './app.component';
import { am4chartComponent } from './am4chart/am4chart.component';
import { GraphComponent } from './graph/graph.component';
import { DaoReaderComponent } from './daoreader/daoreader.component';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        am4chartComponent,
        GraphComponent,
        DaoReaderComponent
    ],
    bootstrap: [AppComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}