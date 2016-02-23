import tornado.ioloop
import tornado.httpserver
import tornado.web
import tornado.httpclient
import json

class MainHandler(tornado.web.RequestHandler):

    def handle_response(self, response):

        data = ""
        if response.error:
            data = response.error
            result = {"status" : "error", "error" : data}
            self.send
        else:
            data = response.body
            data = json.loads(data)
            result = {"status" : "ok", "data" : data}
            self.send(result)

    @tornado.web.asynchronous
    def get(self, url):

        request = tornado.httpclient.HTTPRequest("http://v1.nastyhosts.com/"+url)
        http_client = tornado.httpclient.AsyncHTTPClient()
        http_client.fetch(request, callback=self.handle_response)

    def send(self, result):

        self.write(result)
        self.finish()

app = tornado.web.Application([
        (r"/([^/]+)", MainHandler),
    ])

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(5000)
    tornado.ioloop.IOLoop.current().start()
