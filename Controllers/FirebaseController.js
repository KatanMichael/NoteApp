import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAhNTZ-gDZ9A369kOKSungTHa2Z95m0f8Y",
    authDomain: "reactnativetest-c4436.firebaseapp.com",
    databaseURL: "https://reactnativetest-c4436.firebaseio.com",
    projectId: "reactnativetest-c4436",
    storageBucket: "reactnativetest-c4436.appspot.com",
    messagingSenderId: "918571999935",
    appId: "1:918571999935:web:2edca6834abb1911f45c0a",
    measurementId: "G-Q22M36J9CN"
  };

class FirebaseController
{

    constructor()
    {
        if(!firebase.apps.length)
        {
          firebase.initializeApp(firebaseConfig);
        }
    }

    registerNewUser(email, password)
    {
        return firebase.auth().createUserWithEmailAndPassword(email,password)
    }
        
    loginEmailPassword(email,password)
    {
        return firebase.auth().signInWithEmailAndPassword(email,password);
    }

    addUserToDatabase(user)
    {
        return firebase.firestore().collection("Users")
        .add(user)     
    }

    getUserDisplayNameById(id)
    {
        return firebase.firestore().collection("Users")
        .where('userId', '==', id).get()
    }
}

export default FirebaseController