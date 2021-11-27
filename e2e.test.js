require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 5000;





    
test("check create a person with params", () => {
    http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/person?name=name&age=0&hobbies=Games',
        method: 'POST'
    }, (res)=>{
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            expect(JSON.parse(str)).toEqual({
                "name": "name",
                "age": "0",
                "hobbies": "Games"
                }); 
        });
    }).end();
})

test("check edit a person with new params", () => {
    http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/person/0?name=new_name&age=99&hobbies=None&NewVal=Ooo',
        method: 'PUT'
    }, (res)=>{
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            expect(JSON.parse(str)).toEqual({
                "name": "new_name",
                "age": "99",
                "hobbies": "None",
                "NewVal": "Ooo"
                }); 
        });
    }).end();
})


test("check deletion of a person", () => {
    http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/person/0',
        method: 'DELETE'
    }, (res)=>{
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            expect(JSON.parse(str)).toEqual({"msg": "The person with id 0 is deleted successfully"}); 
        });
    }).end();
})

test("check getting a deleted person", () => {
    http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/person/0',
        method: 'GET'
    }, (res)=>{
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            expect(JSON.parse(str)).toEqual({"message": "Person with id 0 not found"}); 
        });
    }).end();
})
