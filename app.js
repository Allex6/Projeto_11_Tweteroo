/* jshint esversion:11 */

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res, next)=>{

    const { username, avatar } = req.body;

    if(!username || !avatar){
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        users.push({ username, avatar });
        res.status(201).send('OK');
    }

});

app.post('/tweets', (req, res, next)=>{

    const tweetObj = req.body;

    if(!tweetObj.username || !tweetObj.tweet) {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {

        const tweetUser = users.find(user => user.username === tweetObj.username);
        if(tweetUser) tweetObj.avatar = tweetUser.avatar;
        tweets.splice(0, 0, tweetObj);
        res.status(201).send('OK');

    }

});

app.get('/tweets', (req, res, next)=>{

    const results = tweets.filter((tweet, index) => index < 10);
    res.send(results);

});

app.get('/tweets/:username', (req, res, next)=>{

    const { username } = req.params;
    const results = tweets.filter((tweet, index) => index < 10 && tweet.username === username);
    res.send(results);

});

app.listen(5000, () => console.log('Servidor online na porta 5000'));