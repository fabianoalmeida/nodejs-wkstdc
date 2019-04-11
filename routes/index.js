var express = require('express');
var router = express.Router();

/* GET new customer. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/new' });
});

/* POST new customer. */
router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (e, result) => {
    if(e) { return console.log(e); }
    res.redirect('/');
  });
});

/* GET edit customer. */
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
    if(e) { return console.log(e); }
    res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
  });
});

router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.update(id, {nome, idade}, (e, result) => {
    if(e) { return console.log(e); }
    res.redirect('/');
  });
});

router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
    if(e) { return console.log(e); }
    res.redirect('/');
  });
});

/* GET home page. */
router.get('/:pagina?', function(req, res, next) {
  const pagina = parseInt(req.params.pagina || "1");
  global.db.findAll(pagina, (e, docs) => {
    if(e) { return console.log(e); }

    global.db.countAll((e, count) => {
      if(e) { return console.log(e); }

      const qtdPaginas = Math.ceil(count / global.db.TAMANHO_PAGINA);
      res.render('index', { title: 'Lista de Clientes', docs, count, qtdPaginas, pagina });
    });
  })
});

module.exports = router;
