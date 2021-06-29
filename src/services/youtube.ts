import ytdl, {videoInfo} from "ytdl-core";
import {FormatType, VideoData} from "../types/youtube";
import NodeCache from "node-cache";

export class YouTube {

    private static cache = new NodeCache({ stdTTL: 3600 });

    static async getVideoInfo(url): Promise<VideoData> {

        if(this.cache.has(url)) {
            return this.cache.get(url);
        }

        let video: videoInfo = null;
        let videoData: VideoData = <VideoData>{};

        // Get video info
        try {
            video = await ytdl.getInfo(url.toString());
        } catch(e) {
            return null;
        }

        // format info data
        videoData.id = video.videoDetails.videoId;
        videoData.url = video.videoDetails.video_url;
        videoData.title = video.videoDetails.title;
        videoData.author = video.videoDetails.author.name;

        videoData.thumbnails = video.videoDetails.thumbnails.map((t) => ({
            url: t.url,
            size: `${t.width}x${t.height}`
        }));

        videoData.formats = video.formats.map((f) => ({
            type: f.hasVideo && f.hasAudio ? FormatType.main : f.hasVideo ? FormatType.video : FormatType.audio,
            quality: f.qualityLabel,
            container: f.container,
            codecs: f.codecs,
            url: f.url,
            bitrate: f.bitrate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }));

        videoData.formats = videoData.formats.sort((a, b) => a.type < b.type ? -1 : a.type > b.type ? 1 : 0);

        // Save to cache
        if(!this.cache.has(url)) {
            this.cache.set(url, videoData);
        }

        return videoData;

    }

}