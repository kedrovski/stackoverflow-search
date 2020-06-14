const jwt = require('jwt-simple');
const config = require('../config/config');
const sendMail = require('../controllers/mail');
const randomstring = require("randomstring");
const User = require('../models/user');
const bcrypt = require('bcrypt');

function getToken(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function generateNumber() {
    return randomstring.generate({
        length: 9,
        charset: 'numeric'
    });
}

function route(passport, apiRoutes) {
    apiRoutes.post('/authenticate', (req, res) => {
        if (validateEmail(req.body.email) && req.body.password) {
            User.findOne({
                email: req.body.email.toLowerCase()
            }, function (err, user) {
                if (!user || err) {
                    res.send({ success: false, msg: 'Authentication failed. User not found' });
                } else {
                    // check if password matches
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.encode({ _id: user._id, email: user.email, tokenExpDate: Math.round(Date.now() / 1000 + config.sessionTimeHours * 60 * 60) }, config.secret);
                            // return the information including token as JSON
                            res.json({ success: true, user: Object.assign({}, user._doc, {token: 'JWT ' + token}) });
                        } else {
                            res.status(401).send("Wrong email or password");
                        }
                    });
                }
            });
        } else {
            res.status(401).send("Wrong email or password");
        }
    });

    apiRoutes.post('/signup', (req, res) => {
        if (!req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.name) {
            res.json({ success: false, msg: 'Please pass email and password' });
        } else {
            if (req.body.password !== req.body.confirmPassword) {
                res.json({ success: false, msg: 'Passwords does not match!' });
            } else {
                if (req.body.password.length < 6) {
                    res.json({ success: false, msg: 'The password should contain 6 or more characters' });
                } else {
                    if (validateEmail(req.body.email)) {
                        let newUser = new User({
                            email: req.body.email.toLowerCase(),
                            password: req.body.password,
                            name: req.body.name,
                            isActive: true, // skip confirmation part with link
                            date: new Date().toISOString(),
                        });
                        // save the user
                        newUser.save(function (err) {
                            if (err) {
                                return res.json({ success: false, msg: 'Email already exists!' });
                            }
                            res.json({ success: true, msg: 'Successfully!' });
                        });
                    } else {
                        res.json({ success: false, msg: 'Please pass valid email' });
                    }
                }
            }
        }
    });

    apiRoutes.post('/restorepass', (req, res) => {
        if (validateEmail(req.body.email)) {
            User.findOne({
                email: req.body.email
            }, function (err, user) {
                if (!user || err) {
                    res.send({ success: false, msg: 'You enter the wrong email.' });
                } else {
                    let newPassword = generateNumber();
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            return res.send({ success: false, msg: 'Something went wrong..' });
                        }
                        bcrypt.hash(newPassword, salt, function (err, hash) {
                            if (err) {
                                return res.send({ success: false, msg: 'Something went wrong..' });
                            }
                            User.findOneAndUpdate({_id: user.id}, { password: hash }, {upsert:false}, function(err, result) {
                                if (err) {
                                    return res.send({ success: false, msg: 'Something went wrong..' });
                                }
                                sendMail.sendMail(res, config, req.body.email, newPassword);
                            });
                        });
                    });
                }
            });
        } else {
            res.json({ success: false, msg: 'Please enter valid email' });
        }
    });

    apiRoutes.post('/checkToken', passport.authenticate('jwt', { session: false }), (req, res) => {
        return res.send({ success: true, msg: 'Authenticated' });
    });

    apiRoutes.post('/mobile/update-order', passport.authenticate('jwt', { session: false }), (req, res) => {
        let token = getToken(req.headers);  
        if (token && req.body.firstName && req.body.secondName && req.body.thirdName && req.body.city && req.body.phone && req.body.orderId) {
            let newData = { 
                firstName: req.body.firstName,
                secondName: req.body.secondName,
                thirdName: req.body.thirdName,
                city: req.body.city,
                phone: req.body.phone,
                notes: req.body.notes || ' ',
             };
            Order.findOneAndUpdate({_id: req.body.orderId}, newData, {upsert:false}, function(err, result) {
                if (err) {
                    return res.send({ success: false, msg: 'Something went wrong..' });
                }
                return res.send({ success: true, msg: 'Successfully updated order!' });
            });   
        } else {
            return res.send({ success: false, msg: 'Please check required parameters.' });
        }
    });

}

exports.route = route;