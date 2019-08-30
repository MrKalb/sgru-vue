<template>
    <div class="wrapper">
        <h2 class="form-signin-heading">Por favor faça o login</h2>
        <input type="text" class="form-control" v-model="userDetail.login" name="username" placeholder="Email Address"
            required="" autofocus="" />
        <input type="password" v-model="userDetail.password" class="form-control" name="password" placeholder="Password"
            required="" />
        <button class="btn btn-lg btn-primary btn-block" @click.prevent="doLogin" type="submit">Enviar</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userDetail: {
                    login: '',
                    password: ''
                }
            }
        },
        methods: {
            doLogin() {
                let encodeString = 'Basic ' + btoa(this.userDetail.login + ':' + this.userDetail.password);
                console.log(encodeString);
                this.$http.get('http://localhost:8088/user',{headers:{
                    'Authorization': encodeString
                }})
                    .then(response => {
                        console.log(response);
                        this.checkCredentials(response);
                    }, err => {
                        console.log(err);
                    });
            },
            checkCredentials(response){
                response.body.authorities.forEach(auth => {
                    console.log(auth);
                    if(auth.authority === 'ROLE_MANAGERS') {
                        this.$router.push('/admin/usuarios');
                    } else {
                        this.$router.push('/consumos');
                    }
                });
            }
        }
    }
</script>