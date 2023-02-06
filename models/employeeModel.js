const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    img: {
        type: String,
        require: [true, "image requise"],
    },
    name: {
        type: String,
        require: [true, "nom requis"],
        validate: {
            validator: function(v) {
                return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v);
            },
            message: "Entrez un nom valide"
        },
    },
    firstname: {
        type: String,
        require: [true, "prenom requis"],
        validate: {
            validator: function(v) {
                return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v);
            },
            message: "Entrez un prenom valide"
        },
    },
    role: {
        type: String,
        require: [true, "role requis"],
        validate: {
            validator: function(v) {
                return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v);
            },
            message: "Please enter a valid name"
        },
    },
    blame: {
        type: Number,
        default: 0
    }
})

const employeeModel = mongoose.model("employees", employeeSchema)
module.exports = employeeModel