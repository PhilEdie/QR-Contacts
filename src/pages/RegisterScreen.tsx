import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { registerUser } from "../Authentication";
import { validInputs } from "../ValidateLogin"


const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    //const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();



    const handleSubmit = () => {
        if (!validInputs(firstName, email, password, confirmPassword)) {
            return;
        }

        registerUser(firstName, email, password).then(() => {
            setFirstName('');
            //setSurname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            alert("Verification email sent to " + email);
        }).catch((error) => {
            console.log(error);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('Email already in use. Please use another email.');
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
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">First Name</IonLabel>
                        <IonInput value={firstName} type={"text"} required={true} onIonChange={e => setFirstName(e.detail.value!)}></IonInput>
                    </IonItem>


                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput value={email} type={"email"} required={true} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                    </IonItem>


                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput value={password} type={"password"} required={true} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Confirm Password</IonLabel>
                        <IonInput value={confirmPassword} type={"password"} required={true} onIonChange={e => setConfirmPassword(e.detail.value!)}></IonInput>
                    </IonItem>

                    <IonButton expand="block" type="submit" onClick={() => handleSubmit()}>Submit</IonButton>
                    <IonItem>
                        <IonLabel position="stacked">Already have an account?</IonLabel>
                        <Link to='/login'>Login</Link>
                    </IonItem>

                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default RegisterScreen;