import { IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbKeys } from '../DataAccessModel';

interface ContactInfoIonListProps {
  docSnap: DocumentSnapshot<DocumentData>
}

const ContactInfoIonList: React.FC<ContactInfoIonListProps> = ({ docSnap }) => {

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

  useEffect(() => {
    setEmail(docSnap.data()![dbKeys.email]);
    setFirstName(docSnap.data()![dbKeys.firstName]);
    setSurname(docSnap.data()![dbKeys.surname]);
    setPhoneNumber(docSnap.data()![dbKeys.phoneNumber]);
    setAddress(docSnap.data()![dbKeys.address]);
    setLocality(docSnap.data()![dbKeys.locality]);
    setRegion(docSnap.data()![dbKeys.region]);
    setPostalCode(docSnap.data()![dbKeys.postalCode]);
    setCountry(docSnap.data()![dbKeys.country]);
    setWebsite(docSnap.data()![dbKeys.website]);
  }, []);

  return (
    <IonList>
      <IonItem>
        <IonLabel position="stacked">Email</IonLabel>
        <IonText>{email}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">First Name</IonLabel>
        <IonText>{firstName}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Surname</IonLabel>
        <IonText>{surname}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Phone Number</IonLabel>
        <IonText>{phoneNumber}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Address</IonLabel>
        <IonText>{address}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">City</IonLabel>
        <IonText>{locality}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Region</IonLabel>
        <IonText>{region}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Postal Code</IonLabel>
        <IonText>{postalCode}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Country</IonLabel>
        <IonText>{country}</IonText>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Website</IonLabel>
        <IonText>{website}</IonText>
      </IonItem>
    </IonList>
  );
};

export default ContactInfoIonList;
