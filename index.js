const Promise = require('bluebird'),
	_ = require('lodash'),
	request = require('request-promise'),
	{ HEADERS, QUERY_PARAMETERS, URI } = require('./configs/config'),
	restify = require('restify'),
	server = restify.createServer();

function getRequestOptions(options) {
	const queryParameters = Object.assign({}, QUERY_PARAMETERS);
	queryParameters.term = options.name;
	const headers = Object.assign({}, HEADERS);
	const params = {
		uri: URI,
		qs: queryParameters,
		headers
	};

	return params;
}

function reduceResponseData(inputData) {
	return inputData.items.reduce((collection, itemObject) => {
		const computedObject = {
			curators: itemObject.artistOrCuratorName,
			id: itemObject.id,
			name: itemObject.name,
			posterSrc: itemObject.resultImage,
			iframeTag: `<iframe src="https://tools.applemusic.com/embed/v1/song/${
				itemObject.id
			}?country=us&itscg=30200&itsct=afftoolset_1" height="110px" width="100%" frameborder="0"></iframe>`
		};

		collection.push(computedObject);
		return collection;
	}, []);
}

function transformResponseData(response) {
	let computedData;
	let intermediateString = response.split(`append(bubbleTemplate(`)[1].split(')).')[0];

	intermediateString = intermediateString
		.replace(/img onerror="/g, "img onerror='")
		.replace(/" alt="/g, "' alt='")
		.replace(/" width="/g, "' width='")
		.replace(/" height="/g, "' height='")
		.replace(/" \/>/g, "'/>");

	computedData = JSON.parse(intermediateString);
	computedData = reduceResponseData(computedData);
	return computedData;
}

function getData(name) {
	const options = getRequestOptions({ name });

	return request(options)
		.then(transformResponseData)
		.catch(err => {
			console.log(`Got Error while fetching data: ${err}`);
			return {};
		});
}

server.get(
	/\/public\/?.*/,
	restify.plugins.serveStatic({
		directory: __dirname
	})
);

server.get('/', function(req, res, next) {
	res.send('home');
	return next();
});

server.get('/search/:type/:name', function(req, res, next) {
	const { type, name } = req.params;

	getData(name)
		.then(data => res.send(data))
		.finally(() => {
			next();
		});
});

server.listen(8000, function() {
	console.log('%s Restify server listening at %s', server.name, server.url);
});
