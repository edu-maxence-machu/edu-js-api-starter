// https://github.com/ryanmcdermott/clean-code-javascript

let body = document.getElementById('content');

window.addEventListener('load', function () {
  console.log('Page fully loaded');
  console.log('We can run javascript now');

  getInitialData(renderInitialData);
});

function renderInitialData(data) {

  /* Loop on the elements provided with the API*/
  for(let i = 0; i < data.results.length; i++){
    let el = createHTMLElement(data.results[i]);
    body.append(el);
  }
}

function createHTMLElement(element) {
  let divParent = document.createElement('div');
  let hTitle = document.createElement('h1');

  let txtTitle = document.createTextNode(element.name);

  hTitle.appendChild(txtTitle);
  divParent.addEventListener('click', () => onClickCity(element.name))
  divParent.appendChild(hTitle);
  divParent.classList.add('city-item');
  return divParent;
}

async function onClickCity(cityName){
  toggleModal('modal');

  let cityData = await getCityData(cityName);

  renderModalData({name: cityName, data: cityData.results})
}

function renderModalData({name, data}){
  let title = document.getElementById('modal-title');
  console.log("data region", data);
  title.innerText = name;


}

function openMenu(){
  toggleMenu('menu')
}

function toggleModal(modalId){
  let modal = document.getElementById(modalId);
  modal.classList.toggle('modal-opened')
}
function toggleMenu(menuId){
  let modal = document.getElementById(menuId);
  modal.classList.toggle('menu-opened');

  let menuIcon = document.getElementById('menu-icon');
  menuIcon.classList.toggle('opened')
}

function closeModal(){

}
