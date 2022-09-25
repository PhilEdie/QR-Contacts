import { IonPage } from "@ionic/react";
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { qrCodeOutline, settingsOutline, scanOutline } from 'ionicons/icons';
import QRScreen from './QRScreen';
import SettingsController from './SettingsController';
import ScanQRScreen from "./ScanQRScreen";


const HomeScreen = () => {
    return (
        <IonPage>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact path="/home" to="/QR" />
                        <Redirect exact path="/" to="/QR" />
                        <Route exact path="/QR">
                            <QRScreen />
                        </Route>
                        <Route exact path="/settings">
                            <SettingsController />
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
