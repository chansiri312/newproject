<script setup>
import AppBar from '../components/layout/AppBar.vue'
import Navigation from './layout/navigation.vue'
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore'
import { db } from '../main.js'
//import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

//const router = useRouter()
const allRecipe = ref([])
const dialog = ref(false)
const displayName = ref('')
const email = ref('')
const recipe = ref({
  useremail: '',
  goatname: '',
  instructions: '',
  category: '',
  categoryother: '',
  linkurl: '',
  status: '',
  ingredient1: '',
  ingredient2: '',
  ingredient3: '',
  ingredient4: '',
  ingredient5: '',
  ingredient6: '',
  ingredient7: '',
  ingredient8: '',
  ingredient9: '',
  ingredient10: '',
  measure1: '',
  measure2: '',
  measure3: '',
  measure4: '',
  measure5: '',
  measure6: '',
  measure7: '',
  measure8: '',
  measure9: '',
  measure10: ''
})
const auth = getAuth()
const user = auth.currentUser
if (user !== null) {
  displayName.value = user.displayName
  email.value = user.email
}
function showMyData() {
  if (user !== null) {
    user.providerData.forEach(async (profile) => {
      console.log('  Provider-specific UID: ' + profile.email)
      const userEmail = profile.email

      const q = query(collection(db, 'addrecipe'), where('useremail', '==', userEmail))
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
async function deleteMenu(id, index) {
  if (confirm('คุณต้องการลบรายการนี้หรือไม่ ?')) {
    await deleteDoc(doc(db, 'addrecipe', id))
    console.log('Delete document with ID:', id)
    allRecipe.value.splice(index, 1)
  }
}
//******************************************
const Edit = ref([])
function editRecipe(recipelist) {
  Edit.value = recipelist.id
  recipe.value = recipelist.data
  dialog.value = true
}
//******************************************
async function updateRecipe() {
  if (confirm('ยืนยันการแก้ไข ?')) {
    try {
      const washingtonRef = doc(db, 'addrecipe', Edit.value)
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, recipe.value)
      console.log('Update recipe success')
    } catch (e) {
      console.error('Update recipe error', e)
    }
    dialog.value = false
  }
}
//*****************************************
</script>

<template>
  <v-card class="body">
    <v-layout>
      <AppBar />
      <Navigation />
      <!--************************************ Main Start *****************************************-->
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
            <v-table>
              <thead class="head">
                <tr>
                  <th class="text-center">รายการ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(recipelist, index) in allRecipe" :key="index"> 
                  <td>
                    <p class="text-left">{{ recipelist.data.number_gost }}</p>
                  </td>
                  <td>
                    <div>
                      <v-btn icon class="btnedit" variant="text" @click="editRecipe(recipelist)">
                        <Icon
                          icon="material-symbols:edit-square-outline"
                          color="blue"
                          width="35"
                          height="35"
                        />
                      </v-btn>
                      <v-btn
                        icon
                        class="btndelete"
                        variant="text"
                        @click="deleteMenu(recipelist.id, index)"
                      >
                        <Icon icon="ic:outline-delete-outline" color="red" width="40" height="40" />
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <!-- ************************************** Dialog *****************************************-->
            <v-container>
              <v-dialog v-model="dialog">
                <v-card class="mx-auto">
                  <v-container>
                    <div class="forminput">
                      <v-form>
                        <div v-if="recipe.status == 'ส่วนตัว'">
                          <v-row>
                            <v-col>
                              <v-text-field
                                prepend-icon="mdi-account"
                                readonly
                                variant="plain"
                                v-model="recipe.useremail"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-select
                                prepend-icon="mdi-incognito"
                                label="สถานะแชร์"
                                :items="['ส่วนตัว', 'สาธารณะ']"
                                variant="outlined"
                                v-model="recipe.status"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </div>
                        <div v-else>
                          <v-row>
                            <v-col>
                              <v-text-field
                                prepend-icon="mdi-account"
                                readonly
                                variant="plain"
                                v-model="recipe.useremail"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-select
                                prepend-icon="mdi-publish"
                                label="สถานะแชร์"
                                :items="['ส่วนตัว', 'สาธารณะ']"
                                variant="outlined"
                                v-model="recipe.status"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </div>
                        <div v-if="recipe.category == 'อื่นๆ'">
                          <v-row
                            ><v-col>
                              <v-select
                                prepend-icon="mdi-select"
                                label="กรุณาเลือกเพศ"
                                :items="['เพศผู้', 'เพศเมีย', 'อื่นๆ']"
                                variant="outlined"
                                v-model="recipe.category"
                              ></v-select>
                            </v-col>
                            <v-col>
                              <v-text-field
                                prepend-icon="mdi-pencil"
                                label="รายละเอียดแพะนม"
                                type="text"
                                variant="outlined"
                                v-model="recipe.categoryother"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </div>
                        <div v-else>
                          <v-row>
                            <v-col>
                              <v-select
                                prepend-icon="mdi-select"
                                label="กรุณาเลือกเพศ"
                                :items="['เพศผู้', 'เพศเมีย', 'อื่นๆ']"
                                variant="outlined"
                                v-model="recipe.category"
                              ></v-select>
                            </v-col>
                            <v-col>
                              <v-text-field
                                prepend-icon="mdi-lock"
                                readonly
                                label="รายละเอียดแพะนม"
                                type="text"
                                variant="plain"
                                v-model="recipe.categoryother"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </div>
                      </v-form>
                    </div>
                    <v-row justify="center" style="margin-bottom: 2rem">
                      <div style="margin-right: 1rem">
                        <v-btn color="green" @click="updateRecipe(recipe)"> บันทึก </v-btn>
                      </div>
                      <div style="margin-left: 1rem">
                        <v-btn color="red" @click="dialog = false"> ยกเลิก </v-btn>
                      </div>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-container>
          </v-card>
        </div>
      </v-main>
      <!--************************************ Main End *****************************************-->
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
  font-family: 'K2D', sans-serif;
}

.Table {
  margin-top: 2rem;
  margin-bottom: 3rem;
  font-size: 19px;
}

.head {
  font-size: 26px;
}

.btnedit {
  margin-right: 0.5rem;
}

.forminput {
  min-width: 700px;
  padding: 2rem;
  text-align: center;
  font-family: 'K2D', sans-serif;
  font-size: 22px;
}

.btndelete {
  margin-left: 0.5rem;
}
</style>
