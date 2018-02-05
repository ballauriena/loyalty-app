const utils = {
    sanitize: function(numberString) {
        return numberString.replace(/\D/g, "");
    }
};

module.exports = utils;
