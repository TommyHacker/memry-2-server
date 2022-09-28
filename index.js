const app = require('./app');
const dbSetup = require('./db');
const port = process.env.PORT || 4000;

dbSetup();

app.listen(port, () => console.log(`server:${port}`));
