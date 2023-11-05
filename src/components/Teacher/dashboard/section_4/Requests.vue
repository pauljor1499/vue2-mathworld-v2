<template>
    <div class="assignments-content">
        <template>
            <v-card>
                <v-card-title>
                    Requests
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" outlined dense label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table
                    :page.sync="pagination.page"
                    :items-per-page="pagination.itemsPerPage"
                    @page-count="pagination.pageCount = $event"
                    hide-default-footer
                    :headers="headers"
                    sort-by="last_name"
                    :items="requests"
                    :search="search"
                >
                    <template v-slot:[`item.number`]="{ index }">
                        <span> {{ index + 1 }} </span>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="error" rounded small @click="clickReject(item)">Reject</v-btn>
                        <v-btn color="success" rounded small @click="clickAccept(item)">Accept</v-btn>
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
                    text: "Lastname",
                    sortable: false,
                    value: "last_name",
                },
                {
                    text: "First name",
                    sortable: false,
                    value: "first_name",
                },
                {
                    text: "Middle name",
                    sortable: false,
                    value: "middle_name",
                },
                {
                    text: "Email",
                    sortable: false,
                    value: "email",
                },
                {
                    text: "Actions",
                    sortable: false,
                    value: "actions",
                },
            ],
            requests: [
                {
                    first_name: "Marianna",
                    middle_name: "",
                    last_name: "Dennis",
                    email: "dennismarrianna@gmail.com",
                },
                {
                    first_name: "Giovanna",
                    middle_name: "",
                    last_name: "Gutierrez",
                    email: "gutierrezgiovanna@gmail.com",
                },
                {
                    first_name: "Winston",
                    middle_name: "",
                    last_name: "Francis",
                    email: "franciswinston@gmail.com",
                },
            ],
        };
    },

    methods: {
        clickReject(data) {
            console.log(data);
        },

        clickAccept(data) {
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
