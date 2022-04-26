const axios = require("axios");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello. JDT');
});

async function getCalories(food){
    const options = {
        method: 'GET',
        url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
        params: {query: food},
        headers: {
          'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
          'X-RapidAPI-Key': '52ce8a5198msh9f73ec7d26e2dd1p1c6b49jsn0df78c848321'
        }
      };

    return new Promise((resolve, reject) => {
        axios.request(options)
        .then(res => {
            let calories = res.data.items[0].calories;
            resolve(calories);
        })
        .catch(err => {
            reject(error);
        })
    });
}



app.get('/calories/:food', (req, res) => {
    let calories;
    const food = req.params.food;

    getCalories(food)
    .then(data => calories = data)
    .catch(err => console.log(err));

    setTimeout(() => {
        res.send(`${food} has ${calories} calories`)
    }, 1500);
})

app.listen(3001, () =>{
    console.log("app is listening on port 3001");
});