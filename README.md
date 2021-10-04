#Shopping List MERN App

## Initial Setup ME*N 

1. Create new folder `shoppinglist` (cd into it)
2. Initalize your package.json (leave defaults)
3. Install Packages: Express `npm i express`, dot-env `npm i dotenv`, mongoose `npm i mongoose`, morgan `npm i morgan`, body parser `npm i body-parser`
4. Create an index.js file add basic information
	* require express and .env (enviroment variables, db etc)
	* init express and setup port 
	* Allow API to be accessed from everywhere (CORS issues)
	* Send test message
	* Setup Express Listener
		

> const express = require('express');
> 
> const logger = require('morgan');
> 
> require('dotenv').config();
> 
> const app = express();
> 
> const port = process.env.PORT || 3001;
> 
> app.use((req, res, next) => {
>   res.header("Access-Control-Allow-Origin", "*");
>   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
>   next();
> });
> 
> app.use((req, res, next) => {
>   res.send('Welcome to Express');
> });
> 
> app.listen(port, () => {
>   console.log('Server running on port ' + port)
> });

Test by running  `node index` in terminal
 
## Express API Routes 

1. Create routes Folder
2. Create api.js in the routes folder
	* require express 
	* init express router
	* setup 3 routes, get, post and delete


> const express = require ('express');
> 
> const router = express.Router();
> 
> router.get('/shoppinglist', (req, res, next) => {
> 
> });
> 
> router.post('/shoppinglist', (req, res, next) => {
> 
> });
> 
> router.delete('/shoppinglist/:id', (req, res, next) => {
> 
> })
> 
> module.exports = router;

## Mongoose/Mongo Model

1. Install mongoose `npm i mongoose`
2. Create a models directory off of the root of the shoppinglist app
3. Create a shoppinglist.js file in that folder
	* Create Schema
	* Create Model

> const mongoose = require('mongoose');
> 
> const Schema = mongoose.Schema;
> 
> const ShoppingListSchema = new Schema({ item: { type: String, required: [true, 'The text field is required'] } })
> 
> const ShoppingList = mongoose.model('shoppinglist', ShoppingListSchema);
> 
> module.exports = ShoppingList;

## Update Routes to Use Model
1. Add find, create and findOneAndDelete Methods in Function

> const express = require('express');
> 
> const router = express.Router();
> 
> const ShoppingList = require('../models/shoppinglist');
> 
> 
> 
> router.get('/shoppinglist', (req, res, next) => {
>     ShoppingList.find({}, 'item').then(data => res.json(data)).catch(next)
> });
> 
> router.post('/shoppinglist', (req, res, next) => { if (req.body.item) { ShoppingList.create(req.body).then(data => res.json(data)).catch(next) } else { res.json({ error: "The input field is empty" }) } });
> 
> router.delete('/shoppinglist/:id', (req, res, next) => { 
	> ShoppingList.findOneAndDelete({ "_id": req.params.id }).then(data => res.json(data)).catch(next) }
	)
> 
> module.exports = router;

## Update index.js to handle routes and connections
1. We will need need to libraries, body parse for our post, mongoose for our database, routes and path
2. Connect to database (we will setup in the .env we haven't yet created)
3. Mongoose promise method is depreciated, so we can use Node's version (give us our "then")
4. Define routes

> 
> const express = require('express');
> 
> const logger = require('morgan');
> 
> const bodyParser = require('body-parser');
> 
> const mongoose = require('mongoose');
> 
> const routes = require('./routes/api');
> 
> const path = require('path');
> 
> require('dotenv').config();
> 
> const app = express();
> 
> const port = process.env.PORT || 3001;
> 
> mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Database connected successfully')).catch(err => console.log(err));
> 
> 
> mongoose.Promise = global.Promise;
> 
> app.use((req, res, next) => {
>   res.header("Access-Control-Allow-Origin", "*");
>   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
>   next();
> });
> 
> app.use(bodyParser.json());
> 
> app.use('/api', routes);
> 
> app.use((err, req, res, next) => {
>   console.log(err);
>   next();
> });
> 
> app.listen(port, () => {
>   console.log('Server running on port ' + port)
> });

## Setup Remote Mongo Database on mlab
1. Create mlab sandbox Provision db through Heroku by setting up an app, going to resources and typing in mlab. Add Collection called `shoppingcart` and user if neccessary.
2. Add user and get connection string. IE: `mongodb://someuser:somepass@ds227865.mlab.com:27865/heroku_lwwghkmr`
3. Create a `.env` file on your root of the application. Add your db connection to it. `MONGODB_URI = mongodb://someuser:somepass@ds227865.mlab.com:27865/heroku_lwwghkmr`
	This will be used my the mongoose connection string. 
4. You can also setup a local db instance and replace the .env location with your own db	
	
	
### Test Your Endpoints Using Postman
1. Get by using GET http://localhost:3001/api/shoppinglist
2. Post by using POST http://localhost:3001/api/shoppinglist with json {"item":"cheese"}
3. Delete by using DELETE localhost:3001/api/shoppinglist/5e4ae903c544711c71125245 or whatever any of the unique items are

## Front End React
In the same root directory as your backend code. 

1. Run `create-react-app client` This will setup the basic scaffolding for react.
2. Add two new dev dependences from the root folder. Concurrently to run scripts, after one other and nodemon to auto restart the server on change. 
	
	* npm i concurrently --save-dev
	* npm install nodemon --save-dev

3. Within the root package.json file add the following between scripts: 

>  		"start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
> 
>     "start:prod": "node server.js",
>     
>     "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
>     
>     "client": "cd client && npm run start",
>     
>     "install": "cd client && npm install",
>     
>     "build": "cd client && npm run build",
>     
>     "heroku-postbuild": "npm run build"
     
4. In the client folder, You will need to add a proxy, so you we don't need to specify full urls. Edit the client package.json file add the following line  under the "private":true.....  `"proxy": "http://localhost:3001",`
5. From the client folder, in terminal, install Axios `npm install axios`


## React Components
1. Create a folder inside your src folder, called `components`
2. Within that folder we will be creating 3 files: Input.js, ListItems.js and Item.js

#### Create `Input.js` Component in components



    import React, { Component } from 'react';
    import axios from 'axios';
    
    class Input extends Component {state = {
        item: ""
    }

    addItem = () => {

        const thisItem = { item: this.state.item }

        if (thisItem.item && thisItem.item.length > 0) {
            axios.post('/api/shoppinglist', thisItem)
                .then(res => {
                    if (res.data) {
                        console.log(this.props);
                        this.props.getItems();
                        this.setState({ item: "" })
                    }
                })
                .catch(err => console.log(err))
        } else {
            console.log('Item required')
        }
    }

    handleChange = (e) => {
        this.setState({
            item: e.target.value
        })
    }

    render() {
        let { item } = this.state;
        return (
            <div>
                <input type="text" onChange={this.handleChange} value={item} />
                <button onClick={this.addItem}>add item</button>
            </div>
        )
     }
	}
	export default Input
	
	
#### Create `ListItems.js` Component in components


    
    import React from 'react';
    
    const ListItems = ({ items, deleteItem }) => {

    return (
        <ul>
            {
                items &&
                    items.length > 0 ?
                    (
                        items.map(item => {
                            return (
                                <li key={item._id} onClick={() => deleteItem(item._id)}>{item.item}</li>
                            )
                        })
                    )
                    :
                    (
                        <li>No Items left</li>
                    )
            }
        </ul>
    )
    }
    export default ListItems
    
    
    
    
   	
	
	
#### Create `ListItems.js` Component in components



    import React, { Component } from 'react';
    import axios from 'axios';
    import Input from './Input';
    import ListItems from './ListItems';
    
    class Item extends Component {state = {
        items: []
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        axios.get('/api/shoppinglist')
            .then(res => {
                if (res.data) {
                    this.setState({
                        items: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    deleteItem = (id) => {

        axios.delete(`/api/shoppinglist/${id}`)
            .then(res => {
                if (res.data) {
                    this.getItems()
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        let { items } = this.state;
        return (
            <div>
                <h1>Shopping List</h1>
                <Input getItems={this.getItems} />
                <ListItems items={items} deleteItem={this.deleteItem} />
            </div>
        )
    }
    }
    export default Item;
     	

#### Update App.js to use Item component:

    import React from  'react';
    import Item from  './components/Item';
    import  './App.css';

    const App =  ()  =>  {
    
	    return (
	    
		    <div  className="App">
	    
			    <Item  />
	    
		    </div>
	    
	    );
    
    }
    
    export  default App;
    	
	
	
    	
	
####Style to your liking. App.css and index.css	

###To run use:
NPM start













