const tokenService = require('./token-sevrice');

module.exports = function() {
    return (req, res, next ) => {
        const token = req.get('authorization');
        tokenService.verify(token)
            .then( payload => {
                req.user = payload;
                next();
            })
            .catch(()=> {
                next({ code: 401, error: 'Not Authorized'});
            });
    };
};