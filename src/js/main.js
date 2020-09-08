import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
//import project function here!

$(document).ready(function() { 
  let requestTrend = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=5&rating=g`;
  requestTrend.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const responseTrend = JSON.parse(this.responseText);
      getElements(responseTrend);
    }
  }
  requestTrend.open("GET", url, true);
  requestTrend.send();
  function getElements(responseTrend) {
    //$(".showGifs").html(`<img src='${response.data[1].images.downsized.url}'>`);
    responseTrend.data.forEach(function(data) {
      $(".trending").append(`<img src='${data.images.downsized.url}'>`);
    })
  }

  $("#searchSubmitBtn").click(function() {
    $(".showGifs").text("");
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
      //$(".showGifs").html(`<img src='${response.data[1].images.downsized.url}'>`);
      response.data.forEach(function(data) {
        $(".showGifs").append(`<img src='${data.images.downsized.url}'>`);
      })
      //$(".showGifs").append("<img src='" + response.data[1].url + "'>");
    }
  });

  $("#genRandomBtn").click(function() {
    $(".showGifs").text("");
    $("#searchTerm").val("");
    let requestRand = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`;
    requestRand.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const responseRand = JSON.parse(this.responseText);
        getElements(responseRand);
      }
    }
    requestRand.open("GET", url, true);
    requestRand.send();
    function getElements(responseRand) {
        $(".showGifs").append(`<img src='${responseRand.data.images.downsized.url}'>`);
    }
  });

  // $(':file').on('change', function () {
  //   var file = this.files[0];
  //   if (file.size > 1024) {
  //     alert('max upload size is 1k');
  //   }
  // });

/* let requestPost = new XMLHttpRequest();
  const url = `https://upload.giphy.com/v1/gifs?api_key=${process.env.API_KEY}`;



  requestPost.open("POST", url, true);
    requestPost.send(); */
});


