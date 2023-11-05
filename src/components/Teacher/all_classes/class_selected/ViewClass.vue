<template>
    <div>
        <SimpleLoading :show_loading="teacher_class_store.loading" />
        <div class="class-selected-main-content" v-if="teacher_class_store.selected_class !== null">
            <Breadcrumbs :items="breadcrumbs" />
            <div class="content-title">
                <span>
                    {{ teacher_class_store.selected_class.title }}
                </span>
                <span id="class_code"> class code: {{ teacher_class_store.selected_class.code }} </span>
            </div>
            <div class="content-body">
                <v-tabs v-model="tab">
                    <v-tab>
                        <span> Requests </span>
                        <v-badge
                            v-if="teacher_class_store.get_pending_students.length != 0"
                            color="error"
                            inline
                            :content="teacher_class_store.get_pending_students.length"
                        />
                    </v-tab>
                    <v-tab> <span> Class Roster </span> </v-tab>
                    <v-tab>
                        <span> Class Details </span>
                    </v-tab>
                </v-tabs>
                <v-divider />
                <br />
                <br />
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <br />
                        <br />
                        <Requests :pending_students="teacher_class_store.get_pending_students" />
                    </v-tab-item>
                    <v-tab-item>
                        <br />
                        <br />
                        <ClassRoster :class_details="teacher_class_store.selected_class" :class_roster="teacher_class_store.get_accepted_students" />
                    </v-tab-item>
                    <v-tab-item>
                        <ClassDetails :get_teacher="teacher_store.user" :get_class="teacher_class_store.selected_class" />
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
import { TeacherData } from "@/store/Teacher/TeacherData";
import { TeacherClassData } from "@/store/Teacher/TeacherClassData";
import Requests from "@/components/Teacher/all_classes/class_selected/requests/Requests.vue";
import ClassRoster from "@/components/Teacher/all_classes/class_selected/class_roster/ClassRoster.vue";
import ClassDetails from "@/components/Teacher/all_classes/class_selected/class_details/ClassDetails.vue";
import Breadcrumbs from "@/components/Commons/breadcrumbs/Breadcrumbs.vue";
import SimpleLoading from "@/components/Commons/loadings/SimpleLoading.vue";
import PageNotFound from "@/components/Teacher/page_not_found/PageNotFound.vue";

export default {
    components: {
        Requests,
        ClassRoster,
        ClassDetails,
        Breadcrumbs,
        SimpleLoading,
        PageNotFound,
    },

    data() {
        return {
            teacher_store: TeacherData(),
            teacher_class_store: TeacherClassData(),
            tab: 0,
            items: ["Requests", "Class Roster", "Class Details"],
            class_uuid: this.$route.params.class_title,
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

    created() {
        this.teacher_class_store.view_class(this.class_uuid);
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
    display: flexbox;
    flex-direction: column;
    padding: 25px 5% 25px 5%;
    background-color: var(--blue-1);
}

#class_code {
    float: right;
    font-size: 110%;
}

.content-title span {
    font-size: 1.4em;
    color: var(--white-1);
}

.content-body {
    width: 90%;
    margin: auto;
    margin-bottom: 100px;
}

@media only screen and (max-width: 800px) {
    .content-title {
        padding: 5%;
    }

    .content-title span {
        font-size: 1rem;
    }

    .content-body {
        width: 90%;
    }
}

@media only screen and (max-width: 450px) {
}
</style>
