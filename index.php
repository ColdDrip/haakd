<?php

require "lib/mysql.php";
require "lib/queries.php";
require "lib/Toro.php";

ToroHook::add("404", function() {
    header("HTTP/1.0 404 Not Found");
    echo "This isn't the Page you're looking for.";
    exit;
});

Toro::serve(array(
    "/" => "ViewHandler",
    "/publish/:string" => "PublishHandler",
    "/view" => "ViewHandler"
));

?>
