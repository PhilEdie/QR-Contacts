import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './QRScreen.css';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { useState } from 'react';
import { uid } from '../Authentication';

const QRScreen: React.FC = () => {

  const [toEncode, setToEncode] = useState(uid);

  const createCode = () => {
    BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, toEncode)
      .then(data => {
        alert(data);
      }, error => {
        console.log("Error : " + error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My QR Code</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={() => createCode()}>View</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default QRScreen;
