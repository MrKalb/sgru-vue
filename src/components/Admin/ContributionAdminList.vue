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
                        <input maxlength="11" class="form-control" type="text" v-model="search" @keyup.enter="getData">
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="personFound" class="row">
                <div class="col-md-10">
                <paginate name="contri" :list="contributions" :per="4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Numero de matricula</th>
                                <th>GRU</th>
                                <th>Data</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody v-for="contribution in paginated('contri')" :key="contribution.id">
                            <tr>
                                <td>{{contribution.person.name}}</td>
                                <td>{{contribution.person.registrationNumber}}</td>
                                <td>{{contribution.gru}}</td>
                                <td>{{new Date(contribution.date).toLocaleDateString()}}</td>
                                <td>R$ {{contribution.value}}</td>
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
                selected: '',
                search: '',
                showInput: false,
                personFound: false,
                invalidInputs: false,
                error: false,
                paginate: ['contri'],
            }
        },
        watch: {
            selected: function () {
                this.showInput = true;
            }
        },
        methods: {
            getDataCPF() {
                let path = 'http://localhost:8088/contribution?cpf=' + this.search;
                this.$http.get(path).then(response => {
                    if(response.ok) {
                        this.contributions = response.body.reverse();
                        this.personFound = true;
                    } else {
                        this.error = true;
                        setTimeout(function () {
                        this.error = false
                    }.bind(this), 3000);
                    }
                }, err =>{
                    console.log(err)
                    this.error = true;
                        setTimeout(function () {
                        this.error = false
                    }.bind(this), 3000);
                });
            },
            getDataRegistration(){
                let path = 'http://localhost:8088/contribution?registration=' + this.search;
                this.$http.get(path).then(response => {
                    if(response.ok) {
                        this.contributions = response.body.reverse();
                        this.personFound = true;
                    } else {
                        this.error = true;
                        setTimeout(function () {
                        this.error = false
                    }.bind(this), 3000);
                    }
                    
                }, err =>{
                    console.log(err);
                    this.error = true;
                        setTimeout(function () {
                        this.error = false
                    }.bind(this), 3000);

                });
            },
            getData(){
                if(this.selected === 'CPF') {
                    this.getDataCPF();
                } else if( this.select === 'Matricula') {
                    this.getDataRegistration();
                } else {
                    this.invalidInputs = true; 
                }
            }
        }
    }
</script>