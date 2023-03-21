<template>
    <div class="main-schedules">
        <div class="content-body">
            <v-card elevation="1">
                <v-toolbar
                    color="var(--blue-1)"
                    class="rounded-b-0"
                    elevation="0"
                >
                    <span class="content-title">Schedules</span>
                </v-toolbar>
                <v-card-text class="body-items">
                    <v-tabs v-model="tab">
                        <v-tab>
                            Today
                            <v-badge
                                color="success"
                                inline
                                :content="today.items.length"
                            />
                        </v-tab>
                        <v-tab>
                            All
                            <v-badge
                                color="error"
                                inline
                                :content="all.items.length"
                            />
                        </v-tab>
                    </v-tabs>
                    <v-divider />
                    <br />
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-card flat>
                                <v-data-table
                                    :headers="today.headers"
                                    :items="today.items"
                                    :items-per-page="5"
                                    class="elevation-1"
                                />
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-data-table
                                    :headers="all.headers"
                                    :items="all.items"
                                    :items-per-page="5"
                                    class="elevation-1"
                                />
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tab: 0,
            today: {
                headers: [
                    {
                        text: "Subject",
                        align: "start",
                        sortable: false,
                        value: "name",
                    },
                    {
                        text: "Section",
                        align: "start",
                        sortable: false,
                        value: "section",
                    },
                    {
                        text: "Instructor",
                        align: "start",
                        sortable: false,
                        value: "instructor",
                    },

                    {
                        text: "Room Number",
                        align: "start",
                        sortable: false,
                        value: "roomNumber",
                    },
                    {
                        text: "Time",
                        align: "start",
                        sortable: false,
                        value: "time",
                    },
                    {
                        text: "Day",
                        align: "start",
                        sortable: false,
                        value: "day",
                    },
                ],
                items: [
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                ],
            },

            all: {
                headers: [
                    {
                        text: "Subject",
                        align: "start",
                        sortable: false,
                        value: "name",
                    },
                    {
                        text: "Section",
                        align: "start",
                        sortable: false,
                        value: "section",
                    },
                    {
                        text: "Instructor",
                        align: "start",
                        sortable: false,
                        value: "instructor",
                    },

                    {
                        text: "Room Number",
                        align: "start",
                        sortable: false,
                        value: "roomNumber",
                    },
                    {
                        text: "Time",
                        align: "start",
                        sortable: false,
                        value: "time",
                    },
                    {
                        text: "Day",
                        align: "start",
                        sortable: false,
                        value: "day",
                    },
                ],
                items: [
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                    {
                        name: "Algebra 1",
                        section: "Section 1",
                        instructor: "Jose Rizal",
                        roomNumber: 87,
                        time: "8:00am - 9:00am",
                        day: "M-W-F",
                    },
                ],
            },
        };
    },
};
</script>

<style scoped>
.main-schedules {
    width: 100%;
    padding: 0px 50px;
}
.content-body {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.content-title {
    font-size: 1.2em;
    color: var(--white-1);
}

.body-items {
    padding: 20px 40px;
}
</style>
