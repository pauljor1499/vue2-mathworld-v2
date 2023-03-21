<template>
    <div class="class-selected-main-content">
        <Breadcrumbs :items="breadcrumbs" />
        <div class="content-title">
            <span class="class-name">
                {{ get_class.title + " (" + get_class.code + ")" }}
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
                    <ClassRoster />
                </v-tab-item>
                <v-tab-item>
                    <ClassDetails />
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
import { AllClassesService } from "@/api/Teacher/all_classes/AllClassesData";
import ClassRoster from "@/components/Teacher/all_classes/class_selected/class_roster/ClassRoster.vue";
import ClassDetails from "@/components/Teacher/all_classes/class_selected/class_details/ClassDetails.vue";
import Breadcrumbs from "@/components/Teacher/main/breadcrumbs/Breadcrumbs.vue";

export default {
    components: {
        ClassRoster,
        ClassDetails,
        Breadcrumbs,
    },

    data() {
        return {
            tab: 0,
            items: ["Class Roster", "Class Details"],
            get_class: AllClassesService.prototype.get_class_by_title(
                this.$route.params.class_title
            ),
            breadcrumbs: [
                {
                    text: "All Classes",
                    exact: true,
                    disabled: false,
                    path: "/teacher/all-classes",
                },
                {
                    text: "Class",
                    disabled: true,
                    path: "",
                },
            ],
        };
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
