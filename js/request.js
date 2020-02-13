let API_LINK = "https://jobs.github.com/positions.json?lat=37.3229978&long=-122.0321823";

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
  xhr.open('GET', API_LINK);
  xhr.send();
}
