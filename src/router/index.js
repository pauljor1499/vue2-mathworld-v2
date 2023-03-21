import Vue from "vue";
import VueRouter from "vue-router";

//Main Pages
import MainPage from "@/views/Main/MainPage.vue";
import SignInPage from "@/components/Main/sign_in_page/MainPage.vue";
import SignUp from "@/components/Main/sign_up_page/MainPage.vue";
import LandingPage from "@/components/Main/landing_page/MainPage.vue";
import AboutPage from "@/components/Main/about_page/MainPage.vue";
import PageNotFound from "@/components/Main/page_not_found/PageNotFound.vue";

//Teacher Pages
import TeacherPage from "@/views/Teacher/TeacherPage.vue";
import TeacherDashboard from "@/components/Teacher/dashboard/MainPage.vue";
import TeacherProfile from "@/components/Teacher/profile_page/ProfilePage.vue";
import TeacherNotFound from "@/components/Teacher/page_not_found/PageNotFound.vue";
//All Classes Page
import TeacherAllClasses from "@/components/Teacher/all_classes/MainPage.vue";
import TeacherAllClassesMain from "@/components/Teacher/all_classes/classes/AllClasses.vue";
import TeacherViewClass from "@/components/Teacher/all_classes/class_selected/ViewClass.vue";
//Gradebook Page
import TeacherGradebook from "@/components/Teacher/gradebook/main/MainPage.vue"; //Parent Page
import TeacherClassMain from "@/components/Teacher/gradebook/main/class_selected/Main.vue";
import TeacherClassContent from "@/components/Teacher/gradebook/main/class_selected/AllContent.vue";
import GradebookClasses from "@/components/Teacher/gradebook/main/classes/MainPage.vue";
import GradebookAssignment from "@/components/Teacher/gradebook/assignments/Assignment.vue";
import GradebookUpdateAssignment from "@/components/Teacher/gradebook/assignments/update_assignment/UpdateAssignment.vue";
import GradebookViewAssignment from "@/components/Teacher/gradebook/assignments/selected_assignment/SelectedAssignment.vue";
import TeacherAssignmentData from "@/components/Teacher/gradebook/assignments/assignment_data/AssignmentData.vue";
//Assignments
import TeacherAssignments from "@/components/Teacher/assignments/main/Assignments.vue";
import TeacherNewAssignment from "@/components/Teacher/assignments/main/new_assignment/NewAssignment.vue";
import TeacherAssignmentPage from "@/components/Teacher/assignments/main/MainPage.vue";
import TeacherAssignmentPreview from "@/components/Teacher/gradebook/assignments/preview_assignment/AssignmentPreview.vue";

//Student Pages
import StudentPage from "@/views/Student/StudentPage.vue";
import StudentProfile from "@/components/Student/profile_page/ProfilePage.vue";
//Classes Page
import StudentClasses from "@/components/Student/classes/main/Main.vue";
import StudentClass from "@/components/Student/classes/class_selected/ClassSelected.vue";

import StudentClassSelected from "@/components/Student/classes/class_selected/AllContent.vue";
import StudentViewAssignment from "@/components/Student/classes/class_selected/assignments/main/ViewAssignment";
import StudentNotes from "@/components/Student/notes/Notes.vue";
import StudentNotFound from "@/components/Student/page_not_found/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: MainPage,
        children: [
            {
                path: "",
                component: LandingPage,
            },

            {
                path: "about",
                component: AboutPage,
            },

            {
                path: "signin",
                component: SignInPage,
            },

            {
                path: "register",
                component: SignUp,
            },
        ],
    },

    {
        path: "/teacher",
        component: TeacherPage,
        children: [
            {
                path: "",
                component: TeacherDashboard,
            },

            {
                path: "profile",
                component: TeacherProfile,
            },

            {
                path: "all-classes",
                component: TeacherAllClasses,
                props: true,
                children: [
                    {
                        path: "",
                        component: TeacherAllClassesMain,
                        props: true,
                    },
                    {
                        path: ":class_title",
                        name: "TeacherViewClass",
                        component: TeacherViewClass,
                        props: true,
                    },
                ],
            },

            {
                path: "assignments",
                component: TeacherAssignments,
                props: true,
                children: [
                    {
                        path: "",
                        name: "Assignments",
                        component: TeacherAssignmentPage,
                        props: true,
                    },

                    {
                        path: ":assignment_type/new",
                        name: "NewAssignment",
                        component: TeacherNewAssignment,
                        props: true,
                    },
                ],
            },

            {
                path: "gradebook",
                component: TeacherGradebook,
                children: [
                    {
                        path: "",
                        component: GradebookClasses,
                        props: true,
                    },

                    {
                        path: ":class_title",
                        component: TeacherClassMain,
                        props: true,
                        children: [
                            {
                                path: "",
                                name: "ClassSelected",
                                component: TeacherClassContent,
                                props: true,
                            },

                            {
                                path: "assignments/:assignment_type/:assignment_code",
                                component: GradebookAssignment,
                                props: true,
                                children: [
                                    {
                                        path: "",
                                        name: "SelectedAssignment",
                                        component: GradebookViewAssignment,
                                        props: true,
                                    },

                                    {
                                        path: "update",
                                        name: "UpdateAssignment",
                                        component: GradebookUpdateAssignment,
                                        props: true,
                                    },

                                    {
                                        path: "data",
                                        name: "AssignmentData",
                                        component: TeacherAssignmentData,
                                        props: true,
                                    },

                                    {
                                        path: "preview",
                                        name: "AssignmentPreview",
                                        component: TeacherAssignmentPreview,
                                        props: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },

            {
                path: "404",
                alias: "*",
                name: "TeacherNotFound",
                component: TeacherNotFound,
            },
        ],
    },

    {
        path: "/student",
        component: StudentPage,
        children: [
            {
                path: "",
                component: StudentClasses,
            },

            {
                path: "class/:classTitle",
                component: StudentClass,
                props: true,
                children: [
                    {
                        path: "",
                        name: "StudentClassSelected",
                        component: StudentClassSelected,
                        props: true,
                    },

                    {
                        path: "assignment/:assignmentTitle",
                        name: "StudentViewAssignment",
                        component: StudentViewAssignment,
                        props: true,
                    },
                ],
            },

            {
                path: "profile",
                component: StudentProfile,
            },

            {
                path: "notes",
                component: StudentNotes,
            },

            {
                path: "404",
                alias: "*",
                name: "StudentNotFound",
                component: StudentNotFound,
            },
        ],
    },

    {
        path: "/404",
        alias: "*",
        name: "PageNotFound",
        component: PageNotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: "smooth",
            };
        }
    },
});

export default router;
