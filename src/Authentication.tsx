/**
 * Responsible for handling authentication requests to Firebase Authentication.
 * Used on the Login, Register, and Reset Password screens.
 */

import {
    createUserWithEmailAndPassword, sendEmailVerification,
    sendPasswordResetEmail, signInWithEmailAndPassword,
    signOut, updateProfile
} from 'firebase/auth';
import { auth } from './firebase.config';
import { createProfile } from './DataAccessModel';


export const registerUser = async (name: string, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
    await updateProfile(auth!.currentUser!, {
        displayName: name
    });
    await sendEmailVerification(auth!.currentUser!);
    await createProfile();
    await signOut(auth);
}

export const loginUser = async (email: string, password: string) => {
    if (email === undefined || password === undefined) {
        throw new Error('credentials-are-undefined');
    }

    // Sign out current user, if there is one.
    if (auth.currentUser !== null) {
        await signOut(auth);
    }

    await signInWithEmailAndPassword(auth, email, password);

    // Ensure user cannot login unless they are email verified.
    if (!(auth!.currentUser!.emailVerified)) {
        signOut(auth);
        throw new Error("email-not-verified");
    }
}


export const logoutUser = async () => {
    signOut(auth);
};

export const resetPassword = async (email: string) => {
    sendPasswordResetEmail(auth, email);
}

export const uid = () => {
    return auth!.currentUser!.uid;
}