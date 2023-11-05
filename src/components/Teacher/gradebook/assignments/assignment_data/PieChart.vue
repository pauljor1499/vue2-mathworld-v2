<template>
    <div class="pie-chart-content">
        <v-card>
            <v-card-title> Grade Distribution </v-card-title>
            <v-card-text class="content-body">
                <apexchart width="400" type="pie" :options="chartOptions" :series="series"></apexchart>
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
            },
            series: [],
        };
    },
    methods: {
        set_data() {
            var arr = [];
            var total_items = 30;
            var divisible_by = 5;
            for (var i = 0; i < total_items / divisible_by; i++) {
                arr.push(2 + i);
            }
            this.series = JSON.parse(JSON.stringify(arr));
        },

        set_categories() {
            var arr = [];
            var total_items = 30;
            var divisible_by = 5;
            if (total_items % divisible_by == 0) {
                for (var i = 0; i <= total_items / divisible_by; i++) {
                    if (i == 1) {
                        arr.push(divisible_by * i - divisible_by + "-" + divisible_by * i + " (" + this.series[i - 1] + ")");
                    } else if (i > 1) {
                        arr.push(divisible_by * i - divisible_by + 1 + "-" + divisible_by * i + " (" + this.series[i - 1] + ")");
                    }
                }
            }
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
.content-body {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
