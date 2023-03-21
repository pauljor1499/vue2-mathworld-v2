<template>
    <div class="classperiods-content">
        <br />
        <br />
        <div class="table-top">
            <!-- <v-text-field
                v-model="search"
                style="max-width: 40%"
                outlined
                dense
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            /> -->
            <!-- <div></div>
            <v-btn color="primary">
                <v-icon left> mdi-plus </v-icon> Add New Student
            </v-btn> -->
        </div>
        <br />
        <br />
        <div class="table-content">
            <v-data-table
                style="flex: 4; overflow: hidden"
                :headers="students_header"
                :items="students"
                sort-by="lastname"
                :search="search"
                hide-default-footer
            >
                <template v-slot:[`item.number`]="{ index }">
                    <span> {{ index + 1 }} </span>
                </template>
            </v-data-table>
            <v-data-table
                v-if="students.length == 0"
                style="flex: 4; overflow: hidden"
                :headers="[{ text: ``, sortable: false, value: `test` }]"
                :search="search"
                hide-default-footer
            ></v-data-table>
            <v-data-table
                v-else
                style="flex: 4; overflow: hidden"
                :headers="test_scores_header"
                :items="students"
                sort-by="lastname"
                :search="search"
                hide-default-header
                hide-default-footer
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                        <tr>
                            <th v-for="(item, index) in headers" :key="index">
                                <v-tooltip bottom max-width="400px">
                                    <template v-slot:activator="{ on }">
                                        <span v-on="on">
                                            {{ modify_text(item.text) }}
                                        </span>
                                    </template>
                                    <span>{{ item.text }}</span>
                                </v-tooltip>
                            </th>
                        </tr>
                    </thead>
                </template>
            </v-data-table>
            <v-data-table
                :headers="test_average_header"
                :items="students"
                sort-by="lastname"
                :search="search"
                hide-default-footer
            >
                <template v-slot:[`item.average`]="data">
                    <span
                        style="color: gray"
                        v-if="get_average(data.item) == 0"
                    >
                        {{ get_average(data.item) }}
                    </span>
                    <span
                        style="color: red"
                        v-else-if="get_average(data.item) < 70"
                    >
                        {{ get_average(data.item) }}
                    </span>
                    <span
                        style="color: green"
                        v-if="get_average(data.item) >= 70"
                    >
                        {{ get_average(data.item) }}
                    </span>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
import { ClassPeriodsService } from "@/api/Teacher/gradebook/class_periods/ClassPeriodsService";

export default {
    data() {
        return {
            search: "",
            students_header: [
                {
                    text: "#",
                    sortable: false,
                    value: "number",
                },
                {
                    text: "Lastname",
                    sortable: false,
                    value: "lastname",
                },
                {
                    text: "Firstname",
                    sortable: false,
                    value: "firstname",
                },
                {
                    text: "Middlename",
                    sortable: false,
                    value: "middlename",
                },
            ],
            test_average_header: [
                {
                    text: "Average",
                    sortable: false,
                    value: "average",
                },
            ],
        };
    },

    computed: {
        students() {
            return ClassPeriodsService.prototype.get_students();
        },

        test_scores_header() {
            return ClassPeriodsService.prototype.get_test_headers();
        },
    },

    methods: {
        get_average(data) {
            var total = 0;
            var counter = 0;
            Object.keys(data).forEach((key) => {
                if (
                    key !== "id" &&
                    key !== "firstname" &&
                    key !== "middlename" &&
                    key !== "lastname"
                ) {
                    total += data[key];
                    counter++;
                }
            });
            return (total / counter).toFixed(2);
        },

        modify_text(title) {
            if (JSON.stringify(title.length) > 10) {
                var result = title.substring(0, 10);
                return result + "...";
            }
            return title;
        },
    },

    beforeCreate() {
        ClassPeriodsService.prototype.get_class(this.$route.params.class_title);
    },
};
</script>

<style scoped>
.classperiods-content {
    width: 100%;
}

.v-btn {
    text-transform: none;
}

.table-top {
    display: flex;
    justify-content: space-between;
}

.table-content {
    width: 100%;
    display: flex;
    white-space: nowrap;
}
</style>
