var my_answers = {};

export class AnswersService {
    set_answers(answers) {
        my_answers = answers;
    }

    get_answers() {
        return my_answers;
    }

    set_answer(question_type, question_number, question_answer) {
        if (question_type == "multiple-choice") {
            my_answers[question_number] = {
                type: "multiple-choice",
                status: true,
                answer: question_answer,
            };
        } else if (question_type == "open-response") {
            my_answers[question_number] = {
                type: "open-response",
                status: true,
                answer: question_answer,
            };
        } else if (question_type == "checkbox") {
            my_answers[question_number] = {
                type: "checkbox",
                status: true,
                answer: JSON.parse(JSON.stringify(question_answer)),
            };
        } else if (question_type == "drag-and-drop") {
            my_answers[question_number] = {
                type: "drag-and-drop",
                status: true,
                answer: JSON.parse(JSON.stringify(question_answer)),
            };
        } else if (question_type == "range-type") {
            my_answers[question_number] = {
                type: "range-type",
                status: true,
                answer: JSON.parse(JSON.stringify(question_answer)),
            };
        } else if (question_type == "graph-type") {
            var arr = [];
            question_answer.forEach((item) => {
                Object.keys(item).forEach((key) => {
                    if (key == "latex") arr.push(item[key]);
                });
            });
            my_answers[question_number] = {
                type: "graph-type",
                status: true,
                answer: JSON.parse(JSON.stringify(arr)),
            };
        }
    }

    remove_answer(question_type, question_number) {
        if (question_type == "multiple-choice") {
            my_answers[question_number] = {
                type: "multiple-choice",
                status: false,
                answer: {
                    letter: "",
                    description: "",
                },
            };
        } else if (question_type == "open-response") {
            my_answers[question_number] = {
                type: "open-response",
                status: false,
                answer: "",
            };
        } else if (question_type == "checkbox") {
            my_answers[question_number] = {
                type: "checkbox",
                status: false,
                answer: [],
            };
        } else if (question_type == "drag-and-drop") {
            my_answers[question_number] = {
                type: "drag-and-drop",
                status: false,
                answer: [],
            };
        } else if (question_type == "range-type") {
            my_answers[question_number] = {
                type: "range-type",
                status: false,
                answer: [],
            };
        }
    }
}
