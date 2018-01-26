const HEADERS = {
	Host: 'tools.applemusic.com',
	Connection: 'keep-alive',
	Pragma: 'no-cache',
	'Cache-Control': 'no-cache',
	Accept: 'text/javascript',
	// Accept: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
	'X-NewRelic-ID': 'VQIHUl9RDxACXFBaDgABVQ==',
	'X-CSRF-Token': '748Lh44uZIxqzhO0ARTDxVdE7m7+7HEqKqGX4dKgnwiza9at3vnB4on0MavLjbv6c8sLq7Z8zwsY0L2yZtlOmw==',
	'X-Requested-With': 'XMLHttpRequest',
	'User-Agent':
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
	// 'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
	Cookie:
		'locale=en-us; _lost-sound_session=MTFqenBML3B6aUt1a21EOXdydkJTdEhhZW9GV1B5WHo2dUh1UWJkM3BZOVBEOVlPQzdFeTlBWG9CVi9Md29JZUtSOTlPSW94K1N2bnhVM3FHc253TW9FejE4R2RONlZSdFJPcUJWdjlJd2FxVHUzWHlGVTcrMjRKR3FQQ3MyRmdpUHJXdUxxejZVQmw2SEtlWUpSeUZRPT0tLUhUY2kzdTFaTGFDWkpaMFdpMnlXWUE9PQ%3D%3D--7ecd6f208af92f50dd2ab2ba1729b7ba5b27f784'
};

const QUERY_PARAMETERS = {
	country: 'us',
	media: 'songs',
	utf8: '%E2%9C%93',
	term: ''
};

const URI = 'http://tools.applemusic.com/en-us/search';

module.exports = {
	HEADERS,
	QUERY_PARAMETERS,
	URI
};
