import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import QRScreen from './pages/QRScreen';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import { auth } from './firebase.config';
import HomeScreen from './pages/HomeScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Route
        exact
        path="/"
        render={(props) => {
          return (auth.currentUser !== null) ? <HomeScreen /> : <LoginScreen />
        }}>
      </Route>
      <Route exact path="/QR">
        <HomeScreen />
      </Route>
      <Route exact path="/register">
        <RegisterScreen />
      </Route>
      <Route exact path="/login">
        <LoginScreen />
      </Route>
      <Route exact path="/reset-password">
        <ResetPasswordScreen />
      </Route>
    </IonReactRouter>
  </IonApp>
);

export default App;
