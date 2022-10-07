import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonText, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import { setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { logoutUser } from '../Authentication';
import { dbKeys, get, getDocRef } from '../DataAccessModel';
import { auth } from '../firebase.config';

const SettingsScreen: React.FC = () => {

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState(""); //City or province
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState("loading");
  const history = useHistory();

  useEffect(() => {
    get().then((_docSnap) => {
      setEmail(auth!.currentUser!.email!)
      setFirstName(_docSnap.data()![dbKeys.firstName]);
      setSurname(_docSnap.data()![dbKeys.surname]);
      setPhoneNumber(_docSnap.data()![dbKeys.phoneNumber]);
      setAddress(_docSnap.data()![dbKeys.address]);
      setLocality(_docSnap.data()![dbKeys.locality]);
      setRegion(_docSnap.data()![dbKeys.region]);
      setPostalCode(_docSnap.data()![dbKeys.postalCode]);
      setCountry(_docSnap.data()![dbKeys.country]);
      setWebsite(_docSnap.data()![dbKeys.website]);
      setState("success");
    }).catch((error) => {
      setState("error")
      alert("Error loading data");
      console.log(error);
    })
  }, []);

  const handleSubmit = async () => {
    setState("loading");
    updateContactInfo().then(() => {
      alert("Info updated.");
      setState("success");
    }).catch((error) => {
      alert("An error occured.");
      console.error(error);
      setState("error");
    })
  }

  const updateContactInfo = async () => {
    setDoc(getDocRef(), {
      [`${dbKeys.firstName}`]: firstName,
      [`${dbKeys.surname}`]: surname,
      [`${dbKeys.phoneNumber}`]: phoneNumber,
      [`${dbKeys.address}`]: address,
      [`${dbKeys.locality}`]: locality,
      [`${dbKeys.region}`]: region,
      [`${dbKeys.postalCode}`]: postalCode,
      [`${dbKeys.country}`]: country,
      [`${dbKeys.website}`]: website
    })
  }

  if (state == "loading") {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonProgressBar type="indeterminate"></IonProgressBar>
        </IonContent>
      </IonPage>

    )
  } else if (state == "error") {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonText>An error occured.</IonText>
        </IonContent>
      </IonPage>
    )
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonToolbar>
            <IonTitle size="large">Update Contact Details</IonTitle>
          </IonToolbar>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput value={email} type={"email"} required={true} onIonChange={e => setSurname(e.detail.value!)} disabled></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">First Name</IonLabel>
            <IonInput value={firstName} type={"text"} required={true} onIonChange={e => setFirstName(e.detail.value!)}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Surname</IonLabel>
            <IonInput value={surname} type={"text"} required={true} onIonChange={e => setSurname(e.detail.value!)}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Phone Number</IonLabel>
            <IonInput value={phoneNumber} type={"text"} required={true} onIonChange={e => setPhoneNumber(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Address</IonLabel>
            <IonInput value={address} type={"text"} required={true} onIonChange={e => setAddress(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">City</IonLabel>
            <IonInput value={locality} type={"text"} required={true} onIonChange={e => setLocality(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Region</IonLabel>
            <IonInput value={region} type={"text"} required={true} onIonChange={e => setRegion(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Postal Code</IonLabel>
            <IonInput value={postalCode} type={"text"} required={true} onIonChange={e => setPostalCode(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Country</IonLabel>
            <IonInput value={country} type={"text"} required={true} onIonChange={e => setCountry(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Website</IonLabel>
            <IonInput value={website} type={"text"} required={true} onIonChange={e => setWebsite(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton expand="block" type="submit" onClick={() => handleSubmit()}>Submit</IonButton>
        </IonList>
        <IonButton
          onClick={() => {
            setState("loading");
            logoutUser().then(() => {
              setState("");
              history.push("/login");
            }).catch((error) => {
              setState("");
              console.log(error);
              alert("Something went wrong!");
            });
          }} expand="block"
        >Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default withIonLifeCycle(SettingsScreen);
