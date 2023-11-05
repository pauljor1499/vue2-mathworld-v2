<template>
    <div class="bar-chart-content">
        <v-card>
            <v-card-title> Grade Distribution </v-card-title>
            <v-card-text class="content-body">
                <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
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
            options: {
                chart: {
                    id: "vuechart-example",
                },
                xaxis: {
                    categories: [],
                    title: {
                        text: "Scores",
                    },
                },
                yaxis: {
                    title: {
                        text: "No. of Students",
                    },
                },
            },
            series: [
                {
                    name: "Students",
                    data: [3, 8, 16, 9, 2, 32],
                },
            ],
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
            this.series[0].data = JSON.parse(JSON.stringify(arr));
        },

        set_categories() {
            var arr = [];
            var total_items = 30;
            var divisible_by = 5;
            if (total_items % divisible_by == 0) {
                for (var i = 0; i <= total_items / divisible_by; i++) {
                    if (i == 1) {
                        arr.push(divisible_by * i - divisible_by + "-" + divisible_by * i);
                    } else if (i > 1) {
                        arr.push(divisible_by * i - divisible_by + 1 + "-" + divisible_by * i);
                    }
                }
            }
            this.options.xaxis.categories = JSON.parse(JSON.stringify(arr));
        },
    },
    created() {
        this.set_categories();
        this.set_data();
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
