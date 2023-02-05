const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "nom requise"]
    },
    siret: {
        type: String,
        required: [true, "siret requis"]
    },
    mail: {
        type: String,
        required: [true, "mail requis"]
    },
    name_director: {
        type: String,
        required: [true, "nom du directeur requis"]
    },
    employees:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "employees"
        }]
    },
    password:{
        type: String,
        required: [true, "mot de passe requis"]
    }
})

const companyModel = mongoose.model("companies", companySchema)
module.exports = companyModel