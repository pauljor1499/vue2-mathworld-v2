export let Classes = [
    {
        id: 0,
        title: "Algebra",
        code: "MWC-XYZ-1",
        section: "Section 1",
        class_schedule: "TTH (9:00am-10:00am)",
        description: "Class Description for Algebra",
        assignments: [
            {
                id: 0,
                title: "Implicit Differentiation Title",
                description: "Assignment 1 Description",
                status: "New",
                calculator: false,
                date: {
                    open: "September 04, 2022 8:00 pm",
                    close: "November 04, 2022 8:00 pm",
                },
                score: "",
                questions: [
                    {
                        id: 0,
                        points: 2,
                        flag: false,
                        type: "multiple-choice",
                        question:
                            'Write as a mathematical inequality: "9 is less than the product of M and N".',
                        choices: [
                            "9 < M × N 9 < M × N9 < M × N9 < M × N9 < M × N",
                            "x > 4",
                            "9 > M × N",
                            "10 < N × M",
                        ],
                        answer: {
                            student_answer: {
                                letter: "",
                                description: "",
                            },
                            test_answer: {
                                letter: "",
                                description: "",
                            },
                        },
                    },

                    {
                        id: 1,
                        points: 2,
                        flag: false,
                        type: "open-response",
                        question:
                            "Find the slope of the line perpendicular to the line y = (1/3)x - 7",
                        answer: {
                            student_answer: "",
                            test_answer: "",
                        },
                    },

                    {
                        id: 2,
                        points: 2,
                        flag: false,
                        type: "checkbox",
                        question:
                            "What is the slope of a line perpendicular to the line y = 6?",
                        choices: [
                            "The answer is 0.",
                            "The answer is 1.",
                            "The answer is 3.",
                            "The answer is undefined.",
                        ],
                        answer: {
                            student_answer: [],
                            test_answer: [],
                        },
                    },

                    {
                        id: 3,
                        points: 2,
                        flag: false,
                        type: "drag-and-drop",
                        question:
                            "What is the slope of a line perpendicular to the line y = 6?",
                        choices: [
                            "The answer is 0.",
                            "The answer is 1.",
                            "The answer is 3.",
                            "The answer is undefined.",
                        ],
                        answer: {
                            student_answer: [],
                            test_answer: [],
                        },
                    },

                    {
                        id: 4,
                        points: 2,
                        flag: false,
                        type: "range-type",
                        question:
                            "What is the slope of a line perpendicular to the line y = 6?",
                        choices: {
                            min: -20,
                            max: -1,
                        },
                        answer: {
                            student_answer: [],
                            test_answer: [],
                        },
                    },

                    {
                        id: 4,
                        points: 2,
                        flag: false,
                        type: "graph-type",
                        question:
                            "What is the slope of a line perpendicular to the line y = 6?",
                        answer: {
                            student_answer: [],
                            test_answer: [],
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
