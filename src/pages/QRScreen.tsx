import { IonCard, IonCardContent, IonCardSubtitle, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { QRCodeCanvas } from 'qrcode.react';
import { auth } from '../firebase.config';
import './QRScreen.css';


const QRScreen: React.FC = () => {

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
        <IonCard>

          <IonCardContent >
            <QRCodeCanvas value={auth!.currentUser!.uid!} includeMargin={true} size={380} className={"qr"} />
            <IonText className={"qr"}>{auth!.currentUser!.uid!}</IonText>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default QRScreen;



