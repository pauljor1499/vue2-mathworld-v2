<template>
    <div class="class-selectected-content">
        <SuccessSnackbar
            :text="success_snackbar.message"
            v-if="success_snackbar.status"
            @closeSnackbar="success_snackbar.status = false"
        />
        <ErrorSnackbar
            :text="error_snackbar.message"
            v-if="error_snackbar.status"
            @closeSnackbar="error_snackbar.status = false"
        />
        <Breadcrumbs :items="breadcrumbs" />
        <div class="content-title">
            <span class="class-name">
                {{ get_class.title + " (" + get_class.code + ")" }}
            </span>
        </div>
        <div class="content-body">
            <div class="content-table">
                <v-card>
                    <v-card-text>
                        <v-tabs v-model="tab" grow>
                            <v-tab> Class Periods </v-tab>
                            <v-tab> Assignments </v-tab>
                            <v-tab>
                                <span> Requests </span>
                                <v-badge
                                    v-if="get_pending_students.length != 0"
                                    color="error"
                                    inline
                                    :content="get_pending_students.length"
                                />
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <ClassPeriodsTable />
                            </v-tab-item>
                            <v-tab-item>
                                <AssignmentsTable />
                            </v-tab-item>
                            <v-tab-item>
                                <Requests />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import SuccessSnackbar from "@/components/Teacher/main/snackbars/Success.vue";
import ErrorSnackbar from "@/components/Teacher/main/snackbars/Error.vue";
import { GradebookDataService } from "@/api/Teacher/gradebook/main/GradebookData";
import { RequestsService } from "@/api/Teacher/gradebook/requests/Requests";
import ClassPeriodsTable from "@/components/Teacher/gradebook/class_periods/ClassPeriods.vue";
import AssignmentsTable from "@/components/Teacher/gradebook/assignments/TableContent.vue";
import Requests from "@/components/Teacher/gradebook/requests/Requests.vue";
import Breadcrumbs from "@/components/Teacher/main/breadcrumbs/Breadcrumbs.vue";

export default {
    components: {
        SuccessSnackbar,
        ErrorSnackbar,
        ClassPeriodsTable,
        AssignmentsTable,
        Requests,
        Breadcrumbs,
    },

    data() {
        return {
            tab: 0,
            success_snackbar: {
                status: false,
                message: "",
            },
            error_snackbar: {
                status: false,
                message: "",
            },
            get_class: GradebookDataService.prototype.get_class(
                this.$route.params.class_title
            ),
            get_pending_students: RequestsService.prototype.get_class(
                this.$route.params.class_title
            ).pending_students,

            breadcrumbs: [
                {
                    text: "Gradebook",
                    exact: true,
                    disabled: false,
                    path: "/teacher/gradebook",
                },
                {
                    text: "Class",
                    disabled: true,
                    path: "",
                },
            ],
        };
    },

    methods: {
        set_tab(tab_index) {
            if (tab_index != "" || tab_index != null) {
                this.tab = tab_index;
            }
        },

        show_message(snackbar_item) {
            if (snackbar_item != null) {
                if (snackbar_item.type == "success") {
                    this.success_snackbar.status = true;
                    this.success_snackbar.message = snackbar_item.message;
                } else if (snackbar_item.type == "error") {
                    this.error_snackbar.status = true;
                    this.error_snackbar.message = snackbar_item.message;
                }
            }
        },
    },

    created() {
        this.set_tab(this.$route.params.tab_item); //if not empty, modify tab
        this.show_message(this.$route.params.snackbar_item); //if not empty, show snackbar
    },
};
</script>

<style scoped>
* {
    text-decoration: none;
    text-transform: none;
}

.class-selectected-content {
    width: 100%;
}

.content-title {
    display: flex;
    flex-direction: column;
    padding: 25px 5% 25px 5%;
    background-color: var(--blue-1);
}

.content-title .class-name {
    font-size: 1.4em;
    color: var(--white-1);
}

.content-body {
    padding: 5%;
}

.content-table {
    width: 100%;
}

.content-table .v-card {
    padding: 20px;
}
</style>
