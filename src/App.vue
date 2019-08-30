<template>
    <div>
        <div class="container">
            <link rel='stylesheet' href='https://unpkg.com/v-calendar/lib/v-calendar.min.css'>

            <div class="row" style="margin:auto;">
                <h1>SGRU</h1>
                <hr>
                <div class="col-md-9">
                    <router-view name="header-top"></router-view>
                    <transition name="slide" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Headers/Header.vue'
    export default {
        components: {
            appHeader: Header,
        }
    }
</script>

<style>
    .slide-leave-active {
        transition: opacity 1s ease;
        opacity: 0;
        animation: slide-out 1s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }

        100% {
            transform: translateY(0);
        }
    }
</style>