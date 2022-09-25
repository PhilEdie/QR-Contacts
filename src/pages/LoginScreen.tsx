
import { useCallback, useState } from 'react';
import { loginUser } from "../Authentication.js";
import { auth } from "../firebase.config.js";
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, useHistory } from 'react-router';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    // Resets fields when screen moves in focus.
    // useFocusEffect(
    //     useCallback(() => {
    //         setEmail('');
    //         setPassword('');
    //     }, [])
    // );

    // const philLogin = async () => {
    //     await loginUser("ediephil@gmail.com", "ExamplePass1*");
    //     // If successfully logged in, go to home screen.
    //     if (auth.currentUser !== null) {
    //         if (auth.currentUser !== null) {
    //             //navigation.navigate("HomeScreen");
    //         }
    //     };
    // }


    const handleSubmit = async () => {
        await loginUser(email, password).then(() => {
            //navigation.navigate("HomeScreen");
            history.push('/home');
            alert("Sign in successful.");
        }).catch((error: any) => {
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
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput value={email} type={"email"} required={true} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput value={password} type={"password"} required={true} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonButton expand="block" type="submit" onClick={() => handleSubmit()}>Submit</IonButton>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Don't have an account?</IonLabel>
                        <IonButton expand="block" onClick={() => history.push('/register')}>Register</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default LoginScreen;
