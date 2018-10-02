const log = require("../../log.js");
const file = require("fs").createWriteStream("log.txt");
let articles = require("../../articles.json");
const valid = require("./valid.js");
const ErrorObject = { code: 400, message: 'Invalid request' };


module.exports.updateArticle = function updateArticle(req, res, payload, cb) {
	if (payload.id !== undefined) {
		ExistID(payload.id).then(
			exist => {
				for (i = 0; i < articles.length; i++) {
					if (articles[i].id == payload.id) {
						if (payload.title !== undefined)
							articles[i].title = payload.title;
						if (payload.text !== undefined)
							articles[i].text = payload.text;
						if (payload.author !== undefined)
							articles[i].author = payload.author;
						if (payload.date !== undefined)
							articles[i].date = payload.date;
						let result = articles[i];
						fs.writeFile("./content/articles.json", JSON.stringify(articles), "utf8", function () { });
						cb(null, "update");
					}
				}
			},
			error => {
				cb({code: 404, message: 'Not found'});
			}
		)
	}
	else {
		cb(null, "{code: 400, message: Request invalid}");
	}
}