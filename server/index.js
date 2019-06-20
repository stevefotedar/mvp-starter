require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/cocktails', function (req, res) {
  const cocktailIngredients = req.query.booze;
  if (!cocktailIngredients) {
    res.sendStatus(500);
  }
  axios.get('https://www.thecocktaildb.com/api/json/v2/8673533/filter.php', { params: { i: cocktailIngredients } })
    .then(results => {
      // console.log(results.data.drinks);
      // console.log(results.data.drinks.map(drink => cocktailDetail(drink.idDrink)))
      return axios.all(results.data.drinks.map(drink => cocktailDetail(drink.idDrink)));
    })
    .then(drinkDetails => {
      res.status(200).send(drinkDetails.map(res => res.data.drinks[0]));
    })
    .catch(err => {
      res.sendStatus(500);
      throw err;
    });
});

app.listen(port, function() {
  console.log('listening on port 3000!');
});

function cocktailDetail(drinkId) {
  return axios.get('https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php', {
    params: {
      i: drinkId
    }
  });
}