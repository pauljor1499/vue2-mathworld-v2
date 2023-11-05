<template>
    <div>
        <div class="assignments-content" v-if="teacher_class_store.all_class !== null">
            <SimpleLoading :show_loading="teacher_class_store.loading" />
            <SuccessSnackbar :text="success_snackbar.message" v-if="success_snackbar.status" @closeSnackbar="success_snackbar.status = false" />
            <div class="content-title">
                <span>Assignments</span>
            </div>
            <div class="content-body" v-if="teacher_class_store.all_class.length !== 0">
                <v-tabs v-model="tab">
                    <v-tab>
                        <span> My Assignments </span>
                        <v-badge color="primary" inline :content="6" />
                        <!-- <v-badge v-if="selected_questions.length != 0" color="success" inline :content="selected_questions.length" /> -->
                    </v-tab>
                    <v-tab>
                        <span> Archive </span>
                        <v-badge color="success" inline :content="3" />
                    </v-tab>
                    <v-tab>
                        <span> Request </span>
                        <v-badge color="warning" inline :content="3" />
                    </v-tab>
                    <v-tab>
                        <span> Trash </span>
                        <v-badge color="error" inline :content="3" />
                    </v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <br />
                        <br />
                        <MyAssignments />
                    </v-tab-item>
                    <v-tab-item>
                        <br />
                        <br />
                        <ArchivedAssignments />
                    </v-tab-item>
                    <v-tab-item>
                        <br />
                        <br />
                        <RequestedAssignments />
                    </v-tab-item>
                    <v-tab-item>
                        <br />
                        <br />
                        <TrashAssignments />
                    </v-tab-item>
                </v-tabs-items>
            </div>
            <div class="content-body" v-else>
                <div class="no-class-added">
                    <img width="40%" src="@/assets/class/no_class.jpg" alt="" />
                    <h4>Create a class to get started</h4>
                    <span>
                        Click <span style="cursor: pointer; color: blue" @click="$router.push('/teacher/all-classes')">here</span> to add class
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
import SuccessSnackbar from "@/components/Commons/snackbars/Success.vue";
import MyAssignments from "@/components/Teacher/assignments/main/Assignments/MyAssignments/MyAssignments.vue";
import ArchivedAssignments from "@/components/Teacher/assignments/main/Assignments/ArchivedAssignments/ArchivedAssignments.vue";
import RequestedAssignments from "@/components/Teacher/assignments/main/Assignments/RequestedAssignments/RequestedAssignments.vue";
import TrashAssignments from "@/components/Teacher/assignments/main/Assignments/TrashedAssignments/TrashedAssignments.vue";

export default {
    components: {
        SimpleLoading,
        SuccessSnackbar,
        MyAssignments,
        ArchivedAssignments,
        RequestedAssignments,
        TrashAssignments,
    },

    data() {
        return {
            teacher_class_store: TeacherClassData(),
            tab: null,
            success_snackbar: {
                status: false,
                message: "",
            },
        };
    },

    methods: {
        show_message(snackbar_item) {
            if (snackbar_item != null) {
                if (snackbar_item.type == "success") {
                    this.success_snackbar.status = true;
                    this.success_snackbar.message = snackbar_item.message;
                }
            }
        },
    },

    created() {
        this.teacher_class_store.get_all_class();
        this.show_message(this.$route.params.snackbar_item); //if not empty, show snackbar
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}

.assignments-content {
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
    padding: 0 5% 5% 5%;
}

.no-class-added {
    display: flex;
    margin-top: 5%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
