<template>
  <div id="app">
    <div v-if="isEdit===false">
      <input v-model="search"/>
    <button @click="searchUser">Search</button>
    <ul>
        <li v-for="(familyMember, index) in familyMembers" :key="index">
       <button class="btn btn-transparent border-0" @click="showerData(index)"> {{ familyMember.name }} {{ familyMember.surname }}</button>
        </li>
    </ul>
    <div class="position-relative">
  <div class="position-absolute top-0 start-50 translate-middle">
    {{showData!='' ? showData.name : ''}} <br>
     {{showData!='' ? showData.surname : ''}} <br>
     {{showData!='' ? showData.patronymic : ''}} <br>
      {{ showData!='' ? showData.birthday.substring(0, 10).split('-').reverse().join('.'):'' }} <br>
      <button v-if="showData!=''" type="button" class="btn btn-danger" @click="deleteUser(index)">Delete</button>
      <button v-if="showData!=''" type="button" class="btn btn-info" @click="isEditer">Edit</button>  
    </div>
  </div>
  <p>Сегодня день рождения у:</p>
  <ul>
        <li v-for="(getBirthday, index) in getBirthdays" :key="index">
        {{ getBirthday.name }} {{ getBirthday.surname}}
        </li>
    </ul>
</div>

    <div v-if="isEdit===true">
        <label>Имя</label><br>
        <input v-model="user.name"/><br><br>
        <label>Фамилия</label><br>
        <input v-model="user.surname"/><br><br>
        <label>Отчество</label><br>
        <input v-model="user.patronymic"/><br><br>
        <label>День рождения</label><br>
        <input type="date" v-model="user.birthday"/><br><br>
        <button @click="saveUser">Сохранить</button>
    </div>
</div>
</template>

<script> 
import family from '../services/family'

export default{
  data(){
    return{
      familyMembers: [],
      showData: '',
      isEdit: false,
      search: '',
      user: {
        id: null,
        name: "",
        surname: "",
        patronymic: "",
        birthday: ""
    }
    };
  },
  computed:{
    getBirthdays(){
        //return this.familyMembers; //filter(b => String(b.birthday.substring(8, 10))==String(new Date().getDate()));
      return this.familyMembers.filter(b => new Date(b.birthday).getDate()==new Date().getDate() && new Date(b.birthday).getMonth()==new Date().getMonth());
        }
  },
  methods:{
        getFamilyMembers(){
            family.getAll().
            then(response=>{
                response.data.map(r => {r.name;r.surname;r.patronymic;new Date(r.birthday).getDate()+1});
                this.familyMembers=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        showerData(index){
          this.showData=this.familyMembers[index];
        },
        deleteUser(index){
          family.delete(this.showData.id).
            then(response => {
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
            setTimeout(() => this.getFamilyMembers(), 150);
        },
        isEditer(){
         this.isEdit=true;
         this.user.name=this.showData.name;
         this.user.surname=this.showData.surname;
         this.user.patronymic=this.showData.patronymic;
         this.user.birthday=this.showData.birthday.substring(0, 10);
        },
        saveUser(){
          var data={
            name: this.user.name,
            surname: this.user.surname,
            patronymic: this.user.patronymic,
            birthday: this.user.birthday,  
        };

        family.update(this.showData.id, data)
        .then(response => {
        });
        this.isEdit=false;
      
        setTimeout(() => this.getFamilyMembers(), 150);
        },
        searchUser(){
          this.getFamilyMembers(); 
          setTimeout(() => this.familyMembers=this.familyMembers.filter(f => f.name.toLowerCase().includes(this.search.toLowerCase())
          || f.surname.toLowerCase().includes(this.search.toLowerCase())), 80);
        }
      },
      mounted(){
        this.getFamilyMembers();
    }
}
</script>