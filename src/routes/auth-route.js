const router = require('express').Router();
const { login } = require('../services/auth-service');

router.post('/login', login);