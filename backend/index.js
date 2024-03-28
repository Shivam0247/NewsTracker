const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 8800

app.get("/", (req, res) => {
    return res.json("From Backend Side");
});

app.use('/api/auth', require('./routes/user'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
