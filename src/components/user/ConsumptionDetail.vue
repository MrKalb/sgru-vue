<template>
    <div>
        <div class="row">
            <div class="col-sm-6 col-md-6 col-sm-offset-2 col-md-6" style="margin-left: 1em;">
                <router-link to="/consumos/listagem" class="btn-sm btn-primary ">Voltar</router-link>
                <h3 class="h3">Agendamento de refeições</h3>
                <transition name="fade">
                    <div v-if="sucess" class="alert alert-success" style="margin-top: 0.5em;">
                        <strong>Agendado com sucesso</strong>.
                    </div>
                    <div v-if="error" class="alert alert-danger" style="margin-top:0.5em;">
                        <strong>Erro com o agendamento, verifique os dados</strong>
                    </div>
                </transition>
                <v-date-picker mode='single' :formats='formats' v-model='consumption.data'>
                </v-date-picker>
                <form>
                    <select class="custom-select" v-model="consumption.shift" style="margin-top: 0.5em; margin-bottom:0.5em;">
                        <option disabled value="">Escolha um turno</option>
                        <option value="M">Almoco</option>
                        <option value="T">Lanche</option>
                        <option value="N">Janta</option>
                    </select>
                    <button @click.prevent="send" type="button" class="btn btn-xs btn-primary btn-block">Enviar</button>
                </form>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                consumption: {
                    id: 1,
                    data: null,
                    shift: ''
                },
                path: 'http://localhost:8088/consumption/' + this.$route.params.id,
                sucess: false,
                error: false
            }

        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                console.log(this.path);
                this.$http.get(this.path).then(response => {
                    this.consumption.id = response.body.id;
                    this.consumption.data =  new Date(response.body.date);
                    this.consumption.shift = response.body.shift;
                },err =>{
                    console.log(err);
                })
            },
             send() {
                if (this.$cookie.get('JSESSIONID')) {
                    this.$router.push('/login');
                }
                let data = {
                    id: this.consumption.id,
                    date: this.formatDate(),
                    shift: this.consumption.shift,
                    status: null
                };
                console.log(data);
                this.$http.put('http://localhost:8088/consumption', JSON.stringify(data))
                    .then(response => {
                        this.sucess = true;
                        setTimeout(function () {
                            this.sucess = false
                        }.bind(this), 3000);
                    }, err => {
                        this.error = true;
                        setTimeout(function () {
                            this.error = false
                        }.bind(this), 3000);
                        console.log(err);
                    });
            },
            formatDate() {
                if (this.consumption.data.getDate() < 10) {
                    return `${this.consumption.data.getFullYear()}-${this.consumption.data.getMonth() + 1}-0${this.consumption.data.getDate()}T00:00`
                } else {
                    return `${this.consumption.data.getFullYear()}-${this.consumption.data.getMonth() + 1}-${this.consumption.data.getDate()}T00:00`
                }
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