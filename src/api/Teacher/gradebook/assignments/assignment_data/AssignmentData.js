import { Classes } from "@/api/Teacher/Data";

var class_index = 0;

export class AssignmentDataService {
    get_class(class_title) {
        var index = Classes.findIndex((class_element) => class_element.title == class_title);
        if (index != -1) {
            class_index = index;
            return Classes[index];
        }
    }

    get_students(test_id) {
        var arr = [];
        Classes[class_index].students.forEach((student) => {
            arr.push({
                firstname: student.firstname,
                middlename: student.middlename,
                lastname: student.lastname,
                correct_answers: student.test_scores[test_id].score,
            });
        });
        return arr;
    }

    get_answers_headers(test_id) {
        var arr = [];
        var questions = Classes[class_index].assignments[test_id].questions;
        for (var i = 0; i < questions.length; i++) {
            arr.push({
                text: i + 1 + "(" + questions[i].answer + ")",
                align: "start",
                sortable: false,
                value: i + 1 + "",
            });
        }
        return arr;
    }

    get_student_answers(test_id) {
        var arr = [];
        var obj = {};
        var test_title = Classes[class_index].assignments[test_id].title;
        var students = Classes[class_index].students;
        students.forEach((student) => {
            student.test_scores.forEach((test) => {
                if (test.test_title === test_title) {
                    Object.keys(test).forEach((key) => {
                        if (key !== "id" && key !== "test_title" && key !== "score") {
                            obj[key] = test[key];
                        }
                    });
                    arr.push(obj);
                    obj = {};
                }
            });
        });
        console.log(arr);
        return arr;
    }

    get_correct_answers(test_id) {
        var arr = [];
        var questions = Classes[class_index].assignments[test_id].questions;
        questions.forEach((item) => {
            arr.push(item.answer);
        });
        return arr;
    }
}
