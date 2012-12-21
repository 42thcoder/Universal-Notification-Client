
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.schoolNews = function(req, res){
  res.render('schoolNews', { title: 'Express' });
};

exports.jobsInfo = function(req, res){
  res.render('jobsInfo', { title: 'Express' });
};

exports.partTimeJobsInfo = function(req, res){
  res.render('partTimeJobsInfo', { title: 'Express' });
};

exports.content = function(req, res){
  res.render('content', { title: 'Express' });
};