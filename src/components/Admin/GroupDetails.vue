<template>
    <div class="container">
        <div class="row">
        <transition name="fade">
            <div v-if="success" class=" col-md-6 alert alert-success" style="margin-top: 0.5em;">
                <strong>Grupos salva com sucesso!</strong>.
            </div>
            <div v-if="error" class=" col-md-6 alert alert-danger" style="margin-top: 0.5em;">
                <strong>Problema ao salva grupo, verifique seus dados!</strong>.
            </div>
        </transition>
        </div>
        <div class="row">
            <h3>Cadastro de grupos</h3>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="description">Descrição</label>
                    <input class="form-control" type="text" id="description" v-model="group.description">
                    <label for="active">Ativo</label>
                    <input type="checkbox" id="active" v-model="active">
                    <br>
                    <label for="value">Valor do grupo</label>
                    <input min="0" id="value" class="form-control" type="number" v-model="group.value">
                    <button class="btn btn-primary" @click="checkValue">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                group: {
                    description: '',
                    status: '',
                    value: 0
                },
                active: false,
                success: false,
                error: false,
                invalidInput: false
            }
        },
        created() {
            this.getGroup();
        },
        methods: {
            checkStatus() {
                if (active) {
                    this.group.status = 'A';
                } else {
                    this.group.status = 'I';
                }
            },
            send() {
                this.checkStatus();
                this.$http.post('http://localhost:8088/group', JSON.stringify(this.group)).then(response => {
                    if (response.ok) {
                        this.success = true;
                        setTimeout(function () {
                            this.success = false
                        }.bind(this), 3000);
                    } else {
                        this.error = true;
                        setTimeout(function () {
                            this.error = false
                        }.bind(this), 3000);
                    }
                }, err => {
                    this.error = true;
                    setTimeout(function () {
                        this.error = false
                    }.bind(this), 3000);
                });
            },
            checkValue() {
                if (this.group.value < 0) {
                    this.invalidInput = true;
                    setTimeout(function () {
                        this.invalidInput = false
                    }.bind(this), 3000);
                } else {
                    this.send();
                }
            },
            getGroup(){
                let path = 'http://localhost:8088/group/' + this.$route.params.id;
                this.$http.get(path).then(response =>{
                    this.group.description = response.body.description;
                    if(response.body.status === 'A') {
                        this.active = true; 
                    } else {
                        this.active = false;
                    }
                    this.group.value = response.body.value;
                }, err =>{
                    console.log(err); 
                });
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