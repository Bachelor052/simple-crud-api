var data = {
    
}

function getPersons() {
    return new Promise((resolve, _) => {
        resolve(data);
    });
}

function getPerson(get_id) {
    return new Promise((resolve, reject) => {
        let id = parseInt(get_id);
        if (data[id] != undefined) {
            resolve(data[id]);
        } else {
            reject(`Person with id ${id} not found`);
        }
    });
} 

function createPerson(person) {
    return new Promise((resolve, reject) => {
        let id = Math.max(...Object.keys(data)) + 1;
        if(id < 0){
            id = 0
        }
        data[id] = person;
        resolve(person);
    });
}

function updatePerson(params) {
    return new Promise((resolve, reject) => {
        let id = params.id;
        if (data[id] == undefined) {
            reject(`No person with id ${id} found`);
        } else {
            let keys = Object.keys(params)
            keys.forEach(key => {
                if(key!="id")
                data[id][key] = params[key]
            });
            resolve(data[id]);
        }
    });
}

function deletePerson(id) {
    return new Promise((resolve, reject) => {
        if (data[id] == undefined) {
            reject(`Person with id ${id} NOT found!`);
        }else{
            delete data[id];
            resolve(`The person with id ${id} is deleted successfully`);
        }
    });
}

module.exports = {
    getPersons : getPersons,
    getPerson : getPerson,
    createPerson : createPerson,
    updatePerson : updatePerson,
    deletePerson : deletePerson
}