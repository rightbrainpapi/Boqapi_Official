const asyncMiddleware = require ('../custom_middleware/async');
const auth = require ('../custom_middleware/auth');
const admin = require ('../custom_middleware/admin');
const {Genre, validate} = require('../models/genreModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();







////////////////////////////////////////
// Get All Genre 
////////////////////////////////////////
router.get('/', asyncMiddleware(async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
}));

////////////////////////////////////////
// Get Genre by ID 
////////////////////////////////////////
router.get('/:id', asyncMiddleware(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
}));



////////////////////////////////////////
// Admin Only: Create A Genre
////////////////////////////////////////
router.post('/', auth,  asyncMiddleware(async(req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
}));


////////////////////////////////////////
// Admin Only: Create A Genre
////////////////////////////////////////
router.put('/:id', asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
}));


////////////////////////////////////////
// Admin Only: Delete A Genre
////////////////////////////////////////
router.delete('/:id', [ auth, admin], asyncMiddleware(async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
}));



module.exports = router;