import { Component } from "@angular/core";
import {
  NavController,
  ActionSheetController,
  LoadingController
} from "ionic-angular";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { DetailsPage } from "../details/details";
import { WebPage } from "../web/web";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  srcImage: string;
  textContent: any;
  base64Image: any;
  med_name: any;
  Comp: any;
  medicine_usage: any;
  side_effects: any;
  dosage: any;
  alcohol: any;
  pregnancy: any;
  items = new Array();
  mode: any;
  overlayHidden: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loading: LoadingController,
    public http: Http,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController
  ) {}
  public hideOverlay() {
    this.overlayHidden = true;
  }
  public presentActionSheet(mode) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.select(this.camera.PictureSourceType.PHOTOLIBRARY, mode);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.select(this.camera.PictureSourceType.CAMERA, mode);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }
  select(sourceType: number, mode) {
    // this.srcImage='';
    // this.textContent ='';
    // this.med_name ="";
    // this.Comp ="";
    // this.medicine_usage ="";
    // this.alcohol ="";
    // this.pregnancy ="";
    // this.dosage ="";
    // this.side_effects ="";
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      allowEdit: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // this.mode = mode;

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        // this.srcImage = `data:image/jpeg;base64,${imageData}`;
        // alert(mode);
        this.base64Image = imageData;
        if (mode == "text") {
          this.navCtrl.push(DetailsPage, { imageData });
        } else if (mode == "search") {
          this.navCtrl.push(WebPage, { imageData });
        }
        // this.navCtrl.push(WebPage,{imageData});
        // this.request(this.base64Image);
      },
      err => {
        // Handle error
        alert(err);
      }
    );
  }

  ionViewDidLoad() {
    // this.request();
  }
}
