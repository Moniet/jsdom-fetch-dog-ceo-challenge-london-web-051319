const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breeds = [];

function getImgs() {
  fetch(imgUrl)
    .then(dogs => dogs.json())
    .then(dogs => loadDogImgs(dogs));
}

function loadDogImgs(obj) {
  const arr = obj['message'];

  arr.forEach(url => {
    const img = document.createElement('img');
    const container = document.querySelector('#dog-image-container');

    img.setAttribute('src', url);
    container.appendChild(img);

    addBreed(url);
  });
}

function addBreed(url) {
  const breed = url.split('/')[4];
  const container = document.querySelector('#dog-breeds');
  const li = document.createElement('li');

  li.textContent = breed;
  container.appendChild(li);

  breeds.push(breed);
}

function selectDog() {
  const container = document.querySelector('#dog-breeds');
  let letter = this.value;
  let selected = breeds.filter(breed => breed[0] === letter);

  container.textContent = '';
  selected.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;

    container.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', e => {

  const select = document.querySelector('#breed-dropdown');
  const ul = document.querySelector('#dog-breeds');

  select.addEventListener('change', selectDog);

  ul.addEventListener('click', e => {
    if (e.target && e.target.nodeName == 'LI') {
      e.target.style.color = 'pink';
    }
  });

  getImgs();

});
