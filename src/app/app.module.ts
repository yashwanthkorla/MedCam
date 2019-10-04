import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule } from "@angular/http";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { Camera } from "@ionic-native/camera";
import { DetailsPage } from "../pages/details/details";
import { ListdetailsPage } from "../pages/listdetails/listdetails";
import * as $ from "jquery";
import { WebPage } from "../pages/web/web";
@NgModule({
  declarations: [MyApp, HomePage, DetailsPage, ListdetailsPage, WebPage],
  imports: [BrowserModule, HttpModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, DetailsPage, ListdetailsPage, WebPage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
