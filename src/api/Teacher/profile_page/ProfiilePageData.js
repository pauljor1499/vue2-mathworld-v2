import { storeCurrentUser } from "@/store/CurrentUser";

export class ProfilePageService {
    uploadNewPhoto(photo) {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.photo = photo;
    }

    update_biography(new_biography) {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.background.biography = new_biography;
    }

    update_education(new_education) {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.background.education.splice(new_education.index, 1, new_education.new_data);
    }

    remove_biography() {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.background.biography = null;
    }

    add_biography(new_data) {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.background.biography = new_data;
    }

    remove_education(item_index) {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.background.education.splice(item_index, 1);
    }

    add_education(new_education) {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.background.education.push(new_education);
    }

    update_password(new_data) {
        const store_CurrentUser = storeCurrentUser();
        store_CurrentUser.current_user.credentials.account.password = new_data;
    }
}
