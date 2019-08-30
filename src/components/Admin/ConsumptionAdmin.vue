<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h3 class="h3 text-center" style="margin-bottom:0.5em;">Agendamentos</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label for="consumptionToday">Agendamentos para o dia de hoje</label>
                <animated-number id="consumptionToday" :formatValue="formatNumber" :value="consumptionToday" :duration="200" />
            </div>
            <div class="col-md-2">
                <label for="consumptionTomorrow">Agendamentos para amanha</label>
                <animated-number  id="consumptionTomorrow" :formatValue="formatNumber" :value="consumptionTomorrow" :duration="200" />
            </div>
            <div class="col-md-2">
                <label for="consumptionAll">Todos agendamentos! </label>
                <animated-number id="consumptionAll" :formatValue="formatNumber" :value="consumptionTotal" :duration="2000" />
            </div>
        </div>
    </div>
</template>


<script>
    import AnimatedNumber from "animated-number-vue";
    export default {
        components: {
            AnimatedNumber
        },
        data() {
            return {
                consumptionToday: 0,
                consumptionTomorrow: 0,
                consumptionTotal: 0,
                selectedValue: new Date(),

            }
        },
        mounted() {
            this.findConsumptionToday();
            this.findConsumptionTomorrow();
            this.findConsumptionAllTheTime();
        },
        methods: {
            findConsumptionToday() {
                //"/consumption/all"
                let path = 'http://localhost:8088/consumption/day?data=' + this.formatDate();
                this.$http.get(path).then(response => {
                    console.log(response);
                    this.consumptionToday = response.body.length;
                    this.consumptionToday.toFixed(2);
                })
            },
            findConsumptionTomorrow() {
                let path = 'http://localhost:8088/consumption/day?data=' + this.formatDateTomorrow();
                this.$http.get(path).then(response => {
                    console.log(response);
                    this.consumptionTomorrow = response.body.length;
                    this.consumptionTomorrow.toFixed(2);
                })
            },
            findConsumptionAllTheTime(){
                let path = 'http://localhost:8088/consumption/all';
                this.$http.get(path).then(response => {
                    console.log(response);
                    this.consumptionTotal = response.body.length;
                    this.consumptionTotal.toFixed(2);
                });
            },
            formatDate() {
                if (this.selectedValue.getDate() < 10) {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-0${this.selectedValue.getDate()}T00:00`
                } else {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-${this.selectedValue.getDate()}T00:00`
                }
            },
            formatNumber(value){
                return value.toFixed(0);
            },
            formatDateTomorrow() {
                if (this.selectedValue.getDate() < 10) {
                    if (this.selectedValue.getDate == 9) {
                        return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-${this.selectedValue.getDate() + 1}T00:00`
                    }
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-0${this.selectedValue.getDate() + 1}T00:00`
                } else {
                    return `${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth() + 1}-${this.selectedValue.getDate() + 1}T00:00`
                }
            }
        }
    }
</script>
<style scoped>
    * {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
    }

    span {
        font-size: 50px;
    }
</style>