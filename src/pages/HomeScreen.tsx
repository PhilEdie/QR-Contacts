/**
 * Represents the home screen of the app after the user has logged in. The user can navigate between three tabs.
 */

import {
    IonIcon,
    IonLabel, IonPage, IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from "@ionic/react";
import { IonReactRouter } from '@ionic/react-router';
import { qrCodeOutline, scanOutline, settingsOutline } from 'ionicons/icons';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import QRScreen from './QRScreen';
import ScanQRScreen from "./ScanQRScreen";
import SettingsScreen from './SettingsScreen';

const HomeScreen: React.FC<RouteComponentProps> = ({ history, match }) => {
    return (
        <IonPage>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact from={match.url} to={`${match.url}/QR`} />
                        <Route exact path={`${match.url}/QR`}>
                            <QRScreen />
                        </Route>
                        <Route exact path={`${match.url}/settings`}>
                            <SettingsScreen history={history} />
                        </Route>
                        <Route exact path={`${match.url}/scan`}>
                            <ScanQRScreen />
                        </Route>
                        <Route render={() => <Redirect to={match.url} />} />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="scan" href={`${match.url}/scan`}>
                            <IonIcon icon={scanOutline} />
                            <IonLabel>Scan</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="QR" href={`${match.url}/QR`}>
                            <IonIcon icon={qrCodeOutline} />
                            <IonLabel>My QR Code</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="settings" href={`${match.url}/settings`}>
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
