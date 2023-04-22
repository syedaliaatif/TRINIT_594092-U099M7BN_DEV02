
const getCurrentUser = () => {

    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
        return JSON.parse(user);
    }
    else return null;
}

const userService = { getCurrentUser };
export default userService; 