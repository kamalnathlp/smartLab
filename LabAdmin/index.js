const express = require('express');
const app = express();
const port = 3001;

app.use(express.static('loginAuth/static'));

app.get('/', (req, res) => {
  res.sendFile('./loginAuth/Index.html', { root: __dirname });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
