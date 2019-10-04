import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
/**
 * Generated class for the SavePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-save",
  templateUrl: "save.html"
})
export class SavePage {
  dataName: any;
  med_name: any;
  Comp: any;
  medicine_usage: any;
  major_side_effects: any;
  minor_side_effects: any;
  dosage: any;
  alcohol: any;
  pregnancy: any;
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    public navParams: NavParams
  ) {
    this.dataName = this.navParams.get("name");
    this.saveDetails();
  }

  saveDetails() {
    this.sqlite
      .create({
        name: "medDetails.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        db.executeSql("select * from med_details where name = ?", [
          this.dataName
        ])
          .then(data1 => {
            // alert(this.dataName);
            for (let i = 0; i < data1.rows.length; i++) {
              this.med_name = data1.rows.item(i).name;
              this.Comp = data1.rows.item(i).composition;
              this.medicine_usage = data1.rows.item(i).medicine_usage;
              this.major_side_effects = data1.rows.item(i).major_side_effects;
              this.minor_side_effects = data1.rows.item(i).minor_side_effects;
              this.dosage = data1.rows.item(i).dosage;
              this.alcohol = data1.rows.item(i).alcohol_interaction;
              this.pregnancy = data1.rows.item(i).pregnancy_interaction;
            }
            $(document).ready(function() {
              var minimized_elements = $(".value");
              var minimize_character_count = 200;
              minimized_elements.each(function() {
                var actual_length = $(this).text();
                if (actual_length.length < minimize_character_count) return;

                $(this).html(
                  actual_length.slice(0, minimize_character_count) +
                    '<span>... </span><a href="#" class="more">More</a>' +
                    '<span style="display:none;">' +
                    actual_length.slice(
                      minimize_character_count,
                      actual_length.length
                    ) +
                    ' <a href="#" class="less">Less</a></span>'
                );
              });

              $("a.more", minimized_elements).click(function(event) {
                event.preventDefault();
                $(this)
                  .hide()
                  .prev()
                  .hide();
                $(this)
                  .next()
                  .show();
              });
              $("a.less", minimized_elements).click(function(event) {
                event.preventDefault();
                $(this)
                  .parent()
                  .hide()
                  .prev()
                  .show();
              });
            });
          })
          .catch(err => alert(err));
      })
      .catch(err => alert(err));
  }
  ionViewDidLoad() {}
}
