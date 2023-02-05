const companyModel = require("../models/companyModel")

const authGuard = async (req, res, next) => {

    let company = await companyModel.findById(req.session.companyId)
    if (company) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = authGuard