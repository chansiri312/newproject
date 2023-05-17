import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import RecipePageView from '../views/RecipePageView.vue'
import MyRecipe from '../components/MyRecipe.vue'
import AllRecipeView from '../views/AllRecipeView.vue' 
import dataManagement from '../components/layout/dataManagement.vue'
import historyData  from '../components/layout/historyData.vue' 
import historyDataPerson  from '../components/layout/historyDataPerson.vue'
import maternalReproduction  from '../components/layout/maternalReproduction.vue'
import receivingChemicals  from '../components/layout/receivingChemicals.vue'
import vaccine  from '../components/layout/vaccine.vue'
import treatment  from '../components/layout/treatment.vue'
import farmAccount from '../components/layout/farmAccount.vue'
import workman from '../components/layout/workman.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    }, 
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    }, 
    {
      path: '/recipe',
      name: 'recipe',
      component: RecipePageView
    },
    {
      path: '/dataManagement',
      name: 'dataManagement',
      component: dataManagement
    },
    {
      path: '/historyData',
      name: 'historyData',
      component: historyData
    }, 
    {
      path: '/historyDataPerson',
      name: 'historyDataPerson',
      component: historyDataPerson
    }, 
    {
      path: '/maternalReproduction',
      name: 'maternalReproduction',
      component: maternalReproduction
    }, 
    {
      path: '/receivingChemicals',
      name: 'receivingChemicals',
      component: receivingChemicals 
    }, 
    {
      path: '/vaccine',
      name: 'vaccine',
      component: vaccine 
    }, 
    {
      path: '/treatment',
      name: 'treatment',
      component: treatment 
    }, 
    {
      path: '/farmAccount',
      name: 'farmAccount',
      component: farmAccount  
    }, 
    {
      path: '/workman',
      name: 'workman',
      component: workman  
    }, 
    {
      path: '/myrecipe',
      name: 'myrecipe',
      component: MyRecipe
    },
    {
      path: '/allrecipeview/:id',
      name: 'allrecipeview',
      component: AllRecipeView
    },

  ]
})

export default router
