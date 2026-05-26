import { initializeApp } from 'firebase/app';

import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyBCIKxrBbQQdUpTosNDX_hkCOA8BfcQ-ew",

  authDomain: "expedicao-app-23fb8.firebaseapp.com",

  projectId: "expedicao-app-23fb8",

  storageBucket: "expedicao-app-23fb8.firebasestorage.app",

  messagingSenderId: "923161517487",

  appId: "1:923161517487:web:40c445beabed3716ede35a",

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);