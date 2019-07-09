const Profile = require('../models/profile.model');
const fs = require('fs');

//Create new profil
exports.create = (req, res) => {

    Profile.find()
        .then(user => {
            //autoincrement
            let idautom;
            if (user.length == 0) {
                idautom = 0
            } else {
                idautom = parseInt(user[user.length - 1]._id) + 1
            }

            // // //images
            // let imageFile = req.files.photo_profil;
            // //console.log('inona ny ato o!'+imageFile)
            // let nomImage = idautom
            // res.setHeader('Content-Type', 'text/plain');

            // imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
            //   if (err) {
            //     return res.status(500).send(err);
            //   }


            //   //res.send({file:`public/${nomImage }.jpg`});


            // });



            //console.log('image file '+req.body.filename)
            const profil = new Profile({

                _id: idautom,
                nom: req.body.nom,
                prenom: req.body.prenom,
            });

            profil.save()
                .then(() => {
                    Profile.find()
                        .then(data => {
                            res.send(data);
                        })
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something wrong while creating the profil."

                    });
                });
        })
};

exports.findAll = (req, res) => {
    Profile.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving profils."
            });
        });
};

exports.update = (req, res) => {
    Profile.findById(req.params.id, function(err, profil) {
      profil.nom = req.body.nom;
      profil.prenom = req.body.prenom;
      profil.save(function(err) {
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'UPDATED': profil});
        }
      });
    });
  };

exports.delete = (req, res) => {
    Profile.findById(req.params.id, function(err, profil) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        profil.remove(function(err){
          if(err) {
            res.json({'ERROR': err});
          } else {
            res.json({'REMOVED': profil});
          }
        });
      }
    });
  }