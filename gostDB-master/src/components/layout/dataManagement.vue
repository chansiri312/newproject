<script setup>
import AppBar from './AppBar.vue'
import Navigation from './navigation.vue'
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/main.js'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()

const rules = ref({
  required: (value) => !!value || 'กรุณากรอกข้อมูล'
})

const allRecipe = ref([])
const recipe = ref({
  ingredient1: '',
  ingredient2: '',
  ingredient3: '',
  ingredient4: '',
  ingredient5: '',
  ingredient6: '',
  ingredient7: '',
  ingredient8: '',
  ingredient9: ''
})
function showMyData() {
  if (user !== null) {
    user.providerData.forEach(async (profile) => {
      console.log('  Provider-specific UID: ' + profile.email)
      const userEmail = profile.email

      const q = query(collection(db, 'adddataManagement'), where('useremail', '==', userEmail))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        const myRecipe = ref({ id: doc.id, data: doc.data() })
        allRecipe.value.push(myRecipe.value)
      })
    })
  }
}
//แสดงข้อมูลจาก firebase
onMounted(() => {
  showMyData()
})
const displayName = ref('')
const email = ref('')
//แสดงชื่อและEmail ของผู้ใช้ปัจจุบัน ****************
const auth = getAuth()
const user = auth.currentUser
if (user !== null) {
  displayName.value = user.displayName
  email.value = user.email
  //-----------------------------------------
  user.providerData.forEach((profile) => {
    console.log('  Provider-specific UID: ' + profile.email)
    recipe.value.useremail = profile.email
  })
}
//********************************************
async function addData() {
  try {
    const docRef = await addDoc(collection(db, 'adddataManagement'), recipe.value)
    console.log('Document written with ID: ', docRef.id)
    alert('เพิ่มข้อมูลเรียบร้อย')
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

function editRecipe() {
  dialog.value = true
}
const dialog = ref(false)
</script>

<template>
  <v-card class="body">
    <v-layout>
      <AppBar />
      <Navigation />
      <!--******************************** Main Start ********************************-->
      <v-main>
        <div class="Table">
          <v-card
            class="mx-auto px-10 py-10"
            color="#DCEDC8"
            elevation="10"
            max-width="1000"
            min-height="649"
            max-height="auto"
          >
            <div>
              <v-btn icon class="btnedit" variant="text" @click="editRecipe(recipelist)">
                <Icon
                  icon="material-symbols:add-box-outline-sharp"
                  color="green"
                  width="50"
                  height="50"
                />
              </v-btn>
            </div>

            <v-table>
              <thead class="head">
                <tr>
                  <th class="text-center">รูปภาพ</th>
                  <th class="text-center">รายการ</th>
                  <th></th>
                </tr>
              </thead>
              <!-- <tbody>
                <tr v-for="(recipelist, index) in allRecipe" :key="index">
                  <td class="text-center">
                    <img :src="recipelist.data.ingredient1" alt="" width="200" height="110" />
                  </td>
                  <td>
                    <p class="text-left">{{ recipelist.data.ingredient2 }}</p>
                  </td>
                </tr>
              </tbody> -->
            </v-table>

            <v-container>
              <v-dialog v-model="dialog">
                <v-card>
                  <v-container>
                    <div class="text">
                      <v-sheet
                        class="form mx-auto"
                        elevation="1"
                        max-width="900"
                        min-height="500"
                        max-height="auto"
                      >
                        <div class="forminput">
                          <v-col class="text-center" style="margin-bottom: 1rem">
                            <h3>แบบบันทึกข้อมูลทะเบียนประวัติแพะนม</h3>
                          </v-col>

                          <v-row>
                            <v-col>
                              <v-text-field
                                label="กรอกหมายเลขแพะนม"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient1"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>

                            <v-col>
                              <v-select
                              v-model="recipe.ingredient2"
                                label="เพศ"
                                variant="outlined"
                                :items="['เพศผู้', 'เพศเมีย']"
                              ></v-select>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col>
                              <v-text-field
                                label="กรอกชื่อพันธุ์แพะนม"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient3"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="กรอกวัน/เดือน/ปี(เกิด)"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient4"
                                :rules="[rules.required]"
                              ></v-text-field> </v-col
                          ></v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="กรอกน้ำหนักแรกเกิด(Kg)"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient5"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="กรอกหมายเลขพ่อ/ชื่อ"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient6"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="กรอกหมายเลขแม่/ชื่อ"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient7"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="กรอกวัน/เดือน/ปี(หย่านม)"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient8"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="กรอกน้ำหนักหย่านม(Kg)"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient9"
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="หมายเหตุ"
                                type="text"
                                variant="outlined"
                                v-model="recipe.ingredient10"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row justify="center" style="margin-bottom: 2rem">
                            <div style="margin-right: 1rem">
                              <v-btn color="green" width="120" height="50" @click="addData()">
                                บันทึก
                              </v-btn>
                            </div>
                            <div style="margin-left: 1rem">
                              <v-btn color="red" width="120" height="50" @click="dialog = false">
                                ยกเลิก
                              </v-btn>
                            </div>
                          </v-row>
                        </div>
                      </v-sheet>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-container>
          </v-card>
        </div>
      </v-main>

      <!--******************************** Main End ********************************-->
    </v-layout>
  </v-card>
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
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-position: top center;
}

.forminput {
  min-width: 500px;
  padding: 0.5rem;
  text-align: center;
}

.form {
  margin-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  font-family: 'K2D', sans-serif;
  font-size: 22px;
}

.addbtn {
  text-align: center;
  margin-top: 0rem;
}

p {
  font-size: 22px;
}
</style>
