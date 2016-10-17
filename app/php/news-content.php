<?php

$loadedCount = $_GET['loadedCount'];

if ( $loadedCount == 6 ){

    $json_data = '{
        "has_items": 1,
                    "items":[

                        {
                            "id":1,
                            "title": "ARTICLE TITLE IS LOOKING GREAT",
                            "picture": "pic/temp-002.jpg",
                            "href": "#"
                            },
                        {
                            "id":2,
                            "title": "ARTICLE TITLE IS LOOKING GREAT",
                            "picture": "pic/temp-002.jpg",
                            "href": "#"
                            },
                        {
                            "id":3,
                            "title": "ARTICLE TITLE IS LOOKING GREAT",
                            "picture": "pic/temp-002.jpg",
                            "href": "#"
                            }

                    ]
    }';

} else {

    $json_data = '{

        "has_items": 0,
            "items":[

                        {
                            "id":4,
                            "title": "ARTICLE TITLE IS LOOKING GREAT",
                            "picture": "pic/temp-002.jpg",
                            "href": "#"
                            },
                        {
                            "id":5,
                            "title": "ARTICLE TITLE IS LOOKING GREAT",
                            "picture": "pic/temp-002.jpg",
                            "href": "#"
                            },
                        {
                            "id":6,
                            "title": "ARTICLE TITLE IS LOOKING GREAT",
                            "picture": "pic/temp-002.jpg",
                            "href": "#"
                            }
            ]
        }';

};
echo $json_data;
exit;
?>
