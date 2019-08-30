<template>
    <div>
        <h3 class="h3 align-center">Cadastro de Usuarios</h3>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="CPF"> Digite o CPF</label>
                        <input id="CPF" class="form-control" v-model="strCPF" @keyup.enter="checkCPF" maxlength="11">
                    </div>
                </div>
            </div>
            <transition name="fade">
                <div class="row">
                    <div v-if="userFound" class=" col-md-6 alert alert-danger" style="margin-top: 0.5em;">
                        <strong>Usuario já cadastrado</strong>.
                    </div>
                    <div v-if="invalidCPF" class="col-md-6 alert alert-danger" style="margin-top: 0.5em;">
                        <strong>CPF Invalido</strong>.
                    </div>
                    <div v-if="userFound" class="col-md-6 alert alert-danger" style="margin-top: 0.5em;">
                        <strong>OPS, houve um problema, verifique os dados</strong>.
                    </div>
                    <div v-if="sucess" class="col-md-6 alert alert-success" style="margin-top: 0.5em;">
                        <strong>Usuario cadastrado com sucesso!</strong>.
                    </div>
                </div>
            </transition>
            <div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="name">Nome completo</label>
                            <input class="form-control" id="name" v-model="person.name">
                            <label for="birthDay">Data de nascimento</label>
                            <v-date-picker id="birthDay" mode='single' v-model='selectedValue'>
                            </v-date-picker>
                            <label for="phone">Telefone</label>
                            <input id="phone" class="form-control" v-model="person.phone">
                            <label for="email">Email</label>
                            <input id="email" v-model="person.email" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <div>
                                <label for="active">Ativo</label>
                                <input type="checkbox" id="active" v-model="checked">
                            </div>
                            <div class="form-group" style="margin-bottom: 10px;">
                                <label style="margin-top:0.4em;" for="group">Grupo de pagamento</label>
                                <select class="form-control" name="Grupos" id="group" v-model="person.group">
                                    <option v-for="group in groups" :key="group.id" v-bind:value="group">
                                        {{group.description}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 10px;">
                                <label style="margin-top:0.4em;" for="group">Curso</label>
                                <select class="form-control" name="cursos" id="curso" v-model="person.course">
                                    <option v-for="course in courses" :key="course.id" v-bind:value="course">
                                        {{course.description}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="city">Cidade</label>
                                <br>
                                <select class="form-control" name="city" id="city" v-model="person.city">
                                    <option v-for="city in cities" :key="city.id" v-bind:value="city">
                                        {{city.description}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="registrationNumber">Numero de matricula</label>
                                <input type="text" class="form-control" v-model="person.registrationNumber">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button @click="send" class="btn btn-primary btn-block">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                strCPF: '',
                personFound: null,
                userFound: false,
                invalidData: false,
                invalidCPF: false,
                selectedValue: new Date(),
                person: {
                    id: 0,
                    name: '',
                    phone: '',
                    email: '',
                    status: '',
                    age: '',
                    cpf: '',
                    course: null,
                    group: null,
                    city: null,
                    registrationNumber: ''
                },
                groups: null,
                cities: null,
                notChecked: false,
                checked: false,
                sucess: false,
                courses: null
            }
        },
        created() {
            this.findGroups();
            this.findCities();
            this.getUser();
            this.getCourse();
        },
        methods: {
            getUser() {
                let path = 'http://localhost:8088/person/' + this.$route.params.id;
                this.$http.get(path).then(response => {
                    this.person.id = response.body.id;
                    this.person.name = response.body.name;
                    this.person.phone = response.body.phone;
                    this.person.email = response.body.email;
                    if (response.body.status === 'A') {
                        this.checked = true;
                    } else {
                        this.notChecked = true;
                    }
                    console.log(response);
                    if (response.body.birthDay != null) {
                        this.selectedValue = new Date(response.body.age);
                    }
                    this.strCPF = response.body.cpf;
                    this.person.group = response.body.group;
                    this.person.city = response.body.city;
                    this.person.registrationNumber = response.body.registrationNumber;
                }, err => {
                    console.log(err);
                });
            },
            checkCPF() {
                let validCPF = this.testCPF(this.strCPF);
                if (validCPF) {
                    this.queryPerson();
                    console.log(this.personFound);
                    if (this.personFound) {
                        this.userFound = false;
                        this.invalidData = false;
                        this.isValid = true;
                    } else {
                        this.userFound = true;
                        setTimeout(function () {
                            this.userFound = false
                        }.bind(this), 3000);
                    }
                } else {
                    this.invalidCPF = true;
                    setTimeout(function () {
                        this.invalidCPF = false
                    }.bind(this), 3000);
                }
            },
            formatDate() {
                if (this.selectedValue.getDate() < 10) {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-0${this.selectedValue.getDate()}T00:00`
                } else {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-${this.selectedValue.getDate()}T00:00`
                }
            },
            testCPF(strCPF) {
                var sum;
                var rest;
                sum = 0;
                if (strCPF == "00000000000") return false;

                for (let i = 1; i <= 9; i++)
                    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
                rest = (sum * 10) % 11;

                if ((rest == 10) || (rest == 11)) rest = 0;
                if (rest != parseInt(strCPF.substring(9, 10))) return false;

                sum = 0;
                for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
                rest = (sum * 10) % 11;

                if ((rest == 10) || (rest == 11)) rest = 0;
                if (rest != parseInt(strCPF.substring(10, 11))) return false;
                return true;
            },
            send() {
                this.person.age = this.formatDate();
                this.person.cpf = this.strCPF;
                this.checkStatus();
                console.log(this.person);
                this.$http.put('http://localhost:8088/person', JSON.stringify(this.person)).then(response => {
                    this.isValid = false;
                    this.sucess = true;
                    setTimeout(function () {
                        this.sucess = false
                    }.bind(this), 3000);
                }, err => {
                    console.log(err);
                })

            },
            checkStatus() {
                if (this.checked) {
                    this.person.status = 'A';
                } else {
                    this.person.status = 'I';
                }
            },
            queryPerson() {
                let path = 'http://localhost:8088/person?cpf=' + this.strCPF;
                this.$http.get(path).then(response => {
                    console.log(response)
                    this.personFound = response.body;
                }, err => {
                    console.log(err);
                    this.personFound = null;
                });
            },
            getCourse() {
                this.$http.get('http://localhost:8088/course').then(response => {
                    this.courses = response.body;
                    console.log(response);
                }, err => {
                    console.log(err);
                })
            },
            findGroups() {
                this.$http.get('http://localhost:8088/group').then(response => {
                    console.log('Grupos ');
                    console.log(response);
                    this.groups = response.body;
                }, err => {
                    console.log(err);
                });
            },
            findCities() {
                this.$http.get('http://localhost:8088/city').then(response => {
                    console.log('Cidades');
                    console.log(response);
                    this.cities = response.body;
                }, err => {
                    console.log(err);
                });
            }
        }
    }
</script>
<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to

    /* .fade-leave-active below version 2.1.8 */
        {
        opacity: 0;
    }
</style>