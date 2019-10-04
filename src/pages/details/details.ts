import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Http, Headers, RequestOptions } from "@angular/http";
import { ListdetailsPage } from "../listdetails/listdetails";
/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-details",
  templateUrl: "details.html"
})
export class DetailsPage {
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

    // alert("Inside request");
    let apikey = "<YourKEY>",
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
                type: "TEXT_DETECTION"
              }
            ]
          }
        ]
      };

    this.http.post(url, body).subscribe(data => {
      // this.textContent = data['_body'];
      console.log(JSON.parse(data["_body"]));
      let a = JSON.parse(data["_body"]);
      // this.dataContent = a['responses'][0];
      // console.log(a['responses'][0]['fullTextAnnotation']['text']);
      // for(let i=0;i< (a['responses'][0]['textAnnotations']).length;i++){
      //  this.items.push(a['responses'][0]['textAnnotations'][i]['description']);
      // }
      // console.log(this.items);
      this.textContent = a["responses"][0]["textAnnotations"][1]["description"]
        .replace(/\s+/g, " ")
        .replace(/[.,\s]/g, " ");
      // this.textContent = "";
      // .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, ' ')
      if (this.textContent != "") {
        let url: any = "http://<YourServer>/medcam.php",
          body: any = "&name=" + this.textContent,
          type: string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers: any = new Headers({ "Content-Type": type }),
          options: any = new RequestOptions({ headers: headers });

        this.http.post(url, body, options).subscribe(textData => {
          console.log(JSON.parse(textData["_body"]));

          this.items = JSON.parse(textData["_body"]);

          // this.med_name = b[0]['name'];
          // this.Comp = b[0]['composition'];
          // this.dosage = b[0]['dosage'];
          // this.alcohol = b[0]['alcohol_interaction'];
          // this.medicine_usage = b[0]['medicine_usage'];
          // this.side_effects = b[0]['side_effects'];
          // this.pregnancy = b[0]['pregnancy_interaction'];
        });
        loading.dismiss();
      } else {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          message:
            "Failed to grab the text from the image.Please try again and make sure the text is clear.",
          enableBackdropDismiss: true
        });
        alert.present();
      }
      // console.log(a['responses'][0]['textAnnotations'][1]['description']);
      // alert(data);
    });
  }

  reset() {
    this.srcImage = "";
    this.textContent = "";
    // this.med_name ="";
    // this.Comp ="";
    // this.medicine_usage ="";
    // this.alcohol ="";
    // this.pregnancy ="";
    // this.dosage ="";
    // this.side_effects ="";
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    this.request();
  }

  nextPage(param) {
    let img = this.imgData;
    // alert(param);
    this.navCtrl.push(ListdetailsPage, { param, img });
  }
}
