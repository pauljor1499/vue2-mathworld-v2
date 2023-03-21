<template>
    <div class="main-content">
        <div class="content-body">
            <v-card elevation="1">
                <v-toolbar
                    color="var(--blue-1)"
                    class="rounded-b-0"
                    elevation="0"
                >
                    <span class="content-title">Assignments</span>
                </v-toolbar>
                <v-card-text class="body-items">
                    <v-tabs v-model="tab">
                        <v-tab>
                            New
                            <v-badge
                                color="success"
                                inline
                                :content="new_assignment.items.length"
                            />
                        </v-tab>
                        <v-tab>
                            Unsubmitted
                            <v-badge
                                color="error"
                                inline
                                :content="unsubmitted_assignment.items.length"
                            />
                        </v-tab>
                    </v-tabs>
                    <v-divider />
                    <br />
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-card flat>
                                <v-data-table
                                    :headers="new_assignment.headers"
                                    :items="new_assignment.items"
                                    :items-per-page="5"
                                />
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-data-table
                                    :headers="unsubmitted_assignment.headers"
                                    :items="unsubmitted_assignment.items"
                                    :items-per-page="5"
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
            new_assignment: {
                headers: [
                    {
                        text: "Title",
                        align: "start",
                        sortable: false,
                        value: "title",
                    },

                    {
                        text: "Subject",
                        align: "start",
                        sortable: false,
                        value: "name",
                    },

                    {
                        text: "Instructor",
                        align: "start",
                        sortable: false,
                        value: "instructor",
                    },
                ],
                items: [
                    {
                        title: "Assignment Title 1",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 2",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 3",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                ],
            },

            unsubmitted_assignment: {
                headers: [
                    {
                        text: "Title",
                        align: "start",
                        sortable: false,
                        value: "title",
                    },

                    {
                        text: "Subject",
                        align: "start",
                        sortable: false,
                        value: "name",
                    },

                    {
                        text: "Instructor",
                        align: "start",
                        sortable: false,
                        value: "instructor",
                    },
                ],
                items: [
                    {
                        title: "Assignment Title 1",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 2",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 3",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },

                    {
                        title: "Assignment Title 4",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 5",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 6",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },

                    {
                        title: "Assignment Title 7",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 8",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                    {
                        title: "Assignment Title 9",
                        name: "Algebra 1",
                        instructor: "Jose Rizal",
                    },
                ],
            },
        };
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}

.main-content {
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
