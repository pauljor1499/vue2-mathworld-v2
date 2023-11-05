<template>
    <div class="all-classes-content">
        <Breadcrumbs :items="breadcrumbs" />
        <div class="content-title">
            <span>Assignment Title</span>
        </div>
        <div class="content-body">
            <div class="section-charts">
                <div class="chart-content">
                    <PieChart />
                </div>
                <div class="chart-content"></div>
            </div>
            <br />
            <br />
            <TableData />
        </div>
    </div>
</template>

<script>
import { AssignmentDataService } from "@/api/Teacher/gradebook/assignments/assignment_data/AssignmentData";
import PieChart from "./PieChart.vue";
import TableData from "./TableData.vue";
import Breadcrumbs from "@/components/Commons/breadcrumbs/Breadcrumbs.vue";

export default {
    components: {
        PieChart,
        TableData,
        Breadcrumbs,
    },

    data() {
        return {
            breadcrumbs: [
                {
                    text: "Gradebook",
                    exact: true,
                    disabled: false,
                    path: "/teacher/gradebook",
                },
                {
                    text: "Class",
                    exact: true,
                    disabled: false,
                    path: "/teacher/gradebook/" + this.$route.params.class_title,
                },
                {
                    text: "Assignment",
                    exact: true,
                    disabled: false,
                    path:
                        "/teacher/gradebook/" +
                        this.$route.params.class_title +
                        "/assignments/" +
                        this.$route.params.assignment_type +
                        "/" +
                        this.$route.params.assignment_code,
                },
                {
                    text: "Data",
                    exact: true,
                    disabled: true,
                    path: "",
                },
            ],
        };
    },

    created() {
        AssignmentDataService.prototype.get_class(this.$route.params.class_title);
    },
};
</script>

<style scoped>
.all-classes-content {
    width: 100%;
}

.content-title {
    display: flex;
    flex-direction: column;
    padding: 25px 5% 25px 5%;
    background-color: var(--blue-1);
}

.content-title span {
    font-size: 1.5em;
    color: var(--white-1);
}

.content-body {
    padding: 5%;
    margin-bottom: 10%;
}

.section-charts {
    display: flex;
    column-gap: 20px;
}

.chart-content {
    flex: 1;
}
</style>
