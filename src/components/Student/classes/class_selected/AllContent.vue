<template>
    <div class="class-selected-main-content" v-if="student_class_store.selected_class !== null">
        <Breadcrumbs :items="breadcrumbs" />
        <div class="content-title">
            <span class="class-name">
                {{ student_class_store.selected_class.title + " (" + student_class_store.selected_class.section + ")" }}
            </span>
        </div>
        <br />
        <br />
        <div class="content-body">
            <v-tabs v-model="tab" grow>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-divider />
            <br />
            <br />
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <Assignments />
                </v-tab-item>
                <v-tab-item>
                    <ClassRoster :students="student_class_store.selected_class.students" />
                </v-tab-item>
                <v-tab-item>
                    <Grades />
                </v-tab-item>
                <v-tab-item>
                    <ClassDetails :class_details="student_class_store.selected_class" />
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
import { StudentClassData } from "@/store/Student/StudentClassData";
import Assignments from "@/components/Student/classes/class_selected/assignments/Assignments.vue";
import ClassRoster from "@/components/Student/classes/class_selected/class_roster/ClassRoster.vue";
import Grades from "@/components/Student/classes/class_selected/grades/Grades.vue";
import ClassDetails from "@/components/Student/classes/class_selected/class_details/ClassDetails.vue";
import Breadcrumbs from "@/components/Commons/breadcrumbs/Breadcrumbs.vue";

export default {
    components: {
        Assignments,
        ClassRoster,
        Grades,
        ClassDetails,
        Breadcrumbs,
    },

    data() {
        return {
            student_class_store: StudentClassData(),
            class_uuid: this.$route.params.class_title,
            tab: 0,
            items: ["Assignments", "Class Roster", "Grades", "Class Details"],
            breadcrumbs: [
                {
                    text: "Classes",
                    exact: true,
                    disabled: false,
                    path: "/student",
                },
                {
                    text: "Class",
                    disabled: true,
                    path: "",
                },
            ],
        };
    },

    created() {
        this.student_class_store.view_class(this.class_uuid);
    },
};
</script>

<style scoped>
* {
    text-transform: none;
}

.class-selected-main-content {
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
    width: 90%;
    margin: auto;
    margin-bottom: 100px;
}
</style>
