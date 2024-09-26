import Joi from "joi";

export const validateOptions: Joi.ValidationOptions = {
    errors: {
        wrap: { label: "" },
    },
};
