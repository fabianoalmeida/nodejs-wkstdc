
var mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
mongoClient.connect("mongodb://localhost/wkstdc")
            .then(conn => global.conn = conn.db("wkstdc"))
            .catch(err => console.log(err))

const TAMANHO_PAGINA = 10;

function findAll(pagina, callback){
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1);
    global.conn.collection("customers").find({})
                                       .skip(tamanhoSkip)
                                       .limit(TAMANHO_PAGINA)
                                       .toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}

function findOne(id, callback){
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback){
    global.conn.collection("customers").updateOne({_id: new ObjectId(id)}, {$set: { nome : customer.nome, idade:customer.idade }}, callback);
}

function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

function countAll(callback){  
    global.conn.collection("customers").count(callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, TAMANHO_PAGINA }
