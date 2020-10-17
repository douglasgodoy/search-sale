import * as express from 'express';
import puppeteer from './integrations/Poppeteer/main';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
const app = express();
   
const port: number = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`http://localhost:${port}`))

app.post('/', async (req: express.Request, res: express.Response, next) => {
    res.send(await puppeteer(req.body));
    next()
});

