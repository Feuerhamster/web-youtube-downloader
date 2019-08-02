<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

if(isset($_GET["vid"])){


       $ytpage = file_get_contents("https://www.youtube.com/watch?v=".$_GET["vid"]);

       unset($_COOKIE);

       $pattern = "/ytplayer.config\ \=\ ({.+}});/";

       preg_match_all($pattern, $ytpage, $matches);
       $json = $matches[1][0];

       //parse informations
       
       $json = json_decode($json);
       
       $ytdata = $json->args->player_response;
       
       $ytdata = json_decode($ytdata);
       
       if($ytdata->videoDetails->useCipher == false){

              $data = new stdClass();

              $data->title = $ytdata->videoDetails->title;
              $data->channel = $ytdata->videoDetails->author;
              $data->videoId = $ytdata->videoDetails->videoId;
              $data->length = $ytdata->videoDetails->lengthSeconds;
              $data->views = $ytdata->videoDetails->viewCount;

              $data->sources = $ytdata->streamingData;
              $data->thumbnails = $ytdata->videoDetails->thumbnail->thumbnails;

              $send = json_encode($data);

              echo $send;

       }else{
              $data = new stdClass();
              $data->error = "cipher_video";
              $send = json_encode($data);
              echo $send;
       }

}else{
       $data = new stdClass();
       $data->error = "missing_video_id";
       $send = json_encode($data);
       echo $send;
}
?>
