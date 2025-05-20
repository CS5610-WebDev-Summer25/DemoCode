var already_clicked = false;

$(document).ready(function() {
    $(document).click(function(){
        if (!already_clicked) {
            $("#events").append("<li>You clicked somewhere!</li>");
        } else {
            already_clicked = false;
        }
    });

    $(".foo").click(function(){
        $("#events").append("<li>You clicked the foo div!</li>");
        already_clicked = true;
    });

    $(".bar").click(function(){
        $("#events").append("<li>You clicked the bar div!</li>");
        already_clicked = true;
    });

});
