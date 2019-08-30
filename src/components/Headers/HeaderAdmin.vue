<template>
    <ul class="nav nav-pills">
       <router-link to="/admin/usuarios/consumos" tag="li" active-class="active" exact-active-class=""><a>Consumos</a></router-link>
       <router-link to="/admin/usuarios" tag="li"><a>Usuarios</a></router-link>
       <router-link to="/admin/usuarios/contribuicoes" tag="li"><a>Contribuicoes</a></router-link>
       <router-link to="/admin/usuarios/grupos" tag="li"><a>Grupos</a></router-link>
       <router-link to="/admin/usuarios/cursos" tag="li"><a>Cursos</a></router-link>
       <li style="margin-left: 10em;"><a href="http://localhost:8088/logout">Logout</a></li>
    </ul>
</template>
