<?php

$loadedCount = $_GET['loadedCount'];

if ( $loadedCount == 4 ){

//  "has_items" - the number of not downloaded tweets
//  "name" -  user name
//  "login" - user login
//  "feed_txt" - text of feed
//  "href" - link to twitter

    $json_data = '{
        "has_items": 1,
                    "items":[

                        {
                            "id":1,
                            "name": "James Smith1",
                            "login": "@jam3sdean",
                            "feed_txt": "Digital creative agencies can get interest-free #business loans of £20k - £250k",
                            "href": "#"
                            },
                        {
                            "id":2,
                            "name": "James Smith2",
                            "login": "@jam3sdean",
                            "feed_txt": "Digital creative agencies can get interest-free #business loans of £20k - £250k",
                            "href": "#"
                            },
                        {
                            "id":3,
                            "name": "James Smith3",
                            "login": "@jam3sdean",
                            "feed_txt": "Digital creative agencies can get interest-free #business loans of £20k - £250k",
                            "href": "#"
                            },
                        {
                            "id":4,
                            "name": "James Smith4",
                            "login": "@jam3sdean",
                            "feed_txt": "Digital creative agencies can get interest-free #business loans of £20k - £250k",
                            "href": "#"
                            }

                    ]
    }';

} else {

//  "has_items" - the number of not downloaded tweets
//  "name" -  user name
//  "login" - user login
//  "feed_txt" - text of feed
//  "href" - link to twitter

    $json_data = '{

        "has_items": 0,
            "items":[

                        {
                            "id":5,
                            "name": "James Smith1",
                            "login": "@jam3sdean",
                            "feed_txt": "Digital creative agencies can get interest-free #business loans of £20k - £250k",
                            "href": "#"
                            },
                        {
                            "id":6,
                            "name": "James Smith2",
                            "login": "@jam3sdean",
                            "feed_txt": "Digital creative agencies can get interest-free #business loans of £20k - £250k",
                            "href": "#"
                            }
            ]
        }';

};
echo $json_data;
exit;
?>
