// https://github.com/ryanmcdermott/clean-code-javascript

let body = document.getElementById('content');

window.addEventListener('load', function () {
  console.log('Page fully loaded');
  console.log('We can run javascript now');

  getInitialData(renderInitialData);
});

function renderInitialData(data) {
  console.log(data);

  /* Loop on the elements provided with the API*/
  for(let i = 0; i < data.length; i++){
    let el = createHTMLElement(data[i]);
    body.append(el);
  }
}

function createHTMLElement(element) {
  let divParent = document.createElement('div');
  let hTitle = document.createElement('h1');

  let txtTitle = document.createTextNode(element.title);

  hTitle.appendChild(txtTitle);
  divParent.addEventListener('click', () => onClickJob(element.id))
  divParent.appendChild(hTitle);
  divParent.classList.add('job-item');
  return divParent;
}

function onClickJob(jobId){
  // TODO:
  // Ouvrir une modal
  // Ajouter les éléments du job à la modal
  alert(jobId);
}


function openMenu(){
  // TODO:
  // Ajouter une classe "active au menu"
}
