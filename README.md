# HTTP-сервер на Node.js ЛР05
function task00() {

Создаем на Github репозиторий cwp-05, клонируем его, открываем в IDE

}

function task01() {

Создаем файл index.js

Напишем в нем самый простой http-сервер

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

Запустим сервер - node index.js

Запустим браузер и перейдем по адресу 127.0.0.1:3000, должны увидеть наше приветствие

}

function task02() {

Перепишем наш сервер для того, чтобы он принимал и возвращал JSON

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  parseBodyJson(req, (err, payload) => {
    const c = { c: payload.a + payload.b };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end( JSON.stringify(c) );
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

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

Перезапустим наш сервер. Остановить запущееный в терминале сервер можно комбанацией клавиш Ctrl + C

Установим программу для отправки HTTP-запросов Postman

Через Postman отправим POST запрос в формате JSON на уже знакомый адрес с телом

{

  "a": 41,
  
  "b": 1
  
}


Должны получить следующий ответ

{

  "с": 42
  
}

}

function task03() {

Выделим отдельный URL для суммирования чисел

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
  '/sum': sum
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
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

Перезапустим наш сервер ещё раз и проверим его работу через Postman. URL теперь поменялся на 127.0.0.1:3000/sum

Попробуем отправить запрос на другой URL, например, 127.0.0.1:3000/mult

}

function task04() {

Теперь нам необходимо расширить функционал нашего сервера. Он должен предоставлять возможность выполнять CRUD-операции для статей и комментариев к этим статьям

1. Массив статей/комментариев хранить в файле articles.json и загружать при запуске сервера. Важно чтобы сервер не начинал принимать запросы до того как массив станет доступен

2. Модель статьи:

"id": int / string

"title": string

"text": string

"date": int

"author": string

"comments": array

3. Модель комментария:

"id": int / string

"articleId": int / string

"text": string

"date": int

"author": string

4. Реализовать логику для следующих URL: 

/api/articles/readall - возвращает массив статей с комментариями 

/api/articles/read - возвращает статью с комментариями по переданному в теле запроса id 

/api/articles/create - создает статью с переданными в теле запроса параметрами / id генерируется на сервере / сервер возвращает созданную статью 

/api/articles/update - обновляет статью с переданными параметрами по переданному id 

/api/articles/delete - удаляет статью по переданному id 

/api/comments/create - создает комментарий для статьи с переданными в теле запроса параметрами (в том числе articleId) / id генерируется на сервере / сервер возвращает созданный комментарий 

/api/comments/delete - удаляет комментарий по переданному id

5. На операции создания, обновления и удаления сервер должен также обновлять файл articles.json

6. Сервер должен вести логи для всех запросов на сервер с информацией о дате и времени запроса, запрашиваемом URL и теле запроса. Оформим лог с хорошими отступами, чтобы было удобнее читать

7. Запрограммируем ответы сервера таким образом, чтобы клиенту не требовалось дожидаться записи в лог и дампа файла articles.json

8. Вынесем обработчики разных URL в отдельные файлы

9. Запрограммируем валидацию для входных данных, чтобы убедится что клиент посылает нам достаточно данных. В случае если данных недостаточно либо формат данных неверен будем возвращать ошибку

{
  
  "code": 400,

"message: "Request invalid"

}

}

function task05() {

Синхронизируем локальный репозиторий с удаленным (сделаем push на Github)

}
