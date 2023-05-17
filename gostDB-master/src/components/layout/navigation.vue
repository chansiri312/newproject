<template>
  <v-navigation-drawer permanent location="left" color="#DCEDC8">
    <v-divider></v-divider>
    <div class="text">
      <v-list density="compact" nav>
        <v-list-item title="" value="recipe" to="/recipe">Dashboard</v-list-item>

        <v-list-group value="แบบบันทึกข้อมูลประจำฟาร์ม">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="แบบบันทึกข้อมูลประจำฟาร์ม"></v-list-item>
          </template>
          <v-list-item v-for="([title, link], i) in admins" :key="i" :title="title" :to="link"
            :value="title"></v-list-item>
        </v-list-group>

        <v-list-item title="" value="myrecipe" to="/myrecipe">ภาพรวมของฟาร์ม</v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
const admins = ref([
  ['แบบบันทึกข้อมูลทะเบียนประวัติแพะนม', '/dataManagement'],
  ['แบบบันทึกข้อมูลประวัติการให้ผลผลิต', '/historyData'],
  ['แบบบันทึกข้อมูลประวัติการให้ผลผลิต(รายตัว)', '/historyDataPerson'],
  ['แบบบันทึกข้อมูลการสืบพันธุ์ของแม่พันธุ์', '/maternalReproduction'],
  ['แบบบันทึกข้อมูลการการรับ-จ่ายเวชภัณฑ์และสารเคมี', '/receivingChemicals'],
  ['แบบบันทึกข้อมูลการใช้วัคซีน-การถ่ายพยาธิ(ทั้งฝูง)', '/vaccine'],
  ['แบบบันทึกข้อมูลการรักษาโรค', '/treatment'],
  ['แบบบันทึกข้อมูลบัญชีฟาร์ม', '/farmAccount'],
  ['แบบบันทึกประวัติบุคลากร', '/workman'],
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=K2D:wght@100&display=swap');

.text {
  font-family: 'K2D', sans-serif;
}
</style>
