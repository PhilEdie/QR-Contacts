/**
 * Utility functions which are used to ensure registration and password reset fields are valid.
 */

export const validInputs = (name, email, password, confirmPassword = password) => {

    if (name == "") {
        alert('Please enter a name.');
        return false;
    }

    if (email == "") {
        alert('Please enter an email address.');
        return false;
    }

    if (!validEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password == "") {
        alert('Please enter a password.');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters.');
        return false;
    }

    if (!hasAtLeastOneNumber(password)) {
        alert('Password must contain at least one number.');
        return false;
    }

    if (!hasAtLeastOneLowerCaseLetter(password)) {
        alert('Password must contain at least one lowercase letter.');
        return false;
    }

    if (!hasAtLeastOneUpperCaseLetter(password)) {
        alert('Password must contain at least one uppercase letter.');
        return false;
    }

    if (!hasAtLeastOneSpecialCharacter(password)) {
        alert('Password must contain at least one special character.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Please ensure password and confirm password match.');
        return false;
    }

    return true;
}



// Help from: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
export const validEmail = (email) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export const validPassword = (password) => {
    return password.length >= 8 &&
        hasAtLeastOneNumber(password) &&
        hasAtLeastOneLowerCaseLetter(password) &&
        hasAtLeastOneUpperCaseLetter(password) &&
        hasAtLeastOneSpecialCharacter(password)
}

// Help from : https://www.the-art-of-web.com/javascript/validate-password/
const hasAtLeastOneNumber = (password) => {
    return /[0-9]/.test(password);
}

const hasAtLeastOneLowerCaseLetter = (password) => {
    return /[a-z]/.test(password);
}

const hasAtLeastOneUpperCaseLetter = (password) => {
    return /[A-Z]/.test(password);
}

const hasAtLeastOneSpecialCharacter = (password) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

