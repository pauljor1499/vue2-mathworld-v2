import { Classes } from "@/api/Teacher/Data";

export class AllClassesService {
    get_all_class() {
        return Classes;
    }

    get_class_by_title(class_title) {
        var index = Classes.findIndex((class_el) => class_el.title === class_title);
        if (index > -1) {
            return Classes[index];
        }
    }

    add_new_class(new_class) {
        var class_exists = Classes.some((class_el) => class_el["title"].toLowerCase() === new_class.title.toLowerCase());
        if (!class_exists) {
            new_class["id"] = Classes.length;
            new_class["code"] = "MWC-XYZ-" + Classes.length;
            new_class["assignments"] = [];
            new_class["students"] = [];
            new_class["pending_students"] = [];
            Classes.push(new_class);
            return true;
        }
        return false;
    }

    update_class(class_id, title, description, section, schedules) {
        var index = Classes.findIndex((class_el) => class_el.id === class_id);
        Classes[index].title = title;
        Classes[index].description = description;
        Classes[index].section = section;
        Classes[index].schedules = schedules;
        return true;
    }
}
