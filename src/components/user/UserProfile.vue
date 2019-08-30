<template>
<div class="card" style="width: 30em;">
  <div class="card-body">
    <h3 class="card-title">Olá <strong>{{person.name}}</strong></h3>
    <p class="card-text">Aqui você encontra algumas informações a respeito do seu cadastro</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Curso:</strong> {{this.person.course.description}}</li>
    <li class="list-group-item"><strong>CPF:</strong> {{person.cpf}}</li>
    <li class="list-group-item"><strong>Numero de matricula:</strong> {{person.registrationNumber}}</li>
    <li class="list-group-item"> <strong>Valor em sua carteira:</strong>  
       <animated-number :formatValue="formatNumber" :value="person.wallet.value"
                    :duration="2000" />
    </li>
  </ul>
  <div class="card-body">
    <a href="http://localhost:8088/logout" target="_blank" class="btn btn-primary">Logout</a>
  </div>
</div>
</template>
<script>
    import AnimatedNumber from "animated-number-vue";
    import Cookies from 'vue-cookie';
    import Vue from 'vue';
    export default {
        components: {
            AnimatedNumber
        },
    data(){
        return {
            person: {
                cpf: '',
                course:{
                    description:''
                },
                registrationNumber:'',
                wallet:{
                    value:0
                },
                name:''
            }
        }
    },
    created() {
        this.getUserLogged();
    },
    methods:{
        logout(){
            
           console.log(this.$cookies.keys());
        },
        formatNumber(){
            return `R$ ${this.person.wallet.value.toFixed(2)}`;
        },
        getUserLogged() {
            this.$http.get('http://localhost:8088/user').then(response =>{
                console.log(response);
                this.person.registrationNumber = response.body.name;
                this.getUser();
            }, err =>{
                console.log(err);
            });
        },
        getUser(){
            let path = `http://localhost:8088/person?registrationNumber=${this.person.registrationNumber}`;
            this.$http.get(path).then(response =>{
                console.log(response);
                this.person.cpf = response.body.cpf;
                this.person.course = response.body.course;
                this.person.registration = response.body.registrationNumber;
                this.person.wallet = response.body.wallet;
                this.person.name = response.body.name; 
            }, err => {
                console.log(err);
            }) 
        },
    }
}
</script>
<style scoped>
    * {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
    }

    * {
        font-size: 20px;

    }
</style>
