import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the QrReaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qr-reader',
  templateUrl: 'qr-reader.html',
})
export class QrReaderPage {

	scanData : {};
	encodeData : string;
	encodedData : {} ;
	options :BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {

  }

  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        this.scanData = barcodeData;
    }, (err) => {
        console.log("Error occured : " + err);
    });
	}

	encodeText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

        console.log(encodedData);
        this.encodedData = encodedData;

    }, (err) => {
        console.log("Error occured : " + err);
    });                 
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad QrReaderPage');
  }

}
