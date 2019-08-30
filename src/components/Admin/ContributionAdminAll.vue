<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h3 class="h3 text-center" style="margin-bottom:0.5em;">Contribuições</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label for="consumptionToday">Pagas: </label>
                <animated-number id="consumptionToday" :formatValue="formatNumber" :value="contributionPaid" :duration="3000" />
            </div>
            <div class="col-md-3">
                <label for="consumptionTomorrow">Não pagas: </label>
                <animated-number id="consumptionTomorrow" :formatValue="formatNumber" :value="contributioNotPaid"
                    :duration="3000" />
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
                contributionPaid: 0,
                contributioNotPaid: 0
            }
        },
        mounted() {
            this.getPaid();
            this.getNotPaid();
        },
        methods: {
            getPaid() {
                let path = 'http://localhost:8088/query/contribution?paid=' + 'S';
                this.$http.get(path).then(response => {
                    let total = 0;
                    response.body.forEach(element => {
                        total += element.value;
                    });
                    this.contributionPaid = total;
                }, err => {
                    console.log(err);
                });
            },
            getNotPaid() {
                let path = 'http://localhost:8088/query/contribution?paid=' + 'N';
                this.$http.get(path).then(response => {
                    let total = 0;
                    response.body.forEach(element => {
                        total += element.value;
                    });
                    this.contributioNotPaid = total;
                }, err => {
                    console.log(err);
                })
            },
            formatNumber(value) {
                return `  R$ ${value.toFixed(2)}`
            }
        }
    }
</script>
<style scoped>
    * {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
    }

    span, label {
        font-size: 25px;
    }
</style>