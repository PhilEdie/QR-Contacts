/**
 * Model Responsible for CRUD calls to Firestore and for reading local JSON files. 
 */

import { arrayUnion, doc, getDoc, increment, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from './firebase.config';
import { items } from "./Items.json";


export const getDocRef = () => {
    const user = auth.currentUser;
    return doc(db, 'users', user.uid);
}

export const incrementValueInField = async (field, incrementValue = 1) => {
    await updateDoc(getDocRef(), { [`${field}`]: increment(incrementValue) });
}

export const updateValueInField = async (field, newValue) => {
    await updateDoc(getDocRef(), { [`${field}`]: newValue });
}


export const addValueToArray = async (field, valueToAdd) => {
    await updateDoc(getDocRef(), { [`${field}`]: arrayUnion(valueToAdd) });
}


export const get = async () => {
    const docSnap = await getDoc(getDocRef());
    return docSnap;
}

export const getValueInField = async (field) => {
    const docSnap = await get();
    return docSnap.data()[field];
}

export const unequipItem = async (itemSlotName) => {
    await updateValueInField(itemSlotName, items.none);
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
    const name = auth.currentUser.displayName;
    await setDoc(getDocRef(), {
        name: name,
        email: auth.currentUser.email
    });
}
