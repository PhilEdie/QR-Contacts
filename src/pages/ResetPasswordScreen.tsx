import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { resetPassword } from '../Authentication';
import { validEmail } from '../ValidateLogin';


const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const handleSubmit = async () => {
        if (!validEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        resetPassword(email).then(() => {
            setEmail('');
            alert("A password reset email has been sent to " + email);
        }).catch((error) => {
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