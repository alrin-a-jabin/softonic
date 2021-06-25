export default class UserHelper {
    static getUserDetails = () => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            return user;
        } else {
            return null;
        }
    };
}