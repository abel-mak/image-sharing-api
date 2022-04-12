const express = require('express');
const app     = express();
const routes = require("./routes");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use("/uploads", express.static('uploads'))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(port, () => {
	console.log(`listen on ${port}`);
});