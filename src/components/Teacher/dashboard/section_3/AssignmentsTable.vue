<template>
    <div class="assignments-content">
        <template>
            <v-card>
                <v-card-title>
                    Subjects
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" outlined dense label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table
                    :page.sync="pagination.page"
                    :items-per-page="pagination.itemsPerPage"
                    @page-count="pagination.pageCount = $event"
                    hide-default-footer
                    :headers="headers"
                    :items="all_classes"
                    :search="search"
                >
                    <template v-slot:[`item.number`]="{ index }">
                        <span> {{ index + 1 }} </span>
                    </template>
                    <template v-slot:[`item.status`]="data">
                        <v-chip small :color="getColor(data.item.status)" dark>
                            {{ data.item.status }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="primary" rounded small @click="clickView(item)">View</v-btn>
                    </template>
                </v-data-table>
                <div class="text-center pb-2 pt-2">
                    <v-pagination v-model="pagination.page" :length="pagination.pageCount"></v-pagination>
                </div>
            </v-card>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            pagination: {
                page: 1,
                itemsPerPage: 10,
                pageCount: 0,
            },
            headers: [
                {
                    text: "#",
                    sortable: true,
                    value: "number",
                },
                {
                    text: "Name",
                    sortable: false,
                    value: "name",
                },
                {
                    text: "Code",
                    sortable: false,
                    value: "class_code",
                },
                {
                    text: "Total students",
                    sortable: false,
                    value: "total_students",
                },
                {
                    text: "Total assignments",
                    sortable: false,
                    value: "total_assignments",
                },
                {
                    text: "Status",
                    sortable: false,
                    value: "status",
                },
                {
                    text: "Actions",
                    sortable: false,
                    value: "actions",
                },
            ],
            all_classes: [
                {
                    name: "Algebra 1",
                    class_code: "MW0-WIN",
                    total_students: 70,
                    total_assignments: 36,
                    status: "active",
                },
                {
                    name: "Algebra 2",
                    class_code: "MW0-WIN",
                    total_students: 70,
                    total_assignments: 36,
                    status: "active",
                },
                {
                    name: "Geometry 1",
                    class_code: "MW0-WIN",
                    total_students: 70,
                    total_assignments: 36,
                    status: "active",
                },
                {
                    name: "Geometry 2",
                    class_code: "MW0-WIN",
                    total_students: 70,
                    total_assignments: 36,
                    status: "active",
                },
                {
                    name: "Trigonometry 1",
                    class_code: "MW0-WIN",
                    total_students: 70,
                    total_assignments: 36,
                    status: "active",
                },
                {
                    name: "Trigonometry 2",
                    class_code: "MW0-WIN",
                    total_students: 70,
                    total_assignments: 36,
                    status: "inactive",
                },
            ],
        };
    },

    methods: {
        getColor(class_subject) {
            if (class_subject == "active") return "green";
            else if (class_subject == "inactive") return "gray";
        },

        clickView(data) {
            console.log(data);
        },
    },
};
</script>

<style scoped>
.assignments-content {
    width: 100%;
}
</style>
