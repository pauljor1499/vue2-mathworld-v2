import { Classes } from "@/api/Teacher/Data";
import { all_questions } from "./Questions";

var new_assignment = {
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

export class MW_NewAssignment {
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

    getNewAssignment() {
        return new_assignment;
    }

    submit_Step1(title, description) {
        try {
            new_assignment.title = title;
            new_assignment.description = description;
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    submit_Step2(selected_questions) {
        try {
            new_assignment.questions = JSON.parse(JSON.stringify(selected_questions));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    submit_Step3(start_date, end_date, class_assigned) {
        try {
            new_assignment.date_open = this.formatDate(start_date);
            new_assignment.date_close = this.formatDate(end_date);
            new_assignment.assigned_classes = JSON.parse(JSON.stringify(class_assigned));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    submit_Step4() {
        try {
            var reset_new_assignment = {
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

            var date_start = new Date(new_assignment.date_open);
            var date_end = new Date(new_assignment.date_close);
            var today = new Date();

            if (today < date_start && today < date_end) {
                new_assignment.status = "undeployed";
            } else if (today >= date_start && today <= date_end) {
                new_assignment.status = "open";
            } else if (today > date_start && today > date_end) {
                new_assignment.status = "close";
            }

            for (var i = 0; i < new_assignment.assigned_classes.length; i++) {
                var index = Classes.findIndex((class_el) => class_el.title == new_assignment.assigned_classes[i]);
                if (index > -1) {
                    var assignments = Classes[index].assignments;
                    new_assignment.id = assignments.length;
                    new_assignment.type = "MW";
                    assignments.push(new_assignment);
                }
            }
            new_assignment = JSON.parse(JSON.stringify(reset_new_assignment));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    formatDate(date) {
        return new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
}
