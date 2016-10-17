<?php

$json_str = '{}';
if (!empty($_GET['getlocations'])) {
//  "color" -  color of button
//  "title" - event's title
//  "icon" - placemark icon
//  "description" - text for popup
    $json_str = '{
        "locations":
        [
        {
                            "id":4,
                            "color":"#9b54d1",
                            "title": "Mouse hover",
                            "icon": "img/marker1.png",
                            "coordinates": [51.504322, -0.376216],
                            "description": "some text1"
                            },
                        {
                            "id":5,
                            "color":"#345cc2",
                            "title": "Mouse hover2",
                            "icon": "img/marker2.png",
                            "coordinates": [51.514322, -0.576216],
                            "description": "some text2"
                            },
                        {
                            "id":6,
                            "color":"#ff8e42",
                            "title": "Mouse hover3",
                            "icon": "img/marker1.png",
                            "coordinates": [51.524322, -0.676216],
                            "description": "some text3"
                            },
                        {
                            "id":7,
                            "color":"#9b54d1",
                            "title": "Mouse hover4",
                            "icon": "img/marker3.png",
                            "coordinates": [51.534322, -0.976216],
                            "description": "some text4"
                            },
                        {
                            "id":8,
                            "color":"#345cc2",
                            "title": "Mouse hover5",
                            "icon": "img/marker1.png",
                            "coordinates": [51.544322, -0.176216],
                            "description": "some text5"
                            },
                        {
                            "id":9,
                            "color":"#ff8e42",
                            "title": "Mouse hover",
                            "icon": "img/marker1.png",
                            "coordinates": [51.544322, -0.976216],
                            "description": "some text"
                            }

        ]
    }';
}
echo $json_str;


exit;
?>
