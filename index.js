const cheerio = require('cheerio');
const axios = require('axios');



axios
  .get('https://au.gradconnection.com/graduate-jobs/engineering-software/')
  .then(res => {
    $ = cheerio.load(res.data);
	$('.box-header-title').each(function(i,title){
		console.log($(title).text());
		console.log($(title).attr('href'));
	});
  })
  .catch(error => {
    console.error(error);
  });