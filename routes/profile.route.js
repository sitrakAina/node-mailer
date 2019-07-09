
module.exports = (app) => {

    const pers = require('../controller/profile.controller');
    app.post('/profil', pers.create);
    app.get('/profil', pers.findAll);
    app.put('/profil/:id', pers.update);
    app.delete('/profil/:id', pers.delete);
}