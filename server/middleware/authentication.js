const { formatVerify } = require("../helpers/jwt");
const { User } = require('../models')

module.exports = {
    authentication: async (req, res, next) => {
        try {
            if (!req.headers.access_token) {
                throw { name: "Invalid token" }
            }
            const payload = formatVerify(req.headers.access_token)
            const user = await User.findByPk(payload.id)
            if (!user) {
                throw { name: "Invalid token" }
            }
            req.user = {
                id: user.id,
                email: user.email,
                username: user.username,
                isSubscriber: user.isSubscribe
            }
            next()
        } catch (error) {
            next(error)
        }
    },
    authenticationAdmin: async (req, res, next) => {
        try {
            if (!req.headers.access_token) {
                throw { name: "Invalid token" }
            }
            const payload = formatVerify(req.headers.access_token)
            const user = await User.findByPk(payload.id)
            if (!user) {
                throw { name: "forbiddenError" }
            }
            if (user.role !== "Admin") {
                throw { name: "forbiddenError" }
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
