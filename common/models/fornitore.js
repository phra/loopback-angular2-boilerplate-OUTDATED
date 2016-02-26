module.exports = function(Fornitore) {

    Fornitore.near = function(tipo, lat, lng, cb) {
        var sql = 'SELECT * FROM public.fornitore a where ((a.geopoint <-> point($1, $2)) * 90 < a.raggio) AND a.tipo = $3';
        Fornitore.dataSource.connector.query(sql, [lng, lat, tipo], function(err, fornitori) {
            if (err) {
                console.log(err);
                return cb(err);
            }

            fornitori.forEach(function(el) {
                el.geopoint.lat = el.geopoint.y;
                el.geopoint.lng = el.geopoint.x;
                delete el.geopoint.x;
                delete el.geopoint.y;
            });

            Fornitore.include(fornitori, 'feedbacks', function(err, fornitori2) {
                if (err) {
                    console.log(err);
                    cb(err);
                }
                
                cb(err, fornitori2);
            });
        });
    };

    Fornitore.remoteMethod('near', {
        accepts: [
            { arg: 'tipo', type: 'number'},
            { arg: 'lat', type: 'number'},
            { arg: 'lng', type: 'number'},
        ],
        returns: {arg: 'fornitori', type: ['fornitore']},
        http: {path:'/near', verb: 'get'},
    });
};
