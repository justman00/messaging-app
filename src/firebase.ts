import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyA71g35CU20xtCoUQLwD9Gc3-ngbRQsUWU',
  authDomain: 'messaging-app-vlad.firebaseapp.com',
  databaseURL: 'https://messaging-app-vlad.firebaseio.com',
  projectId: 'messaging-app-vlad',
  storageBucket: 'messaging-app-vlad.appspot.com',
  messagingSenderId: '599520797257'
}
firebase.initializeApp(config)

export const firestore = firebase.firestore()
