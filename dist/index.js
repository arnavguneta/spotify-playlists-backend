import express from 'express';
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// app.get()
app.use('/', (req, res) => {
    res.send('hello');
});
app.listen(port, () => console.log(`Server is listening on port ${port}`));
//# sourceMappingURL=index.js.map