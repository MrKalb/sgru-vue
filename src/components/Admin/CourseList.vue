<template>
    <div class="container">
        <transition name="fade">
            <div class="row">
                <paginate name="cour" :list="courses" :per="7">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Nivel</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody v-for="course in paginated('cour')" :key="course.id">
                            <tr>
                                <td>{{course.description}}</td>
                                <td>{{course.level.description}}</td>
                                <router-link tag="td" :to="{name: 'courseEdit', params:{ id: course.id } }">Editar</router-link>
                            </tr>
                        </tbody>
                    </table>
                </paginate>
                <paginate-links class="nav nav-pills" for="cour" :show-step-links="true"></paginate-links>
            </div>
        </transition>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                courses: [],
                paginate: ['cour']
            }
        }, 
        created() {
            this.getGroups();
        },
        methods:{
            getGroups(){
                let path = 'http://localhost:8088/course';
                this.$http.get(path).then(response => {
                    this.courses = response.body;
                }, err => {
                    console.log(err);
                }) 
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