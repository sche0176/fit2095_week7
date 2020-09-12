const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let app = express();
const actors = require('./routers/actor');
const movies = require('./routers/movie');

app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/MovieLibrary', function(err) {
    if (err) {
        console.log('Error in Mongoose connection: ', err);
        throw err;
    }
    console.log('Successfully connected');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);  //
app.post('/addactor', actors.createOne);    //
app.get('/actor/:id', actors.getOne);   //
app.put('/updateactor/:id', actors.updateOne);  //
app.post('/actors/:id/addmovie', actors.addMovie);  //
app.delete('/deleteactor/:id', actors.deleteOne);   //
app.delete('/deleteactorandmovies/:id', actors.deleteActorAndMovies);   //should be done, but maybe recheck again
app.delete('/removemovie/:actorid/:movieid', actors.removeMovie);   //


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);  //
app.post('/addmovie', movies.createOne);    //
app.get('/movie/:id', movies.getOne);   //
app.put('/updatemovie/:id', movies.updateOne);  //
app.post('/movies/:id/addactor', movies.addActor);  //
app.delete('/deletemovie/:id', movies.deleteOne);   //
app.delete('/removeactor/:movieid/:actorid', movies.removeActor);   //
app.get('/movies/:year1/:year2', movies.getMoviesRangeYears);   //
app.delete('/deletemovies', movies.deleteMoviesRangeYears); //what do they mean by send thru req body in JSON format?