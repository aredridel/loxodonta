const express = require('express');

const app = express();

app.use((req, res, next) => {
	console.warn(req, res);
	next();
});

app.listen(process.env.PORT || 8014);
