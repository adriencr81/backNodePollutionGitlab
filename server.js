import express from 'express';
var app = express();
import cors from "cors";

import bodyParser from "body-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import pollutionApiRoutes from './pollution-api-routes.js';
import meteoApiRoutes from './meteo-api-routes.js';

// Parse application/x-www-form-urlencoded et application/json
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors({credentials: true,
  origin: ["http://localhost:4200","http://front-projet4.s3-website.eu-west-3.amazonaws.com"]}));

// CORS enabled with express/node-js :
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin" );
 // res.header("Access-Control-Allow-Credentials", true );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE"); //default: GET, ...
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE'); //to give access to all the methods provided
    return res.status(200).json({});
  }
  next();
});
//process.env.ANGULAR_URL

app.use('/html', express.static(__dirname+"/html"));
app.get('/', function(req, res) {});

app.use(pollutionApiRoutes.apiRouter);
app.use(meteoApiRoutes.apiRouter);

let backendPort = process.env.PORT || 5082; 
app.listen(backendPort, function() {
  console.log("http://localhost:"+backendPort);
});


