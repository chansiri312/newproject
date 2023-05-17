<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const from = ref({ email: '', password: '' })
const visible = ref(false)
const rules = ref({
  email: (v) => !!(v || '').match(/@/) || 'กรุณากรอก e-mail',
  required: (value) => !!value || 'กรุณากรอกรหัสผ่าน',
  length: (len) => (v) => (v || '').length >= len || `รหัสผ่านต้องมีความยาว ${len} ตัวขึ้นไป`
  /* password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) || 'รหัสผ่านต้องประกอบด้วย อักขระพิมพ์ใหญ่-เล็ก และตัวเลข', */
})

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    router.push('/')
    // ...
  }
})
async function login() {
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, from.value.email, from.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log('User = ' + user)
      router.push('recipe')

      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      switch (errorCode) {
        case 'auth/invalid-email':
          alert('กรุณากรอก E-mail')
          break
        case 'auth/user-not-found':
          alert('ไม่พบบัญชีผู้ใช้นี้')
          break
        case 'auth/internal-error':
          alert('กรุณากรอกรหัสผ่าน')
          break
        case 'auth/wrong-password':
          alert('กรุณากรอกรหัสผ่านที่ถูกต้อง')
          break

        default:
          alert(errorMessage)
      }
      return
    })
}
function SignUp() {
  router.push('register')
}

function googlelogin() {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      // IdP data available using getAdditionalUserInfo(result)
      console.log('token = ' + token + ' ' + user)
      router.push('recipe')
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode + errorMessage + email + credential)
      // ...
    })
}
</script>

<template>
  <div class="body py-4">
    <v-card class="card mx-auto pa-12 pb-8" elevation="20" max-width="448" rounded="lg">
      <div class="text">E - mail</div>

      <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
        variant="outlined" v-model="from.email" :rules="[rules.email]">
      </v-text-field>

      <div class="text">
        Password
      </div>

      <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible" @keyup.enter="login()" v-model="from.password"
        :rules="[rules.required, rules.password, rules.length(6)]">
      </v-text-field>

      <v-btn block class="btn mb-8" color="blue" size="large" variant="tonal" @click="login()">
        Sign in
      </v-btn>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="googlelogin()">
        <img src="@/assets/google-logo.png" alt="" width="25" />
        <p class="btn">google login</p>
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" rel="noopener noreferrer" target="_blank" @click="SignUp()">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=K2D:wght@100&display=swap');

.text {
  font-family: 'K2D', sans-serif;
}

.body {
  background-image: url(@/assets/bg4.jpg);
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-position: top center;
  font-family: 'K2D', sans-serif;

}

img {
  margin-right: 15px;
}

a {
  font-size: 18px;
}

.btn {
  font-size: 18px;
}

.card {
  margin-top: 7rem;
  margin-bottom: 5.5rem;
}

.text {
  font-family: 'K2D', sans-serif;
  font-size: 22px;
}
</style>
