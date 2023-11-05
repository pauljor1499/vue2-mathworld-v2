<template>
    <div class="my-assignment-content">
        <div class="content-table">
            <div class="content-header">
                <v-spacer></v-spacer>
                <v-col cols="4">
                    <v-select v-model="selectSchoolYear" :items="dates" label="Semester" hide-details outlined></v-select>
                </v-col>
            </div>
            <br />
            <br />
            <v-expansion-panels focusable>
                <v-expansion-panel v-for="(item, index) in classes" :key="index">
                    <v-expansion-panel-header expand-icon="mdi-menu-down"> {{ item }} </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card outlined>
                            <v-card-title>
                                <v-col cols="6">
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" dense single-line hide-details outlined />
                                </v-col>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table
                                    :headers="headers"
                                    :items="searchSeason"
                                    :search="search"
                                    @click:row="rowClicked"
                                    style="cursor: pointer"
                                >
                                    <template v-slot:[`item.number`]="{ index }">
                                        <span> {{ index + 1 }} </span>
                                    </template>
                                    <template v-slot:[`item.actions`]="{ item }">
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on" large>
                                                    <v-icon color="primary"> mdi-dots-vertical-circle-outline </v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list dense>
                                                <v-list-item link @click="sendEmail(item)">
                                                    <span> Copy </span>
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-content-copy</v-icon>
                                                    </v-list-item-icon>
                                                </v-list-item>
                                                <v-list-item link @click="sendEmail(item)">
                                                    <span> Share </span>
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-share</v-icon>
                                                    </v-list-item-icon>
                                                </v-list-item>
                                                <v-list-item link dense @click="show_dialog(item)">
                                                    <span> Trash </span>
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-trash-can</v-icon>
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            selectSchoolYear: "",
            dates: ["Fall 2023", "Spring 2023", "Fall 2022", "Spring 2022"],
            classes: ["Algebra", "Geometry", "Calculus"],
            headers: [
                {
                    text: "#",
                    sortable: false,
                    value: "number",
                },
                {
                    text: "Title",
                    sortable: false,
                    value: "title",
                },
                {
                    text: "Subject",
                    sortable: false,
                    value: "subject",
                },
                {
                    text: "Items",
                    sortable: false,
                    value: "total_items",
                },
                {
                    text: "Date",
                    sortable: false,
                    value: "date",
                },
                {
                    text: "Actions",
                    sortable: false,
                    value: "actions",
                },
            ],
            assignments: [
                {
                    title: "Algebra Assignment",
                    total_items: 20,
                    date_open: "January 20, 2023",
                    date_close: "January 21, 2023",
                    submissions: 20,
                    date: "January 20, 2023",
                    status: "CLOSED",
                    subject: "Algebra",
                },
                {
                    title: "Geometry Assignment",
                    total_items: 20,
                    date_open: "August 20, 2023",
                    date_close: "August 21, 2023",
                    submissions: 12,
                    date: "August 20, 2023",
                    status: "CLOSED",
                    subject: "Geometry",
                },
                {
                    title: "Trigonometry Assignment",
                    total_items: 20,
                    date_open: "September 20, 2023",
                    date_close: "September 21, 2023",
                    submissions: 0,
                    date: "September 20, 2023",
                    status: "CLOSED",
                    subject: "Trigonometry",
                },
                {
                    title: "Topology Assignment",
                    total_items: 20,
                    date_open: "October 01, 2023",
                    date_close: "October 03, 2023",
                    submissions: 20,
                    date: "October 01, 2023",
                    status: "CLOSED",
                    subject: "Topology",
                },
                {
                    title: "Calculus Assignment",
                    total_items: 20,
                    date_open: "February 20, 2022",
                    date_close: "February 21, 2022",
                    submissions: 20,
                    date: "February 20, 2022",
                    status: "CLOSED",
                    subject: "Calculus",
                },
                {
                    title: "Arithmetic Assignment",
                    total_items: 20,
                    date_open: "September 20, 2022",
                    date_close: "September 21, 2022",
                    submissions: 20,
                    date: "September 20, 2022",
                    status: "CLOSED",
                    subject: "Arithmetic",
                },
            ],
        };
    },

    computed: {
        searchSeason() {
            let schoolYear = this.selectSchoolYear;
            const season = extractLetters(schoolYear);
            const year = extractNumbers(schoolYear);
            let results = [];
            if (season == "Fall") {
                const schoolYearStart = new Date("August 01, " + year);
                const schoolYearEnd = new Date("December 30, " + year);
                this.assignments.forEach((assignment) => {
                    const date = new Date(assignment.date_open);
                    if (date >= schoolYearStart && date <= schoolYearEnd) {
                        results.push(assignment);
                    }
                });
                return results.sort(function (a, b) {
                    return new Date(b.date_open) - new Date(a.date_open);
                });
            } else if (season == "Spring") {
                const schoolYearStart = new Date("January 01, " + year);
                const schoolYearEnd = new Date("May 30, " + year);
                this.assignments.forEach((assignment) => {
                    const date = new Date(assignment.date_open);
                    if (date >= schoolYearStart && date <= schoolYearEnd) {
                        results.push(assignment);
                    }
                });
                return results.sort(function (a, b) {
                    return new Date(b.date_open) - new Date(a.date_open);
                });
            }

            function extractLetters(inputString) {
                // Use a regular expression to match all letters in the input string (case-insensitive)
                var lettersArray = inputString.match(/[a-zA-Z]+/g);
                // If letters are found, join them into a string
                if (lettersArray) {
                    var lettersString = lettersArray.join("");
                    return lettersString;
                } else {
                    // If no letters are found, return an empty string or handle it according to your use case
                    return "";
                }
            }

            function extractNumbers(inputString) {
                // Use a regular expression to match all numbers in the input string
                var numbersArray = inputString.match(/\d+/g);
                // If numbers are found, join them into a string and parse it as an integer
                if (numbersArray) {
                    var numbersString = numbersArray.join("");
                    var result = parseInt(numbersString, 10); // 10 is the radix/base for decimal numeral system
                    return result;
                } else {
                    // If no numbers are found, return null or handle it according to your use case
                    return null;
                }
            }
        },
    },

    methods: {
        rowClicked(row) {
            this.$router.push({
                name: "ViewAssignment",
                params: {
                    assignment_type: "MW",
                    //need to change
                    // assignment_code: row.uuid,
                    assignment_code: "9550aec0-e522-4363-8713-42b27646f567",
                },
            });
        },

        sendToTeacher() {
            console.log("sent");
        },

        formatDate(date) {
            return new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            });
        },
    },

    created() {
        this.selectSchoolYear = this.dates[0];
    },
};
</script>

<style scoped>
.content-header {
    display: flex;
}

.content-table {
    padding: 1%;
}
</style>
