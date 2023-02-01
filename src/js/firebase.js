// import { errorNotification } from './notifications';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  errorNotification,
  successfulRegistration,
  successfulSignIn,
  successfulSignOut,
  errorNotification,
  newPassword,
} from './notifications';

export const firebaseConfig = {
  apiKey: 'AIzaSyDFRxvG-cLncd4nzHUtwRVnlgrm2OeK7W8',
  authDomain: 'filmoteka-test-90b99.firebaseapp.com',
  projectId: 'filmoteka-test-90b99',
  storageBucket: 'filmoteka-test-90b99.appspot.com',
  messagingSenderId: '222913084900',
  appId: '1:222913084900:web:1011c02877eb5816a41bf1',
  measurementId: 'G-V4RKSJYRFE',
};

const app = initializeApp(firebaseConfig);
let auth = getAuth(app);

const form = document.querySelector('.auth-form');
const registrationButton = document.querySelector('.form-button-register');
const signInButton = document.querySelector('.form-button-sign-in');
const libraryRef = document.querySelector('.js-library-page');
const watchedBtn = document.querySelector('.js-add-to-watched-btn');
const queueBtn = document.querySelector('.js-add-to-queue-btn');
const passwordReset = document.querySelector('.forgot-password');

registrationButton.addEventListener('click', handleRegistration);
signInButton.addEventListener('click', handleSignIn);
passwordReset.addEventListener('click', handlePasswordReset);

export function isUser(user) {
  if (user === null) {
    console.log('no user');
    libraryRef.classList.add('visually-hidden');
  } else libraryRef.classList.remove('visually-hidden');
}

export function isUserInModal(user) {
  if (user === null) {
    console.log('no user');
    watchedBtn.setAttribute('disabled', true);
    queueBtn.setAttribute('disabled', true);
  } else {
    watchedBtn.removeAttribute('disabled');
    queueBtn.removeAttribute('disabled');
  }
}

async function handleRegistration(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const password = form.elements.password.value;

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;

    if (email && password) {
      successfulRegistration();
      form.reset();
    }
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}

async function handleSignIn(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const password = form.elements.password.value;
  if (signInButton.textContent === 'Sign in') {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      console.log(user);

      if (email && password) {
        successfulSignIn();
        signInButton.textContent = 'Sign out';
        onAuthStateChanged(auth, isUser);
        localStorage.setItem('user-uid', user.uid);
        const currentUser = JSON.stringify([email, password]);
        localStorage.setItem('current-user', currentUser);
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  } else if (signInButton.textContent === 'Sign out') {
    try {
      const response = await signOut(auth);

      successfulSignOut();
      form.reset();
      localStorage.removeItem('current-user');
      localStorage.removeItem('user-uid');
      signInButton.textContent = 'Sign in';
      libraryRef.classList.add('visually-hidden');
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }
}

export function handleError(error) {
  let errorMessage = error.message;
  if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
    alert('This user is already exist. Please sign in!');
    // form.reset();
  } else if (errorMessage == 'Firebase: Error (auth/wrong-password).') {
    alert('Authorization error. Incorrect password');
  } else if (errorMessage == 'Firebase: Error (auth/invalid-email).') {
    alert('Please enter valid email!');
  } else if (errorMessage == 'Firebase: Error (auth/missing-email).') {
    alert('Please enter email!');
  } else if (errorMessage == 'Firebase: Error (auth/internal-error).') {
    alert('Please enter password');
  } else if (
    errorMessage ==
    'Firebase: Password should be at least 6 characters (auth/weak-password).'
  ) {
    alert('Password should be at least 6 characters.');
  } else errorNotification();
}

async function handlePasswordReset() {
  event.preventDefault();
  const email = form.elements.email.value;
  try {
    const sendPassword = await sendPasswordResetEmail(auth, email);

    newPassword();
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}
