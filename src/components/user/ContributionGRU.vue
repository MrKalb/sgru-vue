<template>
    <div>
        <form class="form-control">
        <input type="text" v-model="dadosPessoa.valorTotal" placeholder="Digite o valor desejado">
        <input type="radio" id="servidor" value="servidor" v-model="dadosPessoa.soa"> Aluno
        <input type="radio" id="servidor" value="aluno" v-model="dadosPessoa.soa"> Servidor
        <button @click.prevent="getUser" type="submit">Gerar GRU</button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dadosPessoa: {
                    nome: '',
                    cpf: '',
                    tipo: 'pf',
                    soa: '',
                    valorTotal: 0.00
                },
                registrationNumber:''
            }
        },
        methods:{
            getUser() {
                this.$http.get('http://localhost:8088/user').then(response => {
                    console.log(response);
                    this.registrationNumber = response.body.name;
                    this.getRegistrationNumber();
                }, err =>{
                    console.log(err);
                }); 

            },
            getRegistrationNumber(){
                let path = 'http://localhost:8088/person/?registrationNumber=' + this.registrationNumber;
                this.$http.get(path).then(response => {
                    console.log(response);
                    this.dadosPessoa.nome = response.body.name; 
                    this.dadosPessoa.cpf = response.body.cpf; 
                     console.log(this.dadosPessoa);
                    this.sendGRU();
                }, err => {
                    console.log(err);
                });
            },
            sendGRU(){
                this.$http.post('http://gru.sertao.ifrs.edu.br/index.php',{ 
                headers: { 'Origin': 'http://gru.sertao.ifrs.edu.br'}}, 
                JSON.stringify(this.dadosPessoa)).then(response => {
                    console.log(response);
                }, err => {
                    console.log(err);
                });
            }
        }
    }
</script>