import { Classes } from "@/api/Teacher/Data";
import { all_questions } from "./Questions";

var edit_assignment = {
    id: null,
    type: null,
    title: null,
    description: null,
    status: null,
    date_open: null,
    date_close: null,
    questions: [],
    assigned_classes: [],
};

export class STAAR_EditAssignment {
    set_assignment(class_title, assignment_id) {
        var index = Classes.findIndex((class_el) => class_el.title == class_title);
        if (index > -1) {
            var assignment_index = Classes[index].assignments.findIndex((assignment) => assignment.id == assignment_id);
            if (assignment_index > -1) {
                edit_assignment = JSON.parse(JSON.stringify(Classes[index].assignments[assignment_index]));
            }
        }
    }

    getAllQuestions() {
        return all_questions;
    }

    get_all_classes() {
        var all_classes = [];
        Classes.forEach((class_element) => {
            all_classes.push(class_element.title);
        });
        return all_classes;
    }

    getEditAssignment() {
        return edit_assignment;
    }

    submit_Step1(title, description) {
        try {
            edit_assignment.title = title;
            edit_assignment.description = description;
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    submit_Step2(selected_questions) {
        try {
            edit_assignment.questions = JSON.parse(JSON.stringify(selected_questions));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    submit_Step3(start_date, end_date, class_assigned) {
        try {
            function formatDate(date) {
                return new Date(date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            }

            edit_assignment.date_open = formatDate(start_date);
            edit_assignment.date_close = formatDate(end_date);
            edit_assignment.assigned_classes = JSON.parse(JSON.stringify(class_assigned));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    submit_Step4() {
        try {
            var reset_edit_assignment = {
                id: null,
                type: null,
                title: null,
                description: null,
                status: null,
                date_open: null,
                date_close: null,
                questions: [],
                assigned_classes: [],
            };

            function set_date(date_open, date_close) {
                var date_start = new Date(date_open);
                var date_end = new Date(date_close);
                var today = new Date();
                if (today < date_start && today < date_end) {
                    edit_assignment.status = "undeployed";
                } else if (today >= date_start && today <= date_end) {
                    edit_assignment.status = "open";
                } else if (today > date_start && today > date_end) {
                    edit_assignment.status = "close";
                }
            }

            function remove_assignment_from_classes() {
                Classes.forEach((class_el) => {
                    var index = class_el.assignments.findIndex((assignment) => assignment.title == edit_assignment.title);
                    class_el.assignments.splice(index, 1);
                });
            }

            function add_assignment_to_classes(assigned_classes) {
                for (var i = 0; i < assigned_classes.length; i++) {
                    var index = Classes.findIndex((class_el) => class_el.title == edit_assignment.assigned_classes[i]);
                    if (index > -1) {
                        edit_assignment.id = Classes[index].assignments.length;
                        Classes[index].assignments.push(edit_assignment);
                    }
                }
            }

            set_date(edit_assignment.date_open, edit_assignment.date_close);
            remove_assignment_from_classes();
            add_assignment_to_classes(edit_assignment.assigned_classes);
            edit_assignment = JSON.parse(JSON.stringify(reset_edit_assignment));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
