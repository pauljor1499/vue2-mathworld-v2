<template>
    <div class="assignments-content">
        <v-card>
            <v-card-title> Assignments </v-card-title>
            <v-card-text class="content-body">
                <apexchart type="line" height="350" :options="options" :series="series"></apexchart>
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
                        text: "Classes",
                    },
                },
                yaxis: {
                    title: {
                        text: "Submissions",
                    },
                },
            },
            series: [
                {
                    name: "Submission",
                    data: [],
                },
            ],
        };
    },
    methods: {
        set_data() {
            var total_submissions = [7, 3, 5, 12, 10, 13];
            this.series[0].data = JSON.parse(JSON.stringify(total_submissions));
        },

        set_categories() {
            var all_classes = ["Algebra 1", "Algebra 2", "Geometry 1", "Geometry 2", "Trigonometry 1", "Trigonometry 2"];
            this.options.xaxis.categories = JSON.parse(JSON.stringify(all_classes));
        },
    },
    created() {
        this.set_data();
        this.set_categories();
    },
};
</script>

<style scoped>
.assignments-content {
    width: 100%;
}
</style>
