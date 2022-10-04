
import { useCallback, useState } from 'react';
import { loginUser } from "../Authentication.js";
import { auth } from "../firebase.config.js";
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonNavLink, IonPage, IonProgressBar, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');
    const history = useHistory();

    const handleSubmit = async () => {
        setState('loading');
        await loginUser(email, password).then(() => {
            //navigation.navigate("HomeScreen");
            setState('');
            history.push('/QR');
        }).catch((error: any) => {
            setState('');
            console.log(error);
            if (error.message != undefined && error.message == 'email-not-verified') {
                alert("Please verify your account through the verification email.");
                return;
            }
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('Invalid credentials. Please try again.');
                    break;
                case 'auth/wrong-password':
                    alert('Invalid credentials. Please try again.');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid credentials. Please try again.');
                    break;
                case 'auth/too-many-requests':
                    alert('Access to this account has been temporarily disabled due to too many login attempts. You can immediately restore it by resetting your password or you can try again later.');
                    break;
                case 'auth/network-request-failed':
                    alert('No network access. Please connect to the internet.');
                    break;
                default:
                    alert('Something went wrong!');
            }
        });
    };

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    state == 'loading' ? <IonProgressBar type="indeterminate"></IonProgressBar> : null
                }

                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput value={email} type={"email"} required={true} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput value={password} type={"password"} required={true} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>

                    <IonButton expand="block" type="submit" onClick={() => handleSubmit()}>Submit</IonButton>



                    <IonItem>
                        <IonLabel position='stacked'>Don't have an account?</IonLabel>
                        <Link to='/register'>Register</Link>
                    </IonItem>


                    <IonItem>
                        <IonLabel position='stacked'>Forgot your password?</IonLabel>
                        <Link to='/reset-password'>Reset Password</Link>
                    </IonItem>

                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default LoginScreen;
