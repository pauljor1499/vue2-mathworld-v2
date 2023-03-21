import { Classes } from "@/api/Teacher/Data";

var class_index = -1;

export class ClassPeriodsService {
    get_class(class_title) {
        var index = Classes.findIndex(
            (class_element) => class_element.title == class_title
        );
        if (index != -1) {
            class_index = index;
            return Classes[index];
        }
    }

    get_test_headers() {
        var assignments = Classes[class_index].assignments;
        var headers = [];
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
        return headers;
    }

    get_students() {
        var students = Classes[class_index].students;
        var scores = [];

        students.forEach((student) => {
            var test_scores = student.test_scores;
            var student_scores = {};
            var counter = 0;

            test_scores.forEach((test) => {
                student_scores["test_" + counter] = test.score; //add new property
                counter++;
            });

            student_scores["id"] = student.id;
            student_scores["firstname"] = student.firstname;
            student_scores["middlename"] = student.middlename;
            student_scores["lastname"] = student.lastname;

            scores.push(student_scores);
            student_scores = {};
            counter = 0;
        });
        return scores;
    }
}
