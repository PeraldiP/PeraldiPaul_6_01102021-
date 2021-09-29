const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();

mongoose.connect('mongodb+srv://peraldip:Kvgpmk1@projet6.6ryxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/auth/signup',(req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(500).json({error}));

    })
    .catch(error => res.status(500).json({error}));

  
});

app.post('/api/auth/signup',(req, res, next) => {
  User.findOne({ email : req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({error : 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.password,user.password)
        .then(valid => {
          if(!valid){
            return res.status(401).json({error : 'Mot de passe incorrecte !'});
          }
          res.status(200).json({
            userId: user._id,
            token: 'TOKEN'
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
});

module.exports = app;