const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const stringify = require('csv-stringify/sync');

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

	let datacsv=[];
	for (let idx=0; idx<titles.length;idx++ )
	{
		datacsv.push([titles[idx],closingdates[idx],'https://au.gradconnection.com'+urls[idx]]);
	}
	
	let csv=stringify['stringify'](datacsv);
	fs.writeFileSync('list.csv', csv);
})();
