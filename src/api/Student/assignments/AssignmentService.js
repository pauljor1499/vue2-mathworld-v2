import { Classes } from "../Data";

var all_classes = Classes;

//store temp assignment
var current_assignment = "";

export class AssignmentService {
    set_assignment(class_title, assignment_title) {
        var classes = JSON.parse(JSON.stringify(all_classes));
        classes.forEach((class_element) => {
            if (class_element.title === class_title) {
                var assignments = class_element.assignments;
                assignments.forEach((assignment) => {
                    if (assignment.title === assignment_title) {
                        current_assignment = this.set_random_assignment(assignment);
                    }
                });
            }
        });
    }

    get_assignment() {
        return current_assignment;
    }

    set_random_assignment(assignment) {
        assignment.questions.forEach((question) => {
            if (question.type == "multiple-choice") {
                //randomize choices
                var random_choices = this.set_random(question.choices);
                //change original choices
                question.choices = random_choices;
            }
        });
        //randomize questions
        var random_questions = this.set_random(assignment.questions);
        //change original questions
        assignment.questions = random_questions;
        // console.log(current_assignment);
        return JSON.parse(JSON.stringify(assignment));
    }

    set_random(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}
