export const validateEmail = (email) => {
    if (email.length == 0) return "Email ID cannot be empty";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return "Invalid Email ID";
    return null;
};

export const validatePassword = (password) => {
    if (password.length == 0) return "Password cannot be empty";
    if (password.length < 8)
        return "Password must have a minimum of 8 characters";
    return null;
};
