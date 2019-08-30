import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Header from './components/Headers/Header.vue';
import HeaderUser from './components/Headers/HeaderUser.vue';
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import Consumos from './components/user/Consumption.vue';
import ContributionHome from './components/user/ContributionHome.vue';
import ConsumptionHeader from './components/Headers/ConsumptionHeader.vue';
import ConsumptionHome from './components/user/ConsumptionHome.vue';
import ConsumptionList from './components/user/ConsumptionList.vue';
import ConsumptionDetail from './components/user/ConsumptionDetail.vue';
import ContributionHeader from './components/Headers/ContributionHeader.vue';
import ContribuitionGru from './components/user/ContributionGRU.vue';
import Users from './components/Admin/User.vue';
import HeaderAdmin from './components/Headers/HeaderAdmin.vue';
import UserHome from './components/Admin/UserHome.vue';
import UserHeader from './components/Headers/UserHeader.vue';
import ConsumptionAdmin from './components/Admin/ConsumptionAdmin.vue';
import UserList from './components/Admin/UserList.vue';
import UserDetails from './components/Admin/UserDetails.vue';
import ContribuitionAdmin from './components/Admin/ContributionAdmin.vue';
import ContributionList from './components/Admin/ContributionAdminList.vue';
import ContributionAdminHeader from './components/Headers/ContributionAdminHeader.vue';
import ContributionTotal from './components/Admin/ContributionAdminAll.vue';
import GroupsHeader from './components/Headers/GroupsHeader.vue';
import Groups from './components/Admin/Groups.vue';
import GroupsList from './components/Admin/GroupList.vue';
import GroupDetails from './components/Admin/GroupDetails.vue';
import Course from './components/Admin/Course.vue';
import CourseHeader from './components/Headers/CourseHeader.vue';
import CourseList from './components/Admin/CourseList.vue';
import CourseDetails from './components/Admin/CourseDetails.vue';
import UserProfile from './components/user/UserProfile.vue';
import ContributionUserList from './components/user/ContributionUser.vue';

export const routes = [
{ path: '', components:{
    default: Home,
    'header-top': Header
}},
{path:'/login', components: {
    default: Login, 
    'header-top': Header
} },
/*{path:'/consumos', components: {
    default: Consumos,
    'header-top': HeaderUser}
},*/
{path:'/usuarios', components:{
    default: UserProfile,
    'header-top': HeaderUser
}},
{path: '/consumos',components:{
    default: ConsumptionHome,
    'header-top': HeaderUser,
},children: [
    {path: '', component: ConsumptionHeader},
    {path:'agendamento', component: Consumos},
    {path:'listagem', component: ConsumptionList},
    {path:':id/edit', component: ConsumptionDetail, name:'consumptionUserEdit',}
]},
{path: '/contribuicoes', components:{
 default: ContributionHome,
'header-top': HeaderUser
}, children: [
    {path: '', component: ContributionHeader},
    {path: 'gru', component: ContribuitionGru},
    {path:'listagem',component: ContributionUserList}
]},
{path: '/admin/usuarios', components: {
    default: UserHome,
    'header-top': HeaderAdmin
}, children: [
    {path:'cadastro', component:Users},
    {path:'', component: UserHeader},
    {path:'consumos', component: ConsumptionAdmin},
    {path:'search', component: UserList},
    {path: ':id/user', component: UserDetails, name:'userEdit'},
    {path: ':id/contribuicao', component: ContribuitionAdmin, name: 'adminContribution'},
    {path: 'contribuicoes', component: ContributionAdminHeader},
    {path:'contribuicoes/list', component:ContributionList},
    {path: 'contribuicoes/total',component:ContributionTotal},
    {path: 'grupos', component: GroupsHeader},
    {path: 'grupos/cadastro', component: Groups},
    {path: 'grupos/listagem', component: GroupsList},
    {path: ':id/group', component:GroupDetails, name:'groupEdit'},
    {path: 'cursos', component: CourseHeader },
    {path: 'cursos/cadastro', component: Course},
    {path: 'cursos/listagem', component: CourseList},
    {path: ':id/cursos', component:CourseDetails, name:'courseEdit'}]}
];