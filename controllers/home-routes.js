const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, PlantBasic, MyPlant, PlantPicture, PlantGrowing, PlantCare, Comment, Vote } = require('../models');

// get all of PlantBasic info for 
router.get