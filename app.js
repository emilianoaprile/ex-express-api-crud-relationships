const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler.js');
const errorNotFound = require('./middlewares/errorNotfound.js');
require("dotenv").config();
const port = process.env.PORT || 3000;
const postsRouter = require('./routers/postRoutes.js');
const categoriesRouter = require('./routers/categoryRoutes.js');

// middleware json
app.use(express.json());

//middleware routes
app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);

// middleware error
app.use(errorNotFound)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
})