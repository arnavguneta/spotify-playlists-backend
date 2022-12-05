import express, { Application, Request, Response } from 'express';

const port = process.env.PORT || 3000;

const app: Application = express();
app.use(express.json());

// app.get()
app.use('/', (req: Request, res: Response) => {
    res.send('hello');
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
