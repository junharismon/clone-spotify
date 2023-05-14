const { compareSync } = require("bcryptjs")
const { User } = require("../models")
const { formatSign } = require("../helpers/jwt")
const midtransClient = require('midtrans-client');
const nodeMailer = require("../helpers/nodemailer");
const { OAuth2Client } = require('google-auth-library');

class ControllerUser {
    static async register(req, res, next) {
        try {
            const { username, email, password, imageUrl } = req.body
            if (!email) {
                throw { name: "invalidEmail" }
            }
            if (!password) {
                throw { name: "invalidPassword" }
            }
            const data = await User.create({ username, email, password, imageUrl })
            res.status(201).json({
                id: data.id,
                email: data.email,
                username: data.username
            })
        } catch (error) {
            console.log();
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { name: "invalidUser" }
            }
            const isPasswordValid = compareSync(password, user.password)
            if (!isPasswordValid) {
                throw { name: "invalidUser" }
            }
            const payload = {
                id: user.id,
                email: user.email,
                username: user.username,
                isSubscribe: user.isSubscribe
            }
            const access_token = formatSign(payload)
            res.status(200).json({
                id: user.id,
                access_token,
                email: user.email,
                username: user.username,
                isSubscribe: user.isSubscribe
            })

        } catch (error) {
            next(error)
        }
    }
    static async getUser(req, res, next) {
        try {
            const data = await User.findAll({
                attributes: {
                    exclude: ["password", 'createdAt', 'updatedAt']
                }
            });
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getUserDetail(req, res, next) {
        try {
            const id = req.user.id
            const data = await User.findByPk(id)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async userDetail(req, res, next) {
        try {
            const { userId } = req.params
            const data = await User.findByPk(userId)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async subscribe(req, res, next) {
        try {
            await User.update({ isSubscribe: true }, {
                where: {
                    id: req.user.id
                }
            })
            res.status(200).json({
                message: "Yey succes subscribe"
            })
            nodeMailer(req.user.email)
        } catch (error) {
            next(error)
        }
    }
    static async generateToken(req, res, next) {
        try {
            const findUsers = req.user
            if (findUsers.isSubscribe) {
                throw { name: "alreadySubscribe" }
            }

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                transaction_details: {
                    order_id: `TRANSACTION ${Math.ceil(500 * Math.random() * 1000)}`,
                    gross_amount: 99999
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    username: `${findUsers.username}`,
                    email: `${findUsers.email}`,
                }
            };
            const tokenMidtrans = await snap.createTransaction(parameter)
            res.status(201).json(tokenMidtrans)
            console.log(tokenMidtrans);
        } catch (error) {
            next(error)
        }
    }
    static async google(req, res, next) {
        try {
            const client = new OAuth2Client('965947261698-egtgnshm8binpgbn8v3emii6p0rq42kp.apps.googleusercontent.com');
            const ticket = await client.verifyIdToken({
                idToken: req.headers.googletoken,
                audience: '965947261698-egtgnshm8binpgbn8v3emii6p0rq42kp.apps.googleusercontent.com'
            });
            const payload = ticket.getPayload();
            console.log(payload);
            const userid = payload['sub'];
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: 'google',
                    role: 'Member'
                },
                hooks: false
            });
            const access_token = formatSign({
                id: user.id,
                email: user.email
            })
            res.status(200).json({
                id: user.id,
                username: user.username,
                role: user.role,
                access_token
            })
            if (created) {
                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    access_token
                })
            }
        } catch (err) {
            next(err)
        }

    }
}

module.exports = ControllerUser