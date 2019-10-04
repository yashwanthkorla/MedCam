import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { SavePage } from "../save/save";
/**
 * Generated class for the ViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-view",
  templateUrl: "view.html"
})
export class ViewPage {
  items = [];
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private sqlite: SQLite,
    public navParams: NavParams
  ) {}

  view() {
    this.sqlite
      .create({
        name: "medDetails.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        db.executeSql("select name from med_details", {})
          .then(data => {
            this.items = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.items.push({ name: data.rows.item(i).name });
              }
              this.message("Data retrival is successful");
            } else {
              this.message("0 Results");
            }
          })
          .catch(err =>
            alert("Save atleat one data to create database on your mobile")
          );
      });
  }

  saveDetails(name) {
    this.navCtrl.push(SavePage, { name });
  }
  delete(item) {
    this.sqlite
      .create({
        name: "medDetails.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        db.executeSql("delete from med_details where name = ?", [
          item.name
        ]).then(data => {
          let index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1);
          }
          this.message("Data has been removed.Please refresh the page");
        });
      });
  }
  message(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }
  ionViewDidLoad() {
    this.view();
  }
}
