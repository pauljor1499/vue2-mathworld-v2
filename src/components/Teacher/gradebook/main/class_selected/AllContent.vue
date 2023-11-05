<template>
    <div>
        <SimpleLoading :show_loading="teacher_class_store.loading" />
        <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
        <ErrorSnackbar :text="error_snackbar.message" v-if="error_snackbar.status" @closeSnackbar="error_snackbar.status = false" />
        <div class="class-selectected-content" v-if="teacher_class_store.selected_class != null">
            <Breadcrumbs :items="breadcrumbs" />
            <div class="content-title">
                <span>
                    {{ teacher_class_store.selected_class.title + " (" + teacher_class_store.selected_class.code + ")" }}
                </span>
            </div>
            <div class="content-body">
                <v-tabs v-model="tab">
                    <v-tab> <span> Assignments </span> </v-tab>
                    <v-tab> <span> Class Periods </span> </v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <br />
                        <br />
                        <AssignmentsTable :all_assignments="teacher_assignment_store.all_assignments" />
                    </v-tab-item>
                    <v-tab-item>
                        <br />
                        <br />
                        <ClassPeriodsTable />
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </div>
        <div v-else-if="teacher_class_store.loading != true">
            <PageNotFound />
        </div>
    </div>
</template>

<script>
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import { TeacherAssignmentData } from "@/store/Teacher/TeacherAssignmentData";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import ErrorSnackbar from "@/components/Commons/snackbars/Error.vue";
import ClassPeriodsTable from "@/components/Teacher/gradebook/class_periods/ClassPeriods.vue";
import AssignmentsTable from "@/components/Teacher/gradebook/assignments/TableContent.vue";
import Breadcrumbs from "@/components/Commons/breadcrumbs/Breadcrumbs.vue";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
import PageNotFound from "@/components/Teacher/page_not_found/PageNotFound.vue";

export default {
    components: {
        SuccessSnackbar,
        ErrorSnackbar,
        ClassPeriodsTable,
        AssignmentsTable,
        Breadcrumbs,
        SimpleLoading,
        PageNotFound,
    },

    data() {
        return {
            teacher_class_store: TeacherClassData(),
            teacher_assignment_store: TeacherAssignmentData(),
            class_uuid: this.$route.params.class_title,
            tab: 0,
            success_snackbar: {
                status: false,
                message: "",
            },
            error_snackbar: {
                status: false,
                message: "",
            },
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
        this.teacher_class_store.view_class(this.class_uuid);
        this.teacher_assignment_store.get_all_assignments(this.class_uuid);

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

.content-title span {
    font-size: 1.4em;
    color: var(--white-1);
}

.content-body {
    padding: 0 5% 5% 5%;
}

@media only screen and (max-width: 800px) {
}

@media only screen and (max-width: 450px) {
    .content-title {
        padding: 0 5% 5% 5%;
    }

    .content-title span {
        font-size: 1rem;
    }

    .v-tab span {
        font-size: 0.8rem;
    }
}
</style>
