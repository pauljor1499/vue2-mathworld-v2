export let all_classes = [
    {
        id: 0,
        title: "Algebra",
        description: "Class Title for Algebra",
        code: "MWC-XYZ-0",
        section: "Section 1",
        schedules: [
            {
                day: "Monday",
                time: {
                    start: "8:00 AM",
                    end: "9:00 AM",
                },
            },
            {
                day: "Wednesday",
                time: {
                    start: "8:00 AM",
                    end: "9:00 AM",
                },
            },
            {
                day: "Friday",
                time: {
                    start: "8:00 AM",
                    end: "9:00 AM",
                },
            },
        ],
        assignments: [
            {
                id: 0,
                type: "MW",
                title: "Test 1",
                description: "Test Description",
                status: "close",
                date_open: "Feb 06, 2023, 03:53 PM",
                date_close: "Feb 09, 2023, 03:53 PM",
                questions: [
                    {
                        id: 0,
                        points: 2,
                        flag: false,
                        type: "multiple-choice",
                        algebra_term: "Monomial",
                        unit: "Unit 1",
                        category: "Category 1",
                        difficulty: "Easy",
                        teks: ["TEKS-S1", "TEKS-S2", "TEKS-S14"],
                        question:
                            "This is a math world question 1. Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu?",
                        choices: ["Option 1", "Option 2", "Option 3"],
                        answer: "A",
                    },
                    {
                        id: 1,
                        points: 2,
                        flag: false,
                        type: "open-response",
                        algebra_term: "Polynomial",
                        unit: "Unit 2",
                        category: "Category 3",
                        difficulty: "Difficult",
                        teks: ["TEKS-S1", "TEKS-S8", "TEKS-S13"],
                        question:
                            "This is a math world question 2. Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu?",
                        choices: ["Option 1", "Option 2", "Option 3"],
                        answer: "B",
                    },
                    {
                        id: 2,
                        points: 3,
                        flag: false,
                        type: "checkbox",
                        algebra_term: "Binomial",
                        unit: "Unit 3",
                        category: "Category 2",
                        difficulty: "Average",
                        teks: ["TEKS-S3", "TEKS-S19", "TEKS-S11"],
                        question:
                            "This is a math world question 3. Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu?",
                        choices: ["Option 1", "Option 2", "Option 3"],
                        answer: [],
                    },
                    {
                        id: 3,
                        points: 2,
                        flag: false,
                        type: "range-type",
                        algebra_term: "Binomial",
                        unit: "Unit 3",
                        category: "Category 2",
                        difficulty: "Average",
                        teks: ["TEKS-S4", "TEKS-S3", "TEKS-S5"],
                        question:
                            "This is a math world question 4. Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu?",
                        choices: ["Option 1", "Option 2", "Option 3"],
                        answer: [null, null],
                    },
                    {
                        id: 4,
                        points: 3,
                        flag: false,
                        type: "drag-and-drop",
                        algebra_term: "Binomial",
                        unit: "Unit 3",
                        category: "Category 2",
                        difficulty: "Average",
                        teks: ["TEKS-S5", "TEKS-S12", "TEKS-S16"],
                        question:
                            "This is a math world question 5. Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu?",
                        choices: ["Option 1", "Option 2", "Option 3"],
                        answer: [],
                    },
                    {
                        id: 5,
                        points: 3,
                        flag: false,
                        type: "graph-type",
                        algebra_term: "Binomial",
                        unit: "Unit 3",
                        category: "Category 2",
                        difficulty: "Average",
                        teks: ["TEKS-S5", "TEKS-S12", "TEKS-S16"],
                        question:
                            "This is a math world question 5. Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsu?",
                        choices: ["Option 1", "Option 2", "Option 3"],
                        answer: [],
                    },
                ],
                assigned_classes: ["Algebra"],
            },
        ],
        students: [
            {
                id: 0,
                firstname: "Jason",
                middlename: "James",
                lastname: "Williams",
                email: "jasonwilliams@gmail.com",
                contact_number: "+1-202-555-0190",
                test_scores: [
                    {
                        id: 0,
                        test_title: "Test 1",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 68,
                    },
                    {
                        id: 1,
                        test_title: "Test 2",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 82,
                    },
                    {
                        id: 2,
                        test_title: "Test 3",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 83,
                    },
                ],
            },
            {
                id: 1,
                firstname: "Kimberly",
                middlename: "Johnson",
                lastname: "Starr",
                email: "kimberlystarr@gmail.com",
                contact_number: "+1-202-555-0190",
                test_scores: [
                    {
                        id: 0,
                        test_title: "Test 1",
                        1: "E",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 75,
                    },
                    {
                        id: 1,
                        test_title: "Test 2",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 73,
                    },
                    {
                        id: 2,
                        test_title: "Test 3",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 75,
                    },
                ],
            },
            {
                id: 2,
                firstname: "Erick",
                middlename: "Blake",
                lastname: "Samson",
                email: "ericksamson@gmail.com",
                contact_number: "+1-202-555-0190",
                test_scores: [
                    {
                        id: 0,
                        test_title: "Test 1",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 89,
                    },
                    {
                        id: 1,
                        test_title: "Test 2",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 89,
                    },
                    {
                        id: 2,
                        test_title: "Test 3",
                        1: "A",
                        2: "B",
                        3: "C",
                        4: "D",
                        5: "E",
                        6: "F",
                        score: 89,
                    },
                ],
            },
        ],
        pending_students: [
            {
                id: 3,
                firstname: "Jason",
                middlename: "Zimmer",
                lastname: "Willis",
                email: "willisjason@gmail.com",
                contact_number: "+1-202-555-0190",
            },
            {
                id: 4,
                firstname: "Mark",
                middlename: "Phills",
                lastname: "Anthony",
                email: "anthonymark@gmail.com",
                contact_number: "+1-202-555-0190",
            },
            {
                id: 5,
                firstname: "Jake",
                middlename: "Angel",
                lastname: "Blast",
                email: "blastjake@gmail.com",
                contact_number: "+1-202-555-0190",
            },
        ],
    },
    {
        id: 1,
        title: "Algebra 2",
        code: "MWC-XYZ-1",
        section: "Section 1",
        description: "Class Title for Algebra",
        teacher: {
            firstname: "Teacher",
            middlename: "",
            lastname: "1",
        },
        schedules: [
            {
                day: "Monday",
                time: {
                    start: "8:00 AM",
                    end: "9:00 AM",
                },
            },
            {
                day: "Wednesday",
                time: {
                    start: "8:00 AM",
                    end: "9:00 AM",
                },
            },
            {
                day: "Friday",
                time: {
                    start: "8:00 AM",
                    end: "9:00 AM",
                },
            },
        ],
        assignments: [],
        students: [],
        pending_students: [],
    },
];