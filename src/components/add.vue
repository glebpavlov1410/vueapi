<template>
  <div id="app">
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
</template>

<script>
import family from '../services/family'

export default{
  data(){
    return{
    user: {
        id: null,
        name: "",
        surname: "",
        patronymic: "",
        birthday: ""
    }
    };
},
  methods:{
    saveUser(){
        var data={
            name: this.user.name,
            surname: this.user.surname,
            patronymic: this.user.patronymic,
            birthday: this.user.birthday,  
        };

        family.create(data)
        .then(response => {
        });

        this.user={};
    },
      },
}
</script>