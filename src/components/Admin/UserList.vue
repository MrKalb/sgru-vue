<template>
    <div class="container">
        <transition name="fade">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="filter">Escolha entre CPF ou Numero de matricula para efetuar a pesquisa</label>
                        <select class="form-control" name="filter" id="filter" v-model="selected">
                            <option value="CPF">CPF</option>
                            <option value="Matricula">Matricula</option>
                        </select>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="row" v-if="showInput">
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="search">
                            Digite os dados para a pesquisa
                        </label>
                        <input maxlength="11" class="form-control" type="text" v-model="search" @keyup.enter="getPerson">
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="personFound">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Numero de matricula</th>
                            <th colspan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{person.name}}</td>
                            <td>{{person.registrationNumber}}</td>
                            <router-link tag="td" :to="{name: 'userEdit', params:{ id: person.id } }">Editar</router-link>
                            <router-link tag="td" :to="{name: 'adminContribution', params:{ id: person.id } }">Adicionar Contribuição</router-link>
                        </tr>
                    </tbody>
                </table>
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
                selected: '',
                search: '',
                showInput: false,
                person: {
                    id: 0,
                    name: '',
                    registrationNumber: ''
                },
                personFound: false,
                invalidInputs: false,
                error:false

            }
        },
        watch: {
            selected: function () {
                this.showInput = true;
            }
        },
        methods: {
            getPerson() {
                if(this.checkSelected()) {
                    if (this.selected === 'CPF') {
                        this.queryCPF();
                    } else if(this.selected === 'Matricula') {
                        this.queryMatricula();
                    }
                } else {
                   this.invalidInputs = true; 
                        setTimeout(function () {
                            this.invalidInputs = false
                        }.bind(this), 3000);
                }
            },
            checkSelected() {
                let re = new RegExp('[0-9]');
                return re.test(this.search);
            },
            queryCPF(){
                 let path = 'http://localhost:8088/person?cpf=' + this.search;
                        this.$http.get(path).then(response => {
                            this.person.id = response.body.id
                            this.person.name = response.body.name;
                            this.person.registrationNumber = response.body.registrationNumber;
                            this.personFound = true;

                        }, err => {
                            console.log(err);
                            this.error= true;
                        setTimeout(function () {
                            this.error = false
                        }.bind(this), 3000);});
            },
            queryMatricula(){
                let path = 'http://localhost:8088/person?registrationNumber=' + this.search;
                 this.$http.get(path).then(response => {
                    this.person.id = response.body.id
                    this.person.name = response.body.name;
                    this.person.registrationNumber = response.body.registrationNumber;
                    this.personFound = true;
                }, err =>{
                    console.log(err);
                    this.error= true;
                    setTimeout(function () {
                        this.error = false
                    }.bind(this), 3000);});
            }
        }
    }
</script>
<style scoped lang="css">
    .pagination {}

    .page-item {}

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to

    /*.fade-leave-active below version 2.1.8 */
        {
        opacity: 0;
    }
</style>