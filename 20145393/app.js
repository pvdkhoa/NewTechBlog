const express = require('express');
const path = require('path')
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,'public')));

// Sử dụng Handlebars làm template engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Sử dụng bodyParser để đọc dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: false }));

// Sử dụng các route từ blogController
const blogController = require('./controllers/blogController');
app.use('/', blogController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});