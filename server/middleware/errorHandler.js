module.exports = {
    errorHandler: async (error, req, res, next) => {
        console.log(error);
        switch (error.name) {
            case "MidtransError":
                res.status(400).json({ message: `${error.ApiResponse.error_messages[0]}` })
                break;
            case "alreadySubscribe":
                res.status(400).json({ message: "Already Subscribe" })
                break;
            case "alreadyExist":
                res.status(400).json({ message: "Song already exist" })
                break;
            case "forbiddenError":
                res.status(401).json({ message: "You are not authorized" })
                break;
            case "notFound":
                res.status(401).json({ message: "Data not found" })
                break;
            case "Invalid token":
                res.status(401).json({ message: "Invalid token" })
                break;
            case "invalidUser":
                res.status(400).json({ message: "Invalid email/password" })
                break;
            case "invalidPassword":
                res.status(400).json({ message: "Password is required" })
                break;
            case "invalidEmail":
                res.status(400).json({ message: "Email is required" })
                break;
            case "SequelizeValidationError":
                res.status(400).json({ message: error.errors[0].message })
                break;
            case "JsonWebTokenError":
                res.status(401).json({ message: "Invalid token" })
                break;
            default:
                res.status(500).json({
                    message: "Internal server error"
                })
                break;
        }
    }
}