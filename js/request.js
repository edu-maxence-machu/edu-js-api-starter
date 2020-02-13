let API_LINK = "https://api.openaq.org/v1/cities?country=FR";

function getInitialData(callback) {
  // Set up our HTTP request
  let xhr = new XMLHttpRequest();


  xhr.onload = function () {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('success!', xhr);
      callback(JSON.parse(this.response));
    } else {
      console.log('The request failed!');
    }
    console.log('This always runs...');
  };

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
  xhr.open('GET', API_LINK, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send();
}
