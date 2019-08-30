<template>
    <div>
        <h3 class="h3">Adição de contribuições para, {{contribution.person.name}}</h3>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <transition name="fade">
                        <div v-if="success" class=" col-md-6 alert alert-success" style="margin-top: 0.5em;">
                            <strong>Contribuição Salva com sucesso!</strong>.
                        </div>
                        <div v-if="error" class=" col-md-6 alert alert-danger" style="margin-top: 0.5em;">
                            <strong>Problema ao salvar, verifique seus dados!</strong>.
                        </div>
                    </transition>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="date">Selecione a data da GRU</label>
                        <v-date-picker id="date" mode='single' v-model='selectedValue'></v-date-picker>
                        <label for="GRU">Codigo da GRU</label>
                        <input class="form-control" type="text" id="GRU" v-model="contribution.gru">
                        <label for="money">Valor em R$</label>
                        <input type="number" class="form-control" id="money" v-model="contribution.value">
                        <label for="Pago">GRU Paga</label>
                        <input type="checkbox" v-model="paid">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <button class="btn btn-primary" @click="send">Enviar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                contribution: {
                    date: null,
                    gru: '',
                    value: 0,
                    paymentStatus: '',
                    person: null
                },
                paid: false,
                selectedValue: new Date(),
                success: false,
                error: false
            }
        },
        created() {
            this.getUser();
        },
        methods: {
            getUser() {
                let path = 'http://localhost:8088/person/' + this.$route.params.id;
                this.$http.get(path).then(response => {
                    if (response.ok) {
                        this.contribution.person = response.body;
                    }
                }, err => {
                    console.log(err);

                })
            },
            send() {
                this.contribution.date = this.formatDate();
                this.formatStatus();
                console.log(this.paid);
                console.log(this.contribution);
                this.$http.post('http://localhost:8088/contribution', JSON.stringify(this.contribution)).then(response => {
                    console.log(response);
                    if (response.ok) {
                        this.success = true;
                        setTimeout(function () {
                            this.success = false
                        }.bind(this), 3000);
                    } else {
                        this.error = true
                        setTimeout(function () {
                            this.error = false
                        }.bind(this), 3000);
                    }
                }, err => {
                    console.log(err);
                    setTimeout(function () {
                        this.error = false
                    }.bind(this), 3000);
                });
            },
            formatStatus() {
                if (this.paid) {
                    this.contribution.paymentStatus = 'S';
                } else {
                    this.contribution.paymentStatus = 'N';
                }
            },
            formatDate() {
                if (this.selectedValue.getDate() < 10) {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-0${this.selectedValue.getDate()}T00:00`
                } else {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-${this.selectedValue.getDate()}T00:00`
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