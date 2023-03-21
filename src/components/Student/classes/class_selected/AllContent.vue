<template>
    <div class="class-selected-main-content">
        <Breadcrumbs :items="breadcrumbs" />
        <div class="content-title">
            <span class="class-name">
                {{ get_class.title + " (" + get_class.section + ")" }}
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
                    <ClassRoster />
                </v-tab-item>
                <v-tab-item>
                    <Grades />
                </v-tab-item>
                <v-tab-item>
                    <ClassDetails />
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
import { AllClassesService } from "@/api/Student/classes/ClassesService";
import Assignments from "@/components/Student/classes/class_selected/assignments/Assignments.vue";
import ClassRoster from "@/components/Student/classes/class_selected/class_roster/ClassRoster.vue";
import Grades from "@/components/Student/classes/class_selected/grades/Grades.vue";
import ClassDetails from "@/components/Student/classes/class_selected/class_details/ClassDetails.vue";
import Breadcrumbs from "@/components/Student/main/breadcrumbs/Breadcrumbs.vue";

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
            class_title: "",
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

    computed: {
        get_class() {
            return AllClassesService.prototype.get_class(this.class_title);
        },
    },

    created() {
        this.class_title = this.$route.params.classTitle;
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
    width: 75%;
    margin: auto;
    margin-bottom: 100px;
}
</style>
