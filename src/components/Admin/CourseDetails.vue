<template>
    <div class="container">
        <div class="row">
            <div v-if="success" class="col-md-6 alert alert-success" style="margin-top: 0.5em;">
                <strong>Curso cadastrado com sucesso!</strong>.
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="description">Descrição</label>
                    <input class="form-control" type="text" id="description" v-model="course.description">
                    <label for="level">Nivel do curso</label>
                    <select class="form-control" name="niveis" id="level" v-model="course.level">
                        <option v-for="level in levels" :key="level.id" v-bind:value="level">
                            {{level.description}}
                        </option>
                    </select>
                    <label for="shift">Turno</label>
                    <select class="form-control" name="shift" id="shift" v-model="course.shift">
                        <option value="M">Manha</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                    </select>
                </div>
            </div>
        </div>
         <div class="row">
                <div class="col-md-6">
                    <button @click="send" class="btn btn-primary btn-block">Salvar</button>
                </div>
            </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                course: {
                    description: '',
                    level: null,
                    shift: ''
                },
                levels: [],
                success:false
            }
        },
        created() {
            this.getLevels();
            this.findCourse();
        },
        methods: {
            getLevels() {
                this.$http.get('http://localhost:8088/level').then(response => {
                    this.levels = response.body;
                }, err => {
                    console.log(err);
                });
            },
            send() {
                this.$http.post('http://localhost:8088/course', JSON.stringify(this.course)).then(response => {
                    this.success = true;
                    setTimeout(function () {
                        this.invalidCPF = false
                    }.bind(this), 3000);
                }, err =>{
                    console.log(err);
                })
            },
            findCourse(){
                let path = 'http://localhost:8088/course/' + this.$route.params.id;
                this.$http.get(path).then(response => {
                    this.course.description = response.body.description;
                    this.course.level = response.body.level;
                    this.course.shift = response.body.shift;
                })
            }
        }
    }
</script>