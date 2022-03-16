const { User } = require('./models/User');
const { OAuth } = require('./models/OAuth');
const {
    getToken
} = require('./util/oauth_util');

// Create user
exports.createOne = async function createOne(req, res, next) {
    console.log('createOne: [POST] /users/')
    try {
      const USER_MODEL = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        full_name: req.body.full_name,
        npm: req.body.npm,
        client_id: req.body.client_id,
        client_secret: req.body.client_secret
      }
  
      try {
        const user = await User.create(USER_MODEL)
        console.log('OK createOne USER: ', user)
        return res.status(201).json(user)
      } catch (error) {
        console.log('ERROR in createOne ' + 'USER:', error)
        return res.status(500).json(error)
      }
    } catch (error) {
      return res.status(400).json('Bad Request')
    }
}

// Fetching token
exports.fetchToken = async (req, res, next) => {
    console.log('Fetch Token: [POST]')
    try {
        try {
            if (req.body.grant_type === "password") {
                const user = await User.findAll({
                    where: {
                        username: req.body.username,
                        password: req.body.password,
                        client_id: req.body.client_id,
                        client_secret: req.body.client_secret
                    }
                })
                if (user.length === 1) {
                    const credential = await getToken(req);
                    return res.status(200).json(credential);
                } else {
                    return res.status(401).json({
                        error:"invalid request",
                        error_description:"Kredensial salah"
                    })
                }
            } else {
                return res.status(401).json({
                    "error":"invalid request",
                    "error_description": "Grant type tidak tersedia"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    } catch (err) {
        console.log(error);
        return res.status(500).json(err);
    }
}


// Fetch Resource
exports.fetchResource = async (req, res, next) => {
    console.log('Fetch Resource: [POST]')
    try {
        try {
            const token = req.headers.authorization.replace("Bearer", "").trim();
            const credential = await OAuth.findOne({
                where: {
                    access_token: token
                }
            })

            const currentDate = new Date();
            if (currentDate <= credential['date_expires']) {
                const user = await User.findOne({
                    username: credential.userId
                })

                let response = {
                    access_token: credential.access_token,
                    client_id: user.client_id,
                    user_id: user.username,
                    full_name: user.full_name,
                    npm: user.npm,
                    expires: null,
                    refresh_token: credential.refresh_token
                }

                return res.status(200).json(response);
            }

            return res.status(401).json({
                error: "invalid request",
                error_description: "Access token expired"
            })

        } catch (err) {
            return res.status(401).json({
                error:"invalid request",
                error_description:"Kredensial salah"
            })
        }
    } catch (err) {
        return res.status(500).json({
            error:"invalid request",
            error_description:"Terjadi kesalahan pada server"
        })
    }
}
