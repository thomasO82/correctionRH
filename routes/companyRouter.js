const bcrypt = require("bcrypt")
const companyModel = require("../models/companyModel");
const authGuard = require("../services/authGuard");
const companyRouter = require("express").Router();
const employeeModel = require("../models/employeeModel")

companyRouter.get('/',authGuard, async (req, res) => {
    try {
        let company = await companyModel.findOne({ _id: req.session.companyId }).populate({
            path: "employees",
        })
        let employees = company.employees
        res.render('templates/home.twig', {
            employees: employees,
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

companyRouter.get('/register', async (req, res) => {
    try {
        res.render('templates/register.twig')
    } catch (error) {
        res.send(error)
    }
})

companyRouter.post('/register', async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            throw {confirmPassword: "les mots de passe doivent etre identiques"}
        }
        let findCompani = await companyModel.findOne({mail: req.body.mail})
        if (findCompani) {
            throw {mailsign: "cette adresse mail est deja enregistrer"}
        }
        if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(req.body.password)) {
            throw {passwordError:"le mot de passe doit contenir 8 caracteres, une majuscule et un chiffre"}

        }
        req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT));
        let newCompany = new companyModel(req.body)
        let err = newCompany.validateSync()
        if (err) {
            throw err
        }
        newCompany.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT));
        await newCompany.save()
        res.redirect('/')
    } catch (error) {
        res.render('templates/register.twig', {
            errors: error.errors,
            errorConfirmPassword: error.confirmPassword,
            errorMail: error.mailsign,
            company: req.body,
            passwordError: error.passwordError
        })
    }
})

companyRouter.get('/login', async (req, res) => {
    try {
        res.render('templates/login.twig')
    } catch (error) {
        res.send(error)
    }
})

companyRouter.post('/login', async (req, res) => {
    try {
        let company = await companyModel.findOne({ mail: req.body.mail })
        if (company) {
            if (bcrypt.compareSync(req.body.password, company.password)) {
                req.session.companyId = company._id
                req.session.companyName = company.name 
            } else {
                throw { "password": "mot de passe invalide" }
            }
        } else {
            throw { "mail": "mail invalide" }
        }
        res.redirect('/')
    } catch (error) {
        res.render('templates/login.twig', {
            error: error,
            company: req.body
        })
    }
})

companyRouter.get('/logout', async (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/login')
    } catch (error) {
        res.send(error)
    }
})

module.exports = companyRouter