/**
 * Model Responsible for CRUD calls to Firestore and for reading local JSON files. 
 */

import { arrayUnion, doc, getDoc, increment, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from './firebase.config';
import { Contacts, Contact, ContactField, ContactName, ContactAddress } from '@ionic-native/contacts';
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";


export const getDocRef = () => {
    const user = auth.currentUser;
    if (user === null) {
        throw new Error("Cannot get DocRef. User isn't signed in.");
    }
    return doc(db, 'users', user.uid);
}


export const incrementValueInField = async (field: string, incrementValue = 1) => {
    await updateDoc(getDocRef(), { [`${field}`]: increment(incrementValue) });
}

export const updateValueInField = async (field: string, newValue: any) => {
    await updateDoc(getDocRef(), { [`${field}`]: newValue });
}


export const addValueToArray = async (field: string, valueToAdd: any) => {
    await updateDoc(getDocRef(), { [`${field}`]: arrayUnion(valueToAdd) });
}


export const get = async () => {
    const docSnap = await getDoc(getDocRef());
    return docSnap;
}

export const getFromUid = async (uid: string) => {
    return doc(db, 'users', uid);
}


export const getValueInField = async (field: string) => {
    const docSnap = await get();
    return docSnap.data()![field];
}

export const dbKeys = {
    firstName: "name",
    surname: "surname",
    email: "email",
    phoneNumber: "phoneNumber",
    address: "address",
    locality: "locality",
    region: "region",
    postalCode: "postalCode",
    country: "country",
    website: "website"
}


export const createProfile = async () => {
    if (auth.currentUser === null) {
        throw new Error("Cannot create profile. User is not signed in.");
    }
    await setDoc(getDocRef(), {
        firstName: "",
        surname: "",
        email: auth!.currentUser!.email,
        phoneNumber: "",
        address: "",
        locality: "",
        region: "",
        postalCode: "",
        country: "",
        website: ""
    });
}

export const fetchDataForUser = (uid: string) => {
    return doc(db, 'users', uid);
}

export const fetchDataAndConvertToContactObject = async (uid: string) => {
    var data = fetchDataForUser(uid);
}

export const createContactFromScan = async (uid: string) => {

    // Ensure permissions are accepted.
    await AndroidPermissions.requestPermissions([AndroidPermissions.PERMISSION.WRITE_CONTACTS, AndroidPermissions.PERMISSION.READ_CONTACTS]);

    // Attempt to get the contact's data using found uid.

    const docRef = await doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Contact found:", docSnap.data());
    } else {
        console.error("Contact not found for uid: " + uid);
        return;
    }

    // Construct the Contact object.

    var contacts = new Contacts();
    var contact = contacts.create();

    contact.name = new ContactName(undefined, docSnap.data()[dbKeys.surname], docSnap.data()[dbKeys.firstName]);
    contact.phoneNumbers = [new ContactField("mobile", docSnap.data()[dbKeys.phoneNumber])];
    contact.emails = [new ContactField("email", docSnap.data()[dbKeys.email])];

    contact.urls = [new ContactField("website", docSnap.data()[dbKeys.website])];

    var address = new ContactAddress();
    address.type = "home";
    address.streetAddress = docSnap.data()[dbKeys.address];
    address.locality = docSnap.data()[dbKeys.locality];
    address.region = docSnap.data()[dbKeys.region];
    address.postalCode = docSnap.data()[dbKeys.postalCode];
    address.country = docSnap.data()[dbKeys.country];
    contact.addresses = [address];

    // Save the contact.
    contact.save()
        .then(() => alert('Contact saved!'))
        .catch((error: any) => console.error('Error saving contact.', error));
}
