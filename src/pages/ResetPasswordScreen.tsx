import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../ModelAndController/AuthenticationController';
import { validEmail } from '../ModelAndController/ValidateLoginController';


const ResetPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [state, setState] = useState("");

    const handleSubmit = async () => {
        if (!validEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        setState("loading");
        resetPassword(email).then(() => {
            setEmail('');
            setState("");
            alert("A password reset email has been sent to " + email);
        }).catch((error) => {
            setState("");
            alert('Something went wrong!');
            console.log(error);
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Reset Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {state === "loading" ? <IonProgressBar type="indeterminate"></IonProgressBar> : null}
                <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={email} type={"email"} required={true} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                </IonItem>
                <IonButton expand="block" type="submit" onClick={() => handleSubmit()}>Submit</IonButton>
                <IonItem>
                    <Link to='/login'>Login</Link>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default ResetPasswordScreen;