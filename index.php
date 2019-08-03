<!DOCTYPE html>

<html>

    <head>

        <script
			  src="https://code.jquery.com/jquery-3.4.1.min.js"
			  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
              crossorigin="anonymous"></script>

        <title>Web-Youtube-Downloader</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=400, initial-scale=0.8">
        <meta name="description" content="Get data of youtube videos and download the sources">

        <link rel="stylesheet" href="style.css?v=2" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet"> 

    </head>


    <body>

        <div id="head-bar">

            <h1 onclick="window.location.href='./';" style="cursor: pointer;"> <i class="fas fa-file-video"></i> <span id="head-text">Web-Youtube-Downloader</span></h1>

            <div class="spacer"></div>

            <input type="text" id="headbar-video-url" placeholder="Paste your video URL" onchange="loadVideoURL(this.value); this.value = '';" />

        </div>

        <div id="content">

        </div>

        <footer>
            <a href="?page=documentation">Developer API</a> <a href="https://github.com/Feuerhamster/web-youtube-downloader" target="_blank">GitHub</a> <a href="?page=infos">Disclaimer/Informations</a>
        </footer>

    </body>

</html>
<script src="index.js"></script>