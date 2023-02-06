const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "nom requis"],
        validate: {
            validator: function(v) {
                return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v);
            },
            message: "Entrez un nom valide"
        },
    },
    siret: {
        type: Number,
        required: [true, "siret requis"],
        validate: {
            validator: function(v) {
                return /^[0-9]{14}$/u.test(v);
            },
            message: "Entrez un numéro de siret valide"
        },
    },
    mail: {
        type: String,
        required: [true, "mail requis"],
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
            },
            message: "Entrez un mail valide"
        },
    },
    name_director: {
        type: String,
        required: [true, "nom du directeur requis"],
        validate: {
            validator: function(v) {
                return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/g.test(v);
            },
            message: "Entrez un nom valide"
        },
    },
    employees:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "employees"
        }]
    },
    password:{
        type: String,
        required: [true, "mot de passe requis"],
    }
})

const companyModel = mongoose.model("companies", companySchema)
module.exports = companyModel