export const validatorSchema = {
    username:{
        isString:{
            errorMessage: "Just string"
        },
        notEmpty:{
            errorMessage: "User cannot be empty"
        }
    },
    displayName:{
        notEmpty: true
    },
    password:{
        isLength:{
            options:{min: 5}, 
            errorMessage: 'Minimum length 5 characters'
        },
        notEmpty: true
    }
};