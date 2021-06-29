import {Request, Response, Router} from "express";
import {VideoData} from "../types/youtube";
import {YouTube} from "../services/youtube";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {

    // No video searched -> startpage
    if(!req.query.url) {
        res.render("index");
        return;
    }

    let video: VideoData = await YouTube.getVideoInfo(req.query.url);

    // Cant get video -> error page
    if(!video) {
        res.render("error");
        return;
    }

    res.render("video", video);

});

router.get("/about", (req, res) => res.render("about"));

export default router;