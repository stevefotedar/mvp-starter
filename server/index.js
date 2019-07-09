require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT ||  3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/cocktails', function (req, res) {
  const cocktailIngredients = req.query.booze;
  if (!cocktailIngredients) {
    res.sendStatus(500);
  } else {
    axios.get(process.env.API_URL + '/filter.php', { params: { i: cocktailIngredients } })
      .then(results => {
        return axios.all(results.data.drinks.map(drink => cocktailDetail(drink.idDrink)));
      })
      .then(drinkDetails => {
        const drinkList = drinkDetails.map(res => res.data.drinks[0]);
        res.status(200).send(drinkList);
      })
      .catch(err => {
        res.sendStatus(500);
        throw err;
      });
  }
});

app.listen(port, function() {
  console.log('listening on port 3000!');
});

function cocktailDetail(drinkId) {
  return axios.get(process.env.API_URL + '/lookup.php', {
    params: {
      i: drinkId
    }
  });
}