var router = require('koa-router')();

module.exports = function(redis) {
	router.redirect('/', '/foo');

	router.get('/:key', function*(next) {
		var val = yield redis.get(this.params.key);
		
		if (val !== null) {
			this.body = val;
		} else {
			this.body = "NULL";
		}
	});

	router.get('/:key/:value', function*(next) {
		this.body = yield redis.set(this.params.key, this.params.value);
	});

	return router;
};