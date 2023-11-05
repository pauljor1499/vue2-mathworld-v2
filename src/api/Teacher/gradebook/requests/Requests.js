import { Classes } from "@/api/Teacher/Data";

var class_index = 0;

export class RequestsService {
    // get_class(class_title) {
    //     var index = Classes.findIndex((class_element) => class_element.title == class_title);
    //     if (index != -1) {
    //         class_index = index;
    //         return Classes[index];
    //     }
    // }

    get_class() {
        return Classes[class_index];
    }

    accept_student(student_entry) {
        var assignments = Classes[class_index].assignments;
        var initial_data = [];
        var counter = 0;

        assignments.forEach((assignment) => {
            initial_data.push({
                id: counter,
                test_title: assignment.title,
                score: null,
            });
            counter++;
        });

        student_entry["test_scores"] = JSON.parse(JSON.stringify(initial_data));

        var index = Classes[class_index].pending_students.findIndex((student) => student.id === student_entry.id);
        Classes[class_index].pending_students.splice(index, 1);
        Classes[class_index].students.push(student_entry);
        counter = 0;
    }

    reject_student(student_entry) {
        var index = Classes[class_index].pending_students.findIndex((student) => student.id === student_entry.id);
        Classes[class_index].pending_students.splice(index, 1);
    }
}
