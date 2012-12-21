
module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', { title: 'Express' });
  });
  app.get('/index', function(req, res){
    res.render('index', { title: 'Express' });
  });

  app.get('/login', function(req, res){
    res.render('login', { title: 'Express' });
  });

  app.get('/schoolNews', function(req, res){
    res.render('schoolNews', { title: 'Express' });
  });

  app.get('/jobsInfo', function(req, res){
    res.render('jobsInfo', { title: 'Express' });
  });

  app.get('/partTimeJobsInfo', function(req, res){
    res.render('partTimeJobsInfo', { title: 'Express' });
  });

  app.get('/content', function(req, res){
    res.render('content', { title: 'Express' });
  });
};