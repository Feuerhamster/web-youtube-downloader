# Web YouTube Downloader
A simple express app which allows you to view all source urls of a YouTube video to directly download it from Google's servers.

## 📦 Dependencies
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Pug](https://pugjs.org/)
- [ytdl-core](https://www.npmjs.com/package/ytdl-core)

## 💽 Installation
### Docker
```shell
git clone https://github.com/Feuerhamster/web-youtube-downloader.git
cd web-youtube-downloader
docker build -t Feuerhamster/web-youtube-downloader .
docker run Feuerhamster/web-youtube-downloader
  -e PORT=3000
```

### Manually
*Requires NodeJS 14 or higher*

```shell
git clone https://github.com/Feuerhamster/web-youtube-downloader.git
cd web-youtube-downloader
npm install
npm run build
npm run start
```