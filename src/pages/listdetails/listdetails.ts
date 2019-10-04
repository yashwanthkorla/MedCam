import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http, Headers, RequestOptions } from "@angular/http";
// import * as $ from 'jquery';
/**
 * Generated class for the ListdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-listdetails",
  templateUrl: "listdetails.html"
})
export class ListdetailsPage {
  dataImg: any;
  dataName: any;
  srcImage: any;
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
    public navParams: NavParams,
    public http: Http
  ) {
    this.dataImg = this.navParams.get("img");
    this.dataName = this.navParams.get("param");
    this.srcImage = `data:image/jpeg;base64,` + this.dataImg;
  }

  detailsResult() {
    let url: any = "http://<YourServerIp>/listdetails.php",
      body: String = "&name=" + this.dataName,
      type: String = "application/x-www-form-urlencoded;charset=utf-8",
      headers: any = new Headers({ "Content-Type": type }),
      options: any = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).subscribe(data => {
      let b = JSON.parse(data["_body"]);
      // console.log(b);
      // if(b[0]['name'] != null){
      this.med_name = b[0]["name"] || "-";
      this.Comp = b[0]["composition"] || "-";
      this.dosage = b[0]["dosage"] || "-";
      this.alcohol = b[0]["alcohol_interaction"] || "-";
      this.medicine_usage = b[0]["medicine_usage"] || "-";
      this.major_side_effects = b[0]["major_side_effects"] || "-";
      this.minor_side_effects = b[0]["minor_side_effects"] || "-";
      this.pregnancy = b[0]["pregnancy_interaction"] || "-";
      //   }
      // else{
      //   console.log(b[0]);
      // }
      //Code for adding read more and read less

      // Starting of the read more and read less code.
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

      // End of read more and read less.
    });
  }
  ionViewDidLoad() {
    this.detailsResult();
  }
}
