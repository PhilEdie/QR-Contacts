import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { useState } from 'react';

const Tab1: React.FC = () => {

  const [scannedData, setScannedData] = useState<string>();
  const [toEncode, setToEncode] = useState("Hello");

  const openScanner = async () => {
    const _data = await BarcodeScanner.scan();
    alert(JSON.stringify(scannedData));
    setScannedData(_data.text);
  };

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
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
