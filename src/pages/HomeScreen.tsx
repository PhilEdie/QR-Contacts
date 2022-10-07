import {
    IonIcon,
    IonLabel, IonPage, IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from "@ionic/react";
import { IonReactRouter } from '@ionic/react-router';
import { qrCodeOutline, scanOutline, settingsOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { auth } from "../firebase.config";
import QRScreen from './QRScreen';
import ScanQRScreen from "./ScanQRScreen";
import SettingsScreen from './SettingsScreen';


const HomeScreen = () => {
    return (
        <IonPage>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        {auth.currentUser !== null ? <Redirect exact path="/" to="/login" /> : <Redirect exact path="/" to="/QR" />}
                        <Route exact path="/QR">
                            <QRScreen />
                        </Route>
                        <Route exact path="/settings">
                            <SettingsScreen />
                        </Route>
                        <Route exact path="/scan">
                            <ScanQRScreen />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="scan" href="/scan">
                            <IonIcon icon={scanOutline} />
                            <IonLabel>Scan</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="QR" href="/QR">
                            <IonIcon icon={qrCodeOutline} />
                            <IonLabel>My QR Code</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="settings" href="/settings">
                            <IonIcon icon={settingsOutline} />
                            <IonLabel>Settings</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonPage>
    );
};

export default HomeScreen;
