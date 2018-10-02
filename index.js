const http = require("http");
const fs = require("fs");
const log = require("./log.js");
const readAll = require("handlers/readAll.js");
const read = require("handlers/read.js");
const updateArticle = require("handlers/updatearticle.js");
const createArticle = require("handlers/createarticle.js");
const deleteArticle = require("handlers/deletearticle.js");
const createComment = require("comments/createcomment");
const deleteComment = require("comments/deletecomments");
const f = require("fs").createWriteStream("log.txt");
let articles = [];
const hostname = "localhost";
const port = 3000;

const handlers = {
	'/sum': sum,
	'/api/articles/readall': readAll.readAll,
	'/api/articles/read': read.read,
	'/api/articles/update': updateArticle.updateArticle,
	'/api/articles/create': createArticle.createArticle,
	'/api/articles/delete': deleteArticle.deleteArticle,
	'/api/comments/create': createComment.createComment,
	'/api/comments/delete': deleteComment.deleteComment
};

const server = http.createServer((req, res) => {
	parseBodyJson(req, (err, payload) => {
		const handler = getHandler(req.url);

		handler(req, res, payload, (err, result) => {
			if (err) {
				res.statusCode = err.code;
				res.setHeader('Content-Type', 'application/json');
				res.end( JSON.stringify(err) );

				return;
			}

			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end( JSON.stringify(result) );
		});
	});
});
//task 04.01
const a = new Promise((res, rej) => {
	articles = require("./articles.json");
});
a.then(() => {
	server.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	});
});

function getHandler(url) {
	return handlers[url] || notFound;
}

function sum(req, res, payload, cb) {
	const result = { c: payload.a + payload.b };

	cb(null, result);
}

function notFound(req, res, payload, cb) {
	cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
	let body = [];

	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		body = Buffer.concat(body).toString();

		let params = JSON.parse(body);

		cb(null, params);
	});
}