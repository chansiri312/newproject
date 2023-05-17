import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import './assets/main.css'

import '@mdi/font/css/materialdesignicons.css' 
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
export default createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGP3lckDDrtZA0TtQHHI4jQl_vEXSbQdA',
  authDomain: 'gost-db.firebaseapp.com',
  projectId: 'gost-db',
  storageBucket: 'gost-db.appspot.com',
  messagingSenderId: '179183794971',
  appId: '1:179183794971:web:4ab842acf2318b6a6eb1be'
}

// Initialize Firebase
const initFirebase = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(initFirebase)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
