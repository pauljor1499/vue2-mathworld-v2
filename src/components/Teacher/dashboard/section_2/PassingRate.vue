<template>
    <div class="passing-rate-content">
        <v-card>
            <v-card-title> Passing Rate </v-card-title>
            <v-card-text class="content-body">
                <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    width: 380,
                    type: "pie",
                },
                labels: [],
                colors: ["#6CBC72", "#F78977"],
            },
            series: [],
        };
    },
    methods: {
        set_data() {
            var arr = [17, 33];
            this.series = JSON.parse(JSON.stringify(arr));
        },

        set_categories() {
            var arr = ["Passed", "Failed"];
            this.chartOptions.labels = JSON.parse(JSON.stringify(arr));
        },
    },
    created() {
        this.set_data();
        this.set_categories();
    },
};
</script>

<style scoped>
.passing-rate-content {
    width: 50%;
}
</style>
