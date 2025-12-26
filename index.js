const express = require('express');
const dotenv = require('dotenv').config();
const errorMiddleware = require('./middlewares/errorMiddleware')
const port = process.env.PORT || 5000;

const connect_db = require('./connect/db');
connect_db();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require('./routes/userRoutes'))
app.use("/role", require('./routes/roleRoutes'))
app.use("/discipline", require('./routes/disciplineRouters'))
app.use("/healthT", require('./routes/roleRoutes'))
app.use("/exCategory", require('./routes/ExamCategoryRouters'))
app.use("/exType", require('./routes/ExamTypeRoutes'))
app.use("/examReport", require('./routes/examReportRoutes'))
app.use("/exam", require('./routes/examRoutes'))

app.use(errorMiddleware)

app.listen(port, () => console.log(`Server listening on ${port}`));
