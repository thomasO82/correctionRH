const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");
const authGuard = require("../services/authGuard");
const upload = require("../services/upload");

const employeeRouter = require("express").Router();

employeeRouter.get('/addEmployee', authGuard, async (req, res) => {
    try {
        res.render("templates/employeeForm.twig")
    } catch (error) {
        res.json(error)
    }
})

employeeRouter.post('/addEmployee', authGuard, upload.single('img'), async (req, res) => {
    try {
        if (req.multerError || !req.file) {
            throw { fileError: "Entrez fichier valide" }
        }
        req.body.img = req.file.filename
        let newEmployee = new employeeModel(req.body)
        let error = newEmployee.validateSync()
        if (error) {
            throw error
        }
        await companyModel.updateOne({ _id: req.session.companyId }, { $push: { employees: newEmployee._id } })
        await newEmployee.save()
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.render('templates/employeeForm.twig', {
            errors: error,
            fileError: error.fileError,
            employee: req.body
        })
    }
})

employeeRouter.post('/updateEmployee/:id', authGuard, upload.single('img'), async (req, res) => {
    try {
        if (req.multerError || !req.file) {
            throw { fileError: "Entrez fichier valide" }
        }
        req.body.img = req.file.filename
        await employeeModel.updateOne({ _id: req.params.id }, req.body)
    } catch (error) {
        res.json(error)
    }
})

employeeRouter.get('/updateEmployee/:id', authGuard, async (req, res) => {
    try {
        let employeeUdpate = await employeeModel.findById(req.params.id)
        if (!employeeUdpate) {
            throw "veuillez selectionner un employer a modifier"
        }
        res.render("templates/employeeForm.twig", {
            employee: employeeUdpate,
            action: "update"
        })
    } catch (error) {
        res.render('templates/home.twig', {
            error: error
        })
    }
})

employeeRouter.get('/deleteEmployee/:id', async (req, res) => {
    try {
        await employeeModel.deleteOne({ _id: req.params.id })
        await companyModel.updateOne({ _id: req.session.companyId }, { $pull: { employees: req.params.id } },)
        res.redirect("/")
    } catch (error) {
        res.json(error)
    }
})

employeeRouter.get('/blameEmployee/:id', authGuard, async (req, res) => {
    try {
        let employee = await employeeModel.findOne({ _id: req.params.id })
        let nmbBlame = employee.blame
        nmbBlame = nmbBlame + 1
        if (nmbBlame >= 3) {
            res.redirect('/deleteEmployee/' + req.params.id)
        } else {
            await employeeModel.updateOne({ _id: req.params.id }, { blame: nmbBlame })
            res.redirect("/")
        }
    } catch (error) {
        res.json(error)
    }
})

module.exports = employeeRouter