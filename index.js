const cheerio = require('cheerio');
const axios = require('axios');

let titles;
let urls;
let closingdates;

async function getdata() {
  try {
    const reslist = await axios.get('https://au.gradconnection.com/graduate-jobs/engineering-software/')
    let $ = cheerio.load(reslist.data);
    for(title of $('.box-header-title'))
	{
		titles.push($(title).text());
		urls.push($(title).attr('href'));
		const resdata = await axios.get('https://au.gradconnection.com'+$(title).attr('href'));
		$=cheerio.load(resdata.data);
		for (data of $('.box-content-catagories.catagories-list'))
		{
			if($(data).first().text().indexOf('Closing Date')!=-1) closingdates.push($(data).children().remove().end().text());
		}
		
	}
  } catch(err) {
    console.log(err);
  }
}

(async function()
{
	
	titles=[];
	urls=[];
	closingdates=[];

	await getdata();
	console.log(titles)
	console.log(urls)
	console.log(closingdates)
})();

