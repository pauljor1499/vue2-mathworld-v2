import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("@/views/Main/MainPage.vue"),
        children: [
            {
                path: "",
                component: () => import("@/components/Main/landing_page/MainPage.vue"),
            },
            {
                path: "about",
                component: () => import("@/components/Main/about_page/MainPage.vue"),
            },
            {
                path: "contact",
                component: () => import("@/components/Main/contact_page/MainPage.vue"),
            },
            {
                path: "signin",
                component: () => import("@/components/Main/sign_in_page/MainPage.vue"),
            },
            {
                path: "register",
                component: () => import("@/components/Main/sign_up_page/MainPage.vue"),
            },
            {
                path: "sample",
                component: () => import("./SamplePage.vue"),
            },
            {
                path: "support",
                component: () => import("@/components/Main/forgot_password/ForgotPassword.vue"),
            },
        ],
    },
    {
        path: "/teacher",
        props: true,
        component: () => import("@/views/Teacher/TeacherPage.vue"),
        children: [
            {
                path: "",
                name: "TeacherDashboard",
                props: true,
                component: () => import("@/components/Teacher/dashboard/MainPage.vue"),
            },
            {
                path: "profile",
                props: true,
                component: () => import("@/components/Teacher/profile_page/ProfilePage.vue"),
            },
            {
                path: "all-classes",
                props: true,
                component: () => import("@/components/Teacher/all_classes/MainPage.vue"),
                children: [
                    {
                        path: "",
                        name: "TeacherAllClassesMain",
                        props: true,
                        component: () => import("@/components/Teacher/all_classes/classes/AllClasses.vue"),
                    },
                    {
                        path: ":class_title",
                        name: "TeacherViewClass",
                        props: true,
                        component: () => import("@/components/Teacher/all_classes/class_selected/ViewClass.vue"),
                    },
                ],
            },
            {
                path: "gradebook",
                component: () => import("@/components/Teacher/gradebook/main/MainPage.vue"),
                children: [
                    {
                        path: "",
                        props: true,
                        component: () => import("@/components/Teacher/gradebook/main/classes/Gradebook.vue"),
                    },
                    {
                        path: ":class_title",
                        props: true,
                        component: () => import("@/components/Teacher/gradebook/main/class_selected/Main.vue"),
                        children: [
                            {
                                path: "",
                                name: "ClassSelected",
                                props: true,
                                component: () => import("@/components/Teacher/gradebook/main/class_selected/AllContent.vue"),
                            },
                            {
                                path: "assignments/:assignment_type/:assignment_code",
                                props: true,
                                component: () => import("@/components/Teacher/gradebook/assignments/Assignment.vue"),
                                children: [
                                    {
                                        path: "",
                                        name: "SelectedAssignment",
                                        props: true,
                                        component: () =>
                                            import("@/components/Teacher/gradebook/assignments/selected_assignment/SelectedAssignment.vue"),
                                    },
                                    {
                                        path: "update",
                                        name: "UpdateAssignment",
                                        props: true,
                                        component: () => import("@/components/Teacher/gradebook/assignments/update_assignment/UpdateAssignment.vue"),
                                    },
                                    {
                                        path: "data",
                                        name: "AssignmentData",
                                        props: true,
                                        component: () => import("@/components/Teacher/gradebook/assignments/assignment_data/AssignmentData.vue"),
                                    },
                                    {
                                        path: "preview",
                                        name: "AssignmentPreview",
                                        props: true,
                                        component: () =>
                                            import("@/components/Teacher/gradebook/assignments/preview_assignment/AssignmentPreview.vue"),
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: "assignments",
                component: () => import("@/components/Teacher/assignments/main/Main.vue"),
                props: true,
                children: [
                    {
                        path: "",
                        name: "Assignments",
                        component: () => import("@/components/Teacher/assignments/main/Assignments/Assignments.vue"),
                        props: true,
                    },
                    {
                        path: "data/:assignment_code",
                        name: "AssignmentAnalytics",
                        component: () => import("@/components/Teacher/assignments/main/Assignments/MyAssignments/Analytics/Analytics.vue"),
                        props: true,
                    },
                    {
                        path: ":assignment_type/new",
                        name: "NewAssignment",
                        component: () => import("@/components/Teacher/assignments/main/new_assignment/NewAssignment.vue"),
                        props: true,
                    },
                    {
                        path: ":assignment_code",
                        name: "ViewAssignment",
                        component: () => import("@/components/Teacher/assignments/main/Assignments/MyAssignments/view_assignment/ViewAssignment.vue"),
                        props: true,
                    },
                ],
            },
            {
                path: "404",
                alias: "*",
                name: "TeacherNotFound",
                component: () => import("@/components/Teacher/page_not_found/PageNotFound.vue"),
            },
        ],
    },
    {
        path: "/student",
        component: () => import("@/views/Student/StudentPage.vue"),
        children: [
            {
                path: "",
                component: () => import("@/components/Student/classes/main/Main.vue"),
            },
            {
                path: "class/:class_title",
                props: true,
                component: () => import("@/components/Student/classes/class_selected/ClassSelected.vue"),
                children: [
                    {
                        path: "",
                        name: "StudentClassSelected",
                        props: true,
                        component: () => import("@/components/Student/classes/class_selected/AllContent.vue"),
                    },
                    {
                        path: "assignment/:assignmentTitle",
                        name: "StudentViewAssignment",
                        props: true,
                        component: () => import("@/components/Student/classes/class_selected/assignments/main/ViewAssignment"),
                    },
                ],
            },
            {
                path: "profile",
                component: () => import("@/components/Student/profile_page/ProfilePage.vue"),
            },
            {
                path: "notes",
                component: () => import("@/components/Student/notes/Notes.vue"),
            },
            {
                path: "404",
                alias: "*",
                name: "StudentNotFound",
                component: () => import("@/components/Student/page_not_found/PageNotFound.vue"),
            },
        ],
    },
    {
        path: "/404",
        alias: "*",
        name: "PageNotFound",
        component: () => import("@/components/Main/page_not_found/PageNotFound.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    //page up effect
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
