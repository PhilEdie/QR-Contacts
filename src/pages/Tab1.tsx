import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { useState } from 'react';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';

const Tab1: React.FC = () => {

  const [scannedData, setScannedData] = useState<string>();
  const [toEncode, setToEncode] = useState("Hello");



  const openScanner = async () => {
    const _data = await BarcodeScanner.scan();
    alert(JSON.stringify(scannedData));
    setScannedData(_data.text);
  };

  const createContact = async () => {
    await AndroidPermissions.requestPermissions([AndroidPermissions.PERMISSION.WRITE_CONTACTS, AndroidPermissions.PERMISSION.READ_CONTACTS]);

    var contacts = new Contacts();
    var contact = contacts.create();
    contact.displayName = "Plumber";
    contact.nickname = "Plumber";            // specify both to support all devices

    // populate some fields
    var name = new ContactName();
    name.givenName = "Jane";
    name.familyName = "Doe";
    contact.name = name;

    // save to device
    contact.save()
      .then(() => console.log('Contact saved!', contact))
      .catch((error: any) => console.error('Error saving contact.', error));
  }

  const createCode = () => {
    BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, toEncode)
      .then(data => {
        console.log(data);
      }, error => {
        console.log("Error : " + error);
      });
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <IonButton onClick={openScanner}>Scan barcode</IonButton>
        <IonButton color="primary" expand="block" onClick={createCode}>
          Generate QR
        </IonButton>
        <IonButton onClick={createContact}>Create Contact</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
