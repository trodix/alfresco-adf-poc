import { ContentModule } from '@alfresco/adf-content-services';
import { CoreAutomationService, CoreModule, TranslateLoaderService, TRANSLATION_PROVIDER } from '@alfresco/adf-core';
import { ProcessModule } from '@alfresco/adf-process-services';
// Localization
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppLayoutComponent } from './app-layout/app-layout.component';
// App components
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AppsComponent } from './pages/apps/apps.component';
import { DocumentlistComponent } from './pages/documentlist/documentlist.component';
import { BlobViewComponent } from './pages/file-view/blob-view.component';
import { FileViewComponent } from './pages/file-view/file-view.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PreviewService } from './services/preview.service';
import { SharedModule } from './shared/shared.module';
import { StartProcessComponent } from './pages/start-process/start-process.component';
// Custom stencils
import { StencilsModule } from './stencils.module';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { TasksComponent } from './pages/tasks/tasks.component';



// import localeDe from '@angular/common/locales/de';
// import localeIt from '@angular/common/locales/it';
// import localeEs from '@angular/common/locales/es';
// import localeJa from '@angular/common/locales/ja';
// import localeNl from '@angular/common/locales/nl';
// import localePt from '@angular/common/locales/pt';
// import localeNb from '@angular/common/locales/nb';
// import localeRu from '@angular/common/locales/ru';
// import localeCh from '@angular/common/locales/zh';
// import localeAr from '@angular/common/locales/ar';
// import localeCs from '@angular/common/locales/cs';
// import localePl from '@angular/common/locales/pl';
// import localeFi from '@angular/common/locales/fi';
// import localeDa from '@angular/common/locales/da';
// import localeSv from '@angular/common/locales/sv';

registerLocaleData(localeFr);
// registerLocaleData(localeDe);
// registerLocaleData(localeIt);
// registerLocaleData(localeEs);
// registerLocaleData(localeJa);
// registerLocaleData(localeNl);
// registerLocaleData(localePt);
// registerLocaleData(localeNb);
// registerLocaleData(localeRu);
// registerLocaleData(localeCh);
// registerLocaleData(localeAr);
// registerLocaleData(localeCs);
// registerLocaleData(localePl);
// registerLocaleData(localeFi);
// registerLocaleData(localeDa);
// registerLocaleData(localeSv);

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            appRoutes // ,
            // { enableTracing: true } // <-- debugging purposes only
        ),

        // ADF modules
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        }),
        StencilsModule,

        // Custom modules
        SharedModule
    ],
    exports: [
        CoreModule
    ],
    declarations: [
        AppComponent,
        AppsComponent,
        HomeComponent,
        LoginComponent,
        TasksComponent,
        TaskDetailsComponent,
        DocumentlistComponent,
        StartProcessComponent,
        AppLayoutComponent,
        FileViewComponent,
        BlobViewComponent
    ],
    providers: [
        PreviewService,
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'app',
                source: 'resources'
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(automationService: CoreAutomationService) {
        automationService.setup();
    }
}
