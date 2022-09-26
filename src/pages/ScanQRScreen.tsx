import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ContactName, Contacts } from "@ionic-native/contacts";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { createContactFromScan, fetchDataForUser, get, getFromUid } from "../DataAccessModel";


const ScanQRScreen = () => {

    const [scannedData, setScannedData] = useState<string>();

    const getUidFromQRCode = async () => {
        await BarcodeScanner.scan().then((res) => {
            createContactFromScan(res.text);
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Scan QR Code</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My QR Code</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Tab 1 page" />
                <IonButton onClick={getUidFromQRCode}>Scan QR Code</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default ScanQRScreen;