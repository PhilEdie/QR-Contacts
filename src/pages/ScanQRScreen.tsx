import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ContactName, Contacts } from "@ionic-native/contacts";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { fetchDataForUser } from "../DataAccessModel";


const ScanQRScreen = () => {

    const [scannedData, setScannedData] = useState<string>();

    const openScanner = async () => {
        await BarcodeScanner.scan().then((uid) => {

        });
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
        // contact.save()
        //     .then(() => alert('Contact saved!'))
        //     .catch((error: any) => console.error('Error saving contact.', error));
    }

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
                <IonButton onClick={openScanner}>Scan QR Code</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default ScanQRScreen;