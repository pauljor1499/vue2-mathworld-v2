import { Classes } from "../Data";

var all_classes = Classes;
var enrolled_classes = [
    {
        id: 0,
        status: "enrolled",
        title: "Algebra",
        code: "MWC-XYZ-1",
        section: "Section 1",
        class_schedule: "TTH (9:00am-10:00am)",
        description: "Class Description for Algebra",
        assignments: [
            {
                id: 0,
                title: "Implicit Differentiation (Level 1)",
                description: "Assignment 1",
                status: "New",
                date: {
                    open: "September 04, 2022 8:00 pm",
                    close: "November 04, 2022 8:00 pm",
                },
                score: "",
                questions: [
                    {
                        id: 1,
                        points: 2,
                        flag: false,
                        question: 'Write as a mathematical inequality:"9 is less than the product of M and N".',
                        choices: [
                            {
                                id: 1,
                                description: "9 < M × N",
                            },
                            {
                                id: 2,
                                description: "x > 4",
                            },
                            {
                                id: 3,
                                description: "9 > M × N",
                            },
                            {
                                id: 4,
                                description: "10 < N × M",
                            },
                        ],
                        answer: {
                            student: "",
                            test: {
                                id: 1,
                                description: "9 < M × N",
                            },
                        },
                    },

                    {
                        id: 2,
                        points: 2,
                        flag: false,
                        question: "Find the slope of the line perpendicular to the line y = (1/3)x - 7",
                        choices: [
                            {
                                id: 1,
                                description: "-2",
                            },
                            {
                                id: 2,
                                description: "-3",
                            },
                            {
                                id: 3,
                                description: "-4",
                            },
                            {
                                id: 4,
                                description: "-5",
                            },
                        ],
                        answer: {
                            student: "",
                            test: {
                                id: 2,
                                description: "-3",
                            },
                        },
                    },

                    {
                        id: 3,
                        points: 2,
                        flag: false,
                        question: "What is the slope of a line perpendicular to the line y = 6?",
                        choices: [
                            {
                                id: 1,
                                description: "0.",
                            },
                            {
                                id: 2,
                                description: "1",
                            },
                            {
                                id: 3,
                                description: "3",
                            },
                            {
                                id: 4,
                                description: "undefined",
                            },
                        ],
                        answer: {
                            student: "",
                            test: {
                                id: 4,
                                description: "undefined",
                            },
                        },
                    },
                ],
            },
            {
                id: 1,
                title: "Implicit Differentiation (Level 2)",
                description: "Assignment 2",
                status: "Done",
                date: {
                    open: "September 04, 2022 8:00 pm",
                    close: "November 04, 2022 8:00 pm",
                },
                score: "",
                questions: [
                    {
                        id: 1,
                        points: 2,
                        flag: false,
                        question: 'Write as a mathematical inequality:"9 is less than the product of M and N".',
                        choices: [
                            {
                                id: 1,
                                description: "9 < M × N",
                            },
                            {
                                id: 2,
                                description: "x > 4",
                            },
                            {
                                id: 3,
                                description: "9 > M × N",
                            },
                            {
                                id: 4,
                                description: "10 < N × M",
                            },
                        ],
                        answer: {
                            student: {
                                id: 1,
                                description: "9 < M × N",
                            },
                            test: {
                                id: 1,
                                description: "9 < M × N",
                            },
                        },
                    },

                    {
                        id: 2,
                        points: 2,
                        flag: false,
                        question: "Find the slope of the line perpendicular to the line y = (1/3)x - 7",
                        choices: [
                            {
                                id: 1,
                                description: "-2",
                            },
                            {
                                id: 2,
                                description: "-3",
                            },
                            {
                                id: 3,
                                description: "-4",
                            },
                            {
                                id: 4,
                                description: "-5",
                            },
                        ],
                        answer: {
                            student: "",
                            test: {
                                id: 2,
                                description: "-3",
                            },
                        },
                    },

                    {
                        id: 3,
                        points: 2,
                        flag: false,
                        question: "What is the slope of a line perpendicular to the line y = 6?",
                        choices: [
                            {
                                id: 1,
                                description: "0.",
                            },
                            {
                                id: 2,
                                description: "1",
                            },
                            {
                                id: 3,
                                description: "3",
                            },
                            {
                                id: 4,
                                description: "undefined",
                            },
                        ],
                        answer: {
                            student: {
                                id: 3,
                                description: "3",
                            },
                            test: {
                                id: 4,
                                description: "undefined",
                            },
                        },
                    },
                ],
            },
            {
                id: 2,
                title: "Implicit Differentiation (Level 3)",
                description: "Assignment 3",
                status: "Closed",
                date: {
                    open: "September 04, 2022 8:00 pm",
                    close: "November 04, 2022 8:00 pm",
                },
                score: "",
                questions: [
                    {
                        id: 1,
                        points: 2,
                        flag: false,
                        question: "Find the degree and constant term of the polynomial x4 + 7x3 - 2x.",
                        choices: [
                            {
                                id: 1,
                                description: "Degree 7, constant = 1.",
                            },
                            {
                                id: 2,
                                description: "Degree 8, constant = 1.5.",
                            },
                            {
                                id: 3,
                                description: "Degree 10, constant = 2.",
                            },
                            {
                                id: 4,
                                description: "Degree 11, constant = 3.",
                            },
                        ],
                        answer: {
                            student: "",
                            test: {
                                id: 4,
                                description: "Degree 11, constant = 3.",
                            },
                        },
                    },
                ],
            },
            {
                id: 3,
                title: "Implicit Differentiation (Level 4)",
                description: "Assignment 4",
                status: "Unsubmitted",
                date: {
                    open: "September 04, 2022 8:00 pm",
                    close: "November 04, 2022 8:00 pm",
                },
                score: "",
                questions: [
                    {
                        id: 1,
                        points: 2,
                        flag: false,
                        question: "Find the degree and constant term of the polynomial x4 + 7x3 - 2x.",
                        choices: [
                            {
                                id: 1,
                                description: "Degree 7, constant = 1.",
                            },
                            {
                                id: 2,
                                description: "Degree 8, constant = 1.5.",
                            },
                            {
                                id: 3,
                                description: "Degree 10, constant = 2.",
                            },
                            {
                                id: 4,
                                description: "Degree 11, constant = 3.",
                            },
                        ],
                        answer: {
                            student: "",
                            test: {
                                id: 4,
                                description: "Degree 11, constant = 3.",
                            },
                        },
                    },
                ],
            },
        ],

        class_roster: [
            {
                id: 0,
                photo: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                first_name: "Daniel",
                middle_name: "",
                last_name: "Hopkins",
                email: "danielhopkins@gmail.com",
            },
            {
                id: 1,
                photo: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                first_name: "Matthew ",
                middle_name: "",
                last_name: "Harris",
                email: "mathhewharris@gmail.com",
            },
            {
                id: 2,
                photo: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                first_name: "Aiden",
                middle_name: "",
                last_name: "Sharp",
                email: "aidensharp@gmail.com",
            },
            {
                id: 3,
                photo: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                first_name: "Cedric",
                middle_name: "",
                last_name: "Moran",
                email: "cedricmoran@gmail.com",
            },
            {
                id: 4,
                photo: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                first_name: "Thomas",
                middle_name: "",
                last_name: "Brooks",
                email: "thomasbrooks@gmail.com",
            },
        ],

        tests: [
            {
                test_title: "Test 1 for MathWorld Class",
                date_submitted: "January 18, 2022",
                season: "Fall, 2022",
                grades: [
                    {
                        my_grade: 90,
                        min_grade: 75,
                        first_quartile: 84,
                        median_grade: 87,
                        third_quartile: 91,
                        max_grade: 95,
                        class_average: 84.56,
                        total_students: 128,
                    },
                ],
            },

            {
                test_title: "Test 2 for MathWorld Class",
                date_submitted: "March 18, 2022",
                season: "Fall, 2022",
                grades: [
                    {
                        my_grade: 90,
                        min_grade: 75,
                        first_quartile: 84,
                        median_grade: 87,
                        third_quartile: 91,
                        max_grade: 95,
                        class_average: 84.56,
                        total_students: 128,
                    },
                ],
            },

            {
                test_title: "Test 3 for MathWorld Class",
                date_submitted: "September 18, 2022",
                season: "Fall, 2022",
                grades: [
                    {
                        my_grade: 90,
                        min_grade: 75,
                        first_quartile: 84,
                        median_grade: 87,
                        third_quartile: 91,
                        max_grade: 95,
                        class_average: 84.56,
                        total_students: 128,
                    },
                ],
            },
        ],

        class_details: {
            teacher: {
                photo: require("@/assets/male.jpg"),
                name: "Jordan Williams",
            },
        },
    },
];

export class AllClassesService {
    get_all_class() {
        return all_classes;
    }

    get_class(class_name) {
        const index = all_classes.findIndex((item) => item.title === class_name);
        return all_classes[index];
    }

    get_enrolled_classes() {
        return enrolled_classes;
    }

    enroll_new_class(class_code) {
        if (this.class_exists(class_code)) {
            return "You are already enrolled to this class.";
        } else {
            var index = all_classes.findIndex((class_element) => class_element.code === class_code);
            if (index > -1) {
                all_classes[index].status = "pending";
                enrolled_classes.push(all_classes[index]);
                return true;
            }
            return "Couldn't join the class. Check the class code and try again.";
        }
    }

    class_exists(class_code) {
        var index = enrolled_classes.findIndex((class_element) => class_element.code === class_code);
        if (index > -1) {
            return true;
        }
        return false;
    }
}
