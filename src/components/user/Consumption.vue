<template>
    <div class="row">
        <div class="col-sm-9 col-md-6 col-sm-offset-2 col-md-6" style="margin-left: 1em;">
            <router-link to="/consumos" class="btn-sm btn-primary ">Voltar</router-link>
            <h3 class="h3">Agendamento de refeições</h3>
            <transition name="fade">
                <div v-if="sucess" class="alert alert-success" style="margin-top: 0.5em;">
                    <strong>Agendado com sucesso</strong>.
                </div>
                <div v-if ="error" class="alert alert-danger" style ="margin-top:0.5em;" >
                    <strong>Erro com o agendamento, verifique os dados</strong>
                </div>
            </transition>
            <v-date-picker mode='single' :min-date='new Date(selectedValue)' :formats='formats' v-model='selectedValue'>
            </v-date-picker>
            <form>
                <select class="form-control" v-model="shift" style="margin-top: 0.5em; margin-bottom:0.5em;">
                    <option disabled value="">Escolha um turno</option>
                    <option>Almoco</option>
                    <option>Lanche</option>
                    <option>Janta</option>
                </select>
                <button @click.prevent="send" type="button" class="btn btn-primary btn-block">Enviar</button>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selectedValue: new Date(),
                shift: '',
                formats: {
                    title: 'MMMM YYYY',
                    weekdays: 'W',
                    navMonths: 'MMM',
                    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'], // Only for `v-date-picker`
                    dayPopover: 'L', // Only for `v-date-picker`
                    data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'] // For attribute dates
                },
                sucess: false,
                error: false,
            }
        },
        mounted() {
            this.selectedValue.setDate(this.selectedValue.getDate() + 1);
        },
        methods: {
            send() {
                if (this.$cookie.get('JSESSIONID')) {
                    this.$router.push('/login');
                }
                this.formatShift();
                let data = {
                    date: this.formatDate(),
                    shift: this.shift,
                    status: null
                };
                console.log(data);
                this.$http.post('http://localhost:8088/consumption', JSON.stringify(data))
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
                if (this.selectedValue.getDate() < 10) {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-0${this.selectedValue.getDate()}T00:00`
                } else {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-${this.selectedValue.getDate()}T00:00`
                }
            },
            formatShift() {
                if (this.shift === 'Almoco') {
                    this.shift = 'M';
                } else if (this.shift === 'Lanche') {
                    this.shift = 'T';
                } else {
                    this.shift = 'N';
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