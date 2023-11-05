import { Classes } from "@/api/Teacher/Data";

var current_class = "";

export class GradebookDataService {
    get_all_classes() {
        return Classes;
    }

    get_class(class_title) {
        var index = Classes.findIndex((class_element) => class_element.title == class_title);
        if (index != -1) {
            current_class = Classes[index];
            return current_class;
        }
    }
}
