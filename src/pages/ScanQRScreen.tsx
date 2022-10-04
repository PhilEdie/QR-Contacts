import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { alertCircle, checkmarkCircle } from "ionicons/icons";
import { useState } from "react";
import { createContactFromScan } from "../DataAccessModel";
import ContactInfoIonList from "./ContactInfoIonList";


const ScanQRScreen = () => {

    const [state, setState] = useState("ready");
    const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocumentData>>();

    const getUidFromQRCode = async () => {
        setState("ready");
        await BarcodeScanner.scan(
            {
                prompt: "Place your contact's QR code in the scan area.",
                formats: "QR_CODE",
                disableAnimations: true,
                disableSuccessBeep: true
            }
        ).then((res) => {
            setState("loading");
            createContactFromScan(res.text).then((_docSnap) => {
                setDocSnap(_docSnap);
                setState("success");
            }).catch((error) => {
                console.error(error);
                setState("error");
                alert("An error occured.");
            });
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {(state === "ready" || state === "loading") && <IonTitle size="large">My QR Code</IonTitle>}
                    {(state === "success") && <IonTitle>Contact Added    <IonIcon icon={checkmarkCircle} /></IonTitle>}
                    {(state === "error") && <IonTitle>Invalid QR Code  <IonIcon icon={alertCircle} /></IonTitle>}
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonText>
                        Using your phone camera, scan another user's QR code. Their contact details
                        will be automatically saved to your phone contacts list.
                    </IonText>
                </IonItem>

                {state === "ready" && <IonButton onClick={getUidFromQRCode} expand="block">Scan QR Code</IonButton>}
                {state === "loading" && <IonProgressBar type="indeterminate"></IonProgressBar>}
                {state === "success" &&
                    <>
                        <ContactInfoIonList docSnap={docSnap!} />
                        <IonButton onClick={getUidFromQRCode} expand="block">Scan Again</IonButton>
                    </>
                }
                {state === "error" && <IonButton onClick={getUidFromQRCode} expand="block">Scan Again</IonButton>}
            </IonContent>
        </IonPage>

    )
}

export default ScanQRScreen;