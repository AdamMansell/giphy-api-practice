import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
//import project function here!

$(document).ready(function() { 
  $("#searchSubmitBtn").click(function() {
    const searchKeyword = $("#searchTerm").val();
    $("#searchTerm").val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchKeyword}&limit=25&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    
    request.send();

    function getElements(response) {
      console.log(response.data[0].url);
      console.log('META', response.meta);
      console.log(response);
      $(".showGifs").html(`<img src='${response.data[1].url}'>`);
      //$(".showGifs").append("<img src='" + response.data[1].url + "'>");
    }
  });
});


