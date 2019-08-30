<template>
    <div>
        <transition name="fade">
            <div v-if="sucess" class="alert alert-success" style="margin-top: 0.5em;">
                <strong>Agendamento cancelado com sucesso!</strong>.
            </div>
            <div v-if="error" class="alert alert-danger" style="margin-top:0.5em;">
                <strong>Muito tarde para cancelar agendamento.</strong>
            </div>
        </transition>
        <div class="modal" v-if="isShow"  aria-labelledby="cancelar agendamento" style="display:block !important">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cancelar Agendamento</h5>
                        <button type="button" class="close" @click="close" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Deseja realmente cancelar esse Agendamento ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="close">Não</button>
                        <button type="button" class="btn btn-primary" @click="ok">Sim</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
        </div>
        <paginate name="consum" :list="consumptions" :per="10">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Shift</th>
                        <th colspan="2">Ações</th>
                    </tr>
                </thead>
                <tbody v-for="consumption in paginated('consum')" :key="consumption.id">
                    <tr>
                        <td>{{new Date(consumption.date).toLocaleDateString()}}</td>
                        <td>{{consumption.shift}}</td>
                        <td>
                        <router-link tag="a" :to="{name: 'consumptionUserEdit', params:{ id: consumption.id } }">Editar</router-link>
                        </td>
                        <td @click="showModal(consumption)">
                            <a>Cancelar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </paginate>
        <paginate-links class="nav nav-pills" for="consum" :show-step-links="true"></paginate-links>
    </div>
</template>
<script>
    export default {

        data() {
            return {
                resource_url: 'http://localhost:8088/consumption',
                consumptions: [],
                paginate: ['consum'],
                sucess: false,
                error: false,
                consumptionToCancel: null,
                isShow: false
            }
        },
        created() {
            this.updateConsumption();
        },
        methods: {
            updateConsumption() {
                this.$http.get(this.resource_url).then(response => {
                    console.log(response.body);
                    this.consumptions = response.body;
                    this.consumptions = this.consumptions.reverse();
                    console.log(this.consumptions);
                }, err => {
                    console.log(err);
                })
            },
            showModal(consumption) {
                this.consumptionToCancel = consumption;
                this.isShow = true;
                console.log(this.isShow);
            },
            close() {
                this.isShow = false;
                this.consumptionToCancel = null;
            },
            ok() {
                console.log(this.consumptionToCancel);
                this.$http.delete('http://localhost:8088/consumption', {
                    body: JSON.stringify(this.consumptionToCancel)
                }).then(response => {
                    this.sucess = true;
                    this.updateConsumption();
                    this.consumptionToCancel = null;
                    this.isShow = false;
                }, err => {
                    this.error = true;
                    this.consumptionToCancel = null;
                    this.isShow = false;
                })
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