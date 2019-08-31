//Array that stores topics that will be pulled from Giphy
var topics = ["batman", "jessica jones", "deadpool", "wonder woman", "captain marvel"];

/*-------------------AJAX REQUEST--------------------------------------------------*/
function infoDisplay() {
    //pulls request for selected topic
var selected = $(this).attr("data-topic");
console.log(selected);


//stores query. A request is limited to 10 gifs and has a rating of PG or lower. 
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ELC8OedTaDdrG3ruUPvjtuXXUxkfrbY6&q=" + selected + "&limit=10&offset=0&rating=PG&lang=en";


//Makes an AJAX GET request to queryURL
$.ajax({
    url: queryURL,
    method: "GET"
})

//after the data is called from AJAX request
.then(function(response){
$("#giphy-output").text(JSON.stringify(response));
console.log(response.data);
    });
}
/*-----------------END OF AJAX REQUEST-----------------------------------------------*/

/*---------------------CREATES BUTTONS-----------------------------------------------*/
//prevents buttons from duplicating
$("#buttons-output").empty();
//loops throuh array and creates a button for items in array. 
for (var i = 0; i < topics.length; i++) {
    //create button
    var createTopicButton = $("<button>");
    //create button class
    createTopicButton.addClass("topics-button");
    //add data attribute
    createTopicButton.attr("data-topic", topics[i]);
    //writes text for each button depending on the topic.
    createTopicButton.text(topics[i]);
    //adding button to the HTML
    $("#button-output").append(createTopicButton);
    }
 
/*-------------------END OF BUTTON CREATION----------------------------------------*/

/*-------------------PUTS AJAX CALL INTO DIV---------------------------------------*/
$(document).on("click", ".topics-button", infoDisplay);



