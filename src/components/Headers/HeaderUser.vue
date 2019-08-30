<template>
    <ul class="nav nav-pills">
       <router-link to="/contribuicoes" tag="li" active-class="active" exact-active-class=""><a>Contribuições</a></router-link>
       <router-link to="/consumos" tag="li" active-class="active"><a>Consumos</a></router-link>
       <router-link to="/usuarios" tag="li" active-class="active" exact-active-class=""><a>Usuario</a></router-link>
    </ul>
</template>
<script>
export default {
    data(){
        return {
            person: {
                name:''
            },
            registration: ''
        }
    }, 
    methods:{
        getUserLogged() {
            this.$http.get('http://localhost:8088/user').then(response =>{
                console.log(response);
                this.registration = response.body.name;
            }, err =>{
                console.log(err);
            });
            this.getUser();
        },
        getUser(){
            let path = 'http://localhost:8088/person?matricula=' + this.registration;
            this.$http.get(path).then(response =>{
                this.person = response.body;
            }, err => {
                console.log(err);
            }) 
        }
    }
}
</script>
