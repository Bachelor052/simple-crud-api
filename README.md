# Install
To install go to main folder and enter: 
>npm i

# How to run in development mode

To start the program in development mode: 
>npm run start:dev

The PORT during the development mode is configured in `.env` file

# How to run in production mode

To create and run in production mode: 
>npm run start:prod

Production mod will create a bundle in `/dist` and run it automatically. If you need to start the bundle separately - go to `/dist` and run:
>node app.bundle.js

#### Caution
If you want to change the port for production mode - first change it in `app.js:5,34`. This is done in order to avoid instability of the Terser uglifier during parsing of `process.env` variables. 
  
The development mode is taking the PORT variable from `.env` flawlessly. 

# How to test
To start the test first start the program in any mode. Then run: 
>npm test

##### It is important to restart a server if it was already working and had some records.

# How to test coverage
To start the test first start the program in any mode. Then run: 
>npm run coverage

##### It is important to restart a server if it was already working and had some records.

# Usage examples

At the start the database is empty. Let's assume that PORT is default 5000.   
### Get all records 

You can get all records by making a `GET` request to the:
>localhost:5000/person/    

example outputs:
```
0: {
"name": "name_0",
"age": "0",
"hobbies": "Books"
},
1: {
"name": "name_1",
"age": "1",
"hobbies": "Games"
}
```   
or it may be empty
```
{}
```
  

### Get a person with a specific id

You can get a specific record by its id using `GET` request with `id` after a `/person/`. The id should be a non-negative integer.

>localhost:5000/person/0 

example outputs:
```
{
"name": "name_0",
"age": "0",
"hobbies": "Books"
}
```   
 
### Add new record 

You can add a new record using `POST` request with `name`, `age`, and `hobbies` as parameters. They are mandatory. Also, you can pass additional key-value pairs. 

>localhost:5000/person?name=name_3&age=3&hobbies=Sleep&motivation=none

example outputs:
```
{
"name": "name_3",
"age": "3",
"hobbies": "Sleep",
"motivation": "none"
}
```   

### Update a record 

You can update a record using `PUT` request with `id` after a `/person/`. Additional key-value pairs will change existing key-value pairs, or create them in case if they are new. 

>http://localhost:5000/person/3?name=new_name&age=99&hobbies=Workout&motivation=Money&new_par=new_par

example outputs:
```
{
"name": "new_name",
"age": "99",
"hobbies": "Workout",
"motivation": "Money",
"new_par": "new_par"
}
```   

### Delete a record 

You can delete a record using `DELETE` request with `id` after a `/person/`. 

>http://localhost:5000/person/3

example outputs:
```
{
"msg": "The person with id 3 is deleted successfully"
}
```   
