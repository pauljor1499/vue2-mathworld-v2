<template>
    <v-card elevation="2" class="assignmentTable">
        <div class="assignHeader">
            <h1>Assignments</h1>
        </div>
        <div class="assignMain">
            <div class="assignButtons">
                <v-btn
                    text
                    @click="changeTabTo('new')"
                    :color="newTab ? 'primary' : ''"
                    ><span>New</span>
                    <v-avatar color="#47CA7C" size="25" class="white--text"
                        >3</v-avatar
                    ></v-btn
                >
                <v-btn
                    text
                    @click="changeTabTo('unsubmitted')"
                    :color="unsubmitted ? 'primary' : ''"
                    ><span>Unsubmitted</span>
                    <v-avatar color="#FF6D6D" size="25" class="white--text"
                        >3</v-avatar
                    >
                </v-btn>
            </div>
            <div class="assignmentNew">
                <v-data-table
                    hide-default-footer
                    :headers="headers"
                    :items="
                        newTab ? assignmentsSubmitted : assignmentUnsubmitted
                    "
                    :items-per-page="5"
                    :item-class="setRowStyle"
                ></v-data-table>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {
                    text: "Subject",
                    align: "center",
                    sortable: false,
                    value: "subject",
                },
                {
                    text: "Section",
                    value: "section",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Instructor",
                    value: "instructor",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Room Number",
                    value: "roomNumber",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Time",
                    value: "time",
                    align: "center",
                    sortable: false,
                },
                { text: "Day", value: "day", align: "center", sortable: false },
            ],
            assignmentsSubmitted: [
                {
                    subject: "Algebra 1",
                    section: "Section 1",
                    instructor: "Jose Rizal",
                    roomNumber: 87,
                    time: "8:00 am - 9:00 am",
                    day: "M-W-F",
                },
                {
                    subject: "Algebra 1",
                    section: "Section 1",
                    instructor: "Jose Rizal",
                    roomNumber: 87,
                    time: "8:00 am - 9:00 am",
                    day: "M-W-F",
                },
                {
                    subject: "Algebra 1",
                    section: "Section 1",
                    instructor: "Jose Rizal",
                    roomNumber: 87,
                    time: "8:00 am - 9:00 am",
                    day: "M-W-F",
                },
            ],

            assignmentUnsubmitted: [
                {
                    subject: "Algebra 1",
                    section: "Section 10",
                    instructor: "Andres Bonifacio",
                    roomNumber: 91,
                    time: "8:00 am - 9:00 am",
                    day: "M-W-F",
                },
                {
                    subject: "Algebra 1",
                    section: "Section 10",
                    instructor: "Andres Bonifacio",
                    roomNumber: 91,
                    time: "8:00 am - 9:00 am",
                    day: "M-W-F",
                },
                {
                    subject: "Algebra 1",
                    section: "Section 10",
                    instructor: "Andres Bonifacio",
                    roomNumber: 91,
                    time: "8:00 am - 9:00 am",
                    day: "M-W-F",
                },
            ],
            newTab: true,
            unsubmitted: false,
        };
    },
    methods: {
        setRowStyle(item) {
            return "style-1";
        },

        changeTabTo(where) {
            if (where == "new") {
                this.newTab = true;
                this.unsubmitted = false;
            } else if (where == "unsubmitted") {
                this.newTab = false;
                this.unsubmitted = true;
            }
        },
    },
};
</script>

<style scoped>
.assignmentTable {
    width: 1000px;
    margin: auto;
}

.assignHeader {
    background-color: #0080c5;
    padding: 15px 40px;
}
.assignHeader h1 {
    font-size: 20px;
    font-weight: lighter;
    color: white;
}
.v-btn span {
    text-transform: capitalize;
    padding: 5px 0px;
    padding-right: 5px;
}
.assignButtons {
    margin: 15px 40px;
    margin-top: 20px;
    border-bottom: 1px solid gray;
}
.v-btn {
    text-align: left;
}

table {
    border-collapse: collapse !important;
}
table td,
table th {
    height: 40px !important;
}
.assignmentNew {
    padding: 10px 40px;
    padding-bottom: 30px;
}
.style-1 td {
    height: 70px !important;
    font-weight: 700;
    color: #003754;
}
</style>
