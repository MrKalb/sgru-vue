<template>
    <div class="container">
        <transition name="fade">
            <div class="row">
                <div class="col-md-10">
                    <paginate name="contri" :list="contributions" :per="4">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>GRU</th>
                                    <th>Data</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody v-for="contribution in paginated('contri')" :key="contribution.id">
                                <tr>
                                    <td>{{contribution.gru}}</td>
                                    <td>{{new Date(contribution.date).toLocaleDateString()}}</td>
                                    <td>R$ {{contribution.value.toFixed(2)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </paginate>
                    <paginate-links class="nav nav-pills" for="contri" :show-step-links="true"></paginate-links>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class=" col-md-6 alert alert-danger" style="margin-top: 0.5em;" v-if="invalidInputs">
                <strong>CPF ou Matricula invalidos</strong>.
            </div>
            <div class=" col-md-6 alert alert-danger" style="margin-top: 0.5em;" v-if="error">
                <strong>Usuario não encontrado</strong>.
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                contributions: [],
                error: false,
                paginate: ['contri'],
                cpf: '',
                registrationNumber:''
            }
        },
        created() {
            this.getUserLogged();
        },
        methods: {
            getUserLogged() {
                this.$http.get('http://localhost:8088/user').then(response => {
                    console.log(response);
                    this.registrationNumber = response.body.name;
                    this.getUser();
                }, err => {
                    console.log(err);
                });
            },
            getUser() {
                let path = `http://localhost:8088/person?registrationNumber=${this.registrationNumber}`;
                this.$http.get(path).then(response => {
                    console.log(response);
                    this.cpf = response.body.cpf;
                    this.getDataCPF();

                }, err => {
                    console.log(err);
                })
            },
            getDataCPF() {
                let path = 'http://localhost:8088/contribution?cpf=' + this.cpf;
                this.$http.get(path).then(response => {
                    if(response.ok) {
                        this.contributions = response.body.reverse();
                    } 
                }, err =>{
                    console.log(err)
                });
            }
        }
    }
</script>