require('dotenv').config();
const http = require("http");
const url = require("url");
const controller = require("./utils/controller");
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    if (req.url.match(/^\/person[\/]?$/) && req.method === "GET") {
        let persons = controller.getPersons();
        persons.then((msg) => {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(msg));
        })
    } else if (req.url.match(/^\/person\/.*/) && req.method === "GET" && req.url != "/person/") {
        var temp = req.url.split("/")[2]
        var get_id = temp.split("?")[0]

        if (!isNaN(get_id) && get_id.length > 0) {
            var person = controller.getPerson(get_id);
            person.then((msg) => {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify(msg));
            }).catch((err) => {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: err
                }));
            })
        } else {
            let errorMessage = `uuid is incorrect: \"${get_id}\". Must be a non-negative integer`;
            if (temp.split("?")[0].length < 1) {
                errorMessage = "uuid is missing! Must be a non-negative integer";
            }
            if (errorMessage.length > 1) toBe = "are"
            res.writeHead(400, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(`Wrong params! "${errorMessage}`));
        }

    } else if (req.url.match(/^\/person\?.*/) && req.method === "POST") {
        var queryData = url.parse(req.url, true).query;
        console.log(queryData)
        if (queryData.name != undefined && queryData.age != undefined && queryData.hobbies != undefined) {
            let result = controller.createPerson(queryData)
            result.then((msg) => {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify(msg));
            }).catch((err) => {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: err
                }));
            })
        } else {
            let errorMessage = [];
            let toBe = "is"
            if (queryData.name == undefined) {
                errorMessage.push("name")
            }
            if (queryData.age == undefined) {
                errorMessage.push("age")
            }
            if (queryData.hobbies == undefined) {
                errorMessage.push("hobbies")
            }
            if (errorMessage.length > 1) toBe = "are"
            res.writeHead(400, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(`Wrong params! \"${errorMessage}\" ${toBe} missing.`));
        }

    } else if (req.url.match(/^\/person\/.*/) && req.method === "PUT") {
        var temp = req.url.split("/")[2]
        var mod_id = temp.split("?")[0]
        var queryData = url.parse(req.url, true).query;
        if (!isNaN(mod_id)) {
            queryData.id = mod_id
            let result = controller.updatePerson(queryData)
            result.then((msg) => {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify(msg));
            }).catch((err) => {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: err
                }));
            })
        } else {
            let errorMessage = "";
            if (isNaN(mod_id)) errorMessage = ` uuid is incorrect: \"${mod_id}\". Must be a non-negative integer`;

            res.writeHead(400, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(`Wrong params!${errorMessage}`));
        }
    } else if (req.url.match(/^\/person\/.*/) && req.method === "DELETE") {
        var temp = req.url.split("/")[2]
        var del_id = temp.split("?")[0]
        if (!isNaN(del_id)) {
            let result = controller.deletePerson(del_id);
            result.then((msg) => {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    msg
                }));
            }).catch((err) => {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: err
                }));
            })
        } else {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify(`wrong params.  uuid is incorrect: \"${del_id}\". Must be a non-negative integer`));
        }
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({
            message: "Route not found: " + req.url
        }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});