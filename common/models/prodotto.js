module.exports = function(Prodotto) {
    Prodotto.afterRemote('create', function(context, prodotto, next) {
        prodotto.abilitato = false;
        next();
    });
};
