import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { Http, Headers, RequestOptions } from "@angular/http";
/**
 * Generated class for the WebPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-web",
  templateUrl: "web.html"
})
export class WebPage {
  imgData: any;
  srcImage: any;
  textContent: any;
  dataContent: any;
  items: any = [];
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public loading: LoadingController
  ) {
    this.imgData = this.navParams.get("imageData");
  }

  request() {
    this.srcImage = `data:image/jpeg;base64,` + this.imgData;
    let loading = this.loading.create({
      content: "Please wait while we fetch the data"
    });
    loading.present();
    let apikey = "<YourKey>",
      url: any =
        "https://vision.googleapis.com/v1/images:annotate?key=" + apikey,
      body = {
        requests: [
          {
            image: {
              content: this.imgData
            },
            features: [
              {
                type: "WEB_DETECTION",
                maxResults: 10
              }
            ]
          }
        ]
      };

    this.http.post(url, body).subscribe(data => {
      console.log(JSON.parse(data["_body"]));
      let a = JSON.parse(data["_body"]);

      this.dataContent = data["_body"];
      this.items = a["responses"][0]["webDetection"]["pagesWithMatchingImages"];
      loading.dismiss();
    });
  }

  ionViewDidLoad() {
    this.request();
  }
}
