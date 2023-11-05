import { Classes } from "@/api/Teacher/Data";

var class_index = 0;

export class ClassPeriodsService {
    get_class(class_title) {
        var index = Classes.findIndex((class_element) => class_element.title == class_title);
        if (index != -1) {
            class_index = index;
            return Classes[index];
        }
    }

    get_headers() {
        var assignments = Classes[class_index].assignments;
        var headers = [
            {
                text: "#",
                sortable: false,
                value: "number",
            },
            {
                text: "Last name",
                sortable: false,
                value: "lastname",
            },
            {
                text: "First name",
                sortable: false,
                value: "firstname",
            },
            {
                text: "Middle name",
                sortable: false,
                value: "middlename",
            },
        ];
        var counter = 0;
        assignments.forEach((assignment) => {
            Object.keys(assignment).forEach((key) => {
                if (key === "title") {
                    headers.push({
                        text: assignment[key],
                        sortable: false,
                        value: "test_" + counter,
                    });
                }
            });
            counter++;
        });
        headers.push({
            text: "Average",
            sortable: false,
            value: "average",
        });
        return headers;
    }

    get_records() {
        var students = Classes[class_index].students;
        var scores = [];

        students.forEach((student) => {
            var test_scores = student.test_scores;
            var student_scores = {};
            var counter = 0;
            var average = 0;

            test_scores.forEach((test) => {
                student_scores["test_" + counter] = test.score;
                average += test.score;
                counter++;
            });

            student_scores["id"] = student.id;
            student_scores["firstname"] = student.firstname;
            student_scores["middlename"] = student.middlename;
            student_scores["lastname"] = student.lastname;
            student_scores["average"] = (average / counter).toFixed(2);

            scores.push(student_scores);
            student_scores = {};
            counter = 0;
            average = 0;
        });
        return scores;
    }
}
