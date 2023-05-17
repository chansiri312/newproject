<script setup>
import AppBar from '../components/layout/AppBar.vue'
import Navigation from '../components/layout/navigation.vue'
import { ref, onMounted } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../main.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const allRecipe = ref([])
onMounted(() => {
  showRecipeData()
})
async function showRecipeData() {
  const docRef = doc(db, 'addrecipe', id)
  const docSnap = await getDoc(docRef)
  try {
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      const docRecipe = ref({ data: docSnap.data() })
      allRecipe.value.push(docRecipe.value)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  } catch (error) {
    console.log('show data error =>', error)
  }
}
</script>

<template>
  <v-card class="body">
    <v-layout>
      <AppBar />
      <Navigation />

      <v-main>
        <div class="detial">
          <v-container class="container">
            <v-row>
              <v-col v-for="list in allRecipe" :key="list.data.status">
                <v-card
                  class="mx-auto"
                  elevation="15"
                  max-width="800"
                  min-height="649"
                  max-height="auto"
                >
                  <v-img class="align-end text-white" height="400" :src="list.data.linkurl" cover>
                  </v-img>
                  <v-card-title class="texttitle">{{ list.data.foodname }}</v-card-title>
                  <div class="textsubdetial">
                    <v-card-subtitle class="textsub me-1">
                      <v-icon> mdi-account </v-icon>
                      <p style="margin-left: 1rem">{{ list.data.useremail }}</p>
                    </v-card-subtitle>

                    <v-card-text>
                      <div class="text3">
                        ประเภทอาหาร: {{ list.data.category }} ,{{ list.data.categoryother }}
                      </div>
                    </v-card-text>
                  </div>
                  <v-card-title class="titledetail"> วัตถุดิบ </v-card-title>
                  <div>
                    <v-card-text class="ingredientdetail">
                      <v-table>
                        <tbody>
                          <tr>
                            <td class="text-left">
                              {{ list.data.ingredient1 }} <br />
                              {{ list.data.ingredient2 }} <br />
                              {{ list.data.ingredient3 }} <br />
                              {{ list.data.ingredient4 }} <br />
                              {{ list.data.ingredient5 }} <br />
                              {{ list.data.ingredient6 }} <br />
                              {{ list.data.ingredient7 }} <br />
                              {{ list.data.ingredient8 }} <br />
                              {{ list.data.ingredient9 }} <br />
                              {{ list.data.ingredient10 }} <br />
                            </td>
                            <td class="text-left">
                              {{ list.data.measure1 }} <br />
                              {{ list.data.measure2 }} <br />
                              {{ list.data.measure3 }} <br />
                              {{ list.data.measure4 }} <br />
                              {{ list.data.measure5 }} <br />
                              {{ list.data.measure6 }} <br />
                              {{ list.data.measure7 }} <br />
                              {{ list.data.measure8 }} <br />
                              {{ list.data.measure9 }} <br />
                              {{ list.data.measure10 }} <br />
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-card-text>
                  </div>
                  <v-card-title class="titledetail"> วิธีทำ </v-card-title>
                  <v-card-text class="instructionsdetail">
                    {{ list.data.instructions }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
.body {
  background-image: url(@/assets/bg4.jpg);
  width: 100%;
  height: 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-position: top center;
  font-family: 'K2D', sans-serif;
  min-height: 710px;
}
.detial {
  margin-top: 2.5rem;
  margin-bottom: 4rem;
}
.texttitle {
  text-align: center;
  margin-top: 2rem;
  font-size: 32px;
}
.textsub {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.textsubdetial {
  margin-left: 6rem;
  margin-top: 1.5rem;
  font-size: 18px;
}
.titledetail {
  margin-left: 6rem;
  font-size: 22px;
}
.ingredientdetail {
  margin-left: 8rem;
  margin-right: 8rem;
  margin-bottom: 4rem;
  font-size: 18px;
}
.instructionsdetail {
  margin-left: 8rem;
  margin-right: 7rem;
  margin-top: 1rem;
  margin-bottom: 4rem;
  font-size: 18px;
  letter-spacing: 0.5px;
  word-spacing: 5px;
}
</style>
