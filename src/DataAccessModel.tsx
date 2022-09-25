/**
 * Model Responsible for CRUD calls to Firestore and for reading local JSON files. 
 */

import { arrayUnion, doc, getDoc, increment, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from './firebase.config';


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

export const getValueInField = async (field: string) => {
    const docSnap = await get();
    return docSnap.data()![field];
}

export const dbKeys = {
    firstName: "name",
    surname: "surname",
    email: "email",
    dateOfBirth: "dateOfBirth",
    phoneNumber: "phoneNumber",
    address: "address"
}

export const createProfile = async () => {
    if (auth.currentUser === null) {
        throw new Error("Cannot create profile. User is not signed in.");
    }
    await setDoc(getDocRef(), {
        name: auth!.currentUser!.displayName,
        email: auth!.currentUser!.email
    });
}

export const fetchDataForUser = (uid: string) => {
    return doc(db, 'users', uid);
}

export const fetchDataAndConvertToContactObject = async (uid: string) => {

}
