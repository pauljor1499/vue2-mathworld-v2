import { valid_emails } from "./valid_teachers";

export class TeacherService {
    verify_teacher(new_user) {
        try {
            const isFound = valid_emails.some((teacher) => teacher.email == new_user.email);
            if (isFound) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
