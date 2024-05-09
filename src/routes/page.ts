import express, {Request, Response} from "express";

const router = express.Router()

//render register page
router.get('/register', (req: Request, res: Response)=> {
    res.render("register");
});

//render Login page
router.get('/Login', (req: Request, res: Response)=> {
    res.render("Login");
});

//render Login page
router.get('/index', (req: Request, res: Response)=> {
    res.render("index");
});

export default router;