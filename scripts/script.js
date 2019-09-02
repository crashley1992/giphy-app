$(document).ready(function() {

  //Array that stores topics that will be pulled from Giphy
  var topics = ["batman", "jessica jones", "deadpool", "wonder woman", "captain marvel", "spiderman", "justice league", "watchmen", "green arrow", "the umbrella academy"];

  /*-------------------AJAX REQUEST--------------------------------------------------*/
  function infoDisplay() {
    //pulls request for selected topic
    var selected = $(this).attr("data-topic");
    console.log(selected);


    //stores query. A request is limited to 10 gifs and has a rating of PG or lower.
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ELC8OedTaDdrG3ruUPvjtuXXUxkfrbY6&q=" + selected + "&limit=10&offset=0&rating=PG&lang=en";
    console.log(queryURL);

    //Makes an AJAX GET request to queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      //after the data is called from AJAX request
      .then(function(response) {

        /*------------------DISPLAYS GIF---------------------------------------------------*/
        //stores response data 
        var gifData = response.data;
        //tests for response data call
        console.log(gifData);
        //removes previous gifs that were displayed
        $("#giphy-output").empty();

        //loop for gif display and attribute assinments
        for (var i = 0; i < gifData.length; i++) {

          //creates div for each displayed gif
          var displayedGifDiv = $("<div>");
          //Outputs rating listed in API
          var ratingDisplay = $("<p>").text("Rating: " + gifData[i].rating);
          //creates class used for stlying
          ratingDisplay.addClass("gif-rating");
          //creates html where gif will be displayed
          var gifDisplay = $("<img>");

          //----ANIMATION STATES ASSIGNMENT------//

          //Image is still until animation is initated
          gifDisplay.attr("src", gifData[i].images.fixed_height_still.url);
          console.log(gifData[i].images.fixed_height_still.url);
          //where paused gif is called from API
          gifDisplay.attr("data-still", gifData[i].images.fixed_height_still.url);
          //where moving gif is called from API
          gifDisplay.attr("data-animate", gifData[i].images.fixed_height.url);
          console.log(gifData[i].images.fixed_height.url)
          //data state at still
          gifDisplay.attr("data-state", "still");
          //makes gif class
          gifDisplay.addClass("gif");

          // //pushes gifs to created div
          displayedGifDiv.append(gifDisplay);
          // //pushes rating to created div
          displayedGifDiv.append(ratingDisplay);
          // //prepending displayedGifDiv to html page
          $("#giphy-output").prepend(displayedGifDiv);
        } //end of for loop

      });

  } //end of info display function

  /*---------------------CREATES BUTTONS-----------------------------------------------*/
  //loops throuh array and creates a button for items in array.
  function generateButtons() {

    //Prevents duplication of buttons when a new topic is added.
    $("#button-output").empty();

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
      //adds bootstrap class to buttons
      createTopicButton.addClass("btn btn-info")
    }
  }

  /*--------------------FORM INPUT-----------------------------------------------------*/

  $("#add-gif").on("click", function(event) {

    //keeps buttons from reseting to default after form has been submitted
    event.preventDefault();

    //takes vaule submited by user and pushed to topics array
    var gifInput = $("#gif-input").val().trim();
    topics.push(gifInput);

    //creates all buttons including the new topic.
    generateButtons();
  });
  //calls buttons before new toic is added.
  generateButtons();

  /*-------------------END OF BUTTON CREATION----------------------------------------*/

  /*-------------------CHANGES STATE OF ANIMATION----------------------------------- */
  //when gif class is clicked the state of still or animated gif changes
  function playGif() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }
  //END OF INFO DISPLAY FUNCTION
  /*-----------------END OF AJAX REQUEST-----------------------------------------------*/

  //event listener for when button is clicked and displays gifs
  $(document).on("click", ".topics-button", infoDisplay);
  //event listener for when gif is clicked and paused gif or animates it.
  $(document).on("click", ".gif", playGif);
});
