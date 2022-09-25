import { IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonPage, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { get } from '../DataAccessModel';
import './SettingsScreen.css';
import { createContext } from 'react';
import SettingsView from './SettingsView';
import { Url } from 'url';

export const SettingsContext = createContext({});

const SettingsController: React.FC = () => {

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [addresses, setAddresses] = useState("");
  const [urls, setUrls] = useState<Url>({});
  const [organizations, setOrganizations] = useState({});
  const [birthday, setBirthday] = useState<Date>();

  // useEffect(() => {
  //   get().then((_data) => {
  //     setData(_data);
  //   }).catch((error) => {
  //     alert("Error loading data");
  //     console.log(error);
  //   })
  // }, []);

  const settingsContext = {
    email,
    setEmail,
    firstName,
    setFirstName,
    surname,
    setSurname,
    phon
  }


  return (
    <SettingsContext.Provider value={{ settingsContext }}>
      <SettingsView />
    </SettingsContext.Provider>

  );
};

export default withIonLifeCycle(SettingsController);
