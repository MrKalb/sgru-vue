<template>
    <div class="container">
        <transition name="fade">
            <div class="row">
                <paginate name="grs" :list="groups" :per="7">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody v-for="group in paginated('grs')" :key="group.id">
                            <tr>
                                <td>{{group.description}}</td>
                                <td>{{group.value}}</td>
                                <td>{{group.status}}</td>
                                <router-link tag="td" :to="{name: 'groupEdit', params:{ id: group.id } }">Editar</router-link>
                            </tr>
                        </tbody>
                    </table>
                </paginate>
                <paginate-links class="nav nav-pills" for="grs" :show-step-links="true"></paginate-links>
            </div>
        </transition>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                groups: [],
                paginate: ['grs']
            }
        }, 
        created() {
            this.getGroups();
        },
        methods:{
            getGroups(){
                let path = 'http://localhost:8088/group?=active' + 'false';
                this.$http.get(path).then(response => {
                    this.groups = response.body;
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