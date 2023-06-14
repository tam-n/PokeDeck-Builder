/* exported data */

const data = {
  editing: null,
  view: 'home',
  myDeck: [],
  cardSet: [],
  entryId: 0
};

const $setList = document.querySelectorAll('.set-list');

const cardSets = new XMLHttpRequest();
cardSets.open('GET', 'https://api.pokemontcg.io/v2/sets');
cardSets.responseType = 'json';
cardSets.addEventListener('load', function () {
  for (let i = 0; i < cardSets.response.data.length; i++) {
    if (cardSets.response.data[i].series === 'Scarlet & Violet') {
      const $setWrapper = document.createElement('div');
      const $img = document.createElement('img');
      const $setName = document.createElement('div');
      $setWrapper.className = 'set-wrapper';
      $img.setAttribute('src', cardSets.response.data[i].images.logo);
      $img.setAttribute('class', 'set');
      $img.setAttribute('data-view-id', cardSets.response.data[i].id);
      $setName.textContent = cardSets.response.data[i].name;
      $setWrapper.appendChild($img);
      $setWrapper.appendChild($setName);
      $setList[0].appendChild($setWrapper);
    }
    if (cardSets.response.data[i].series === 'Sword & Shield') {
      const $setWrapper = document.createElement('div');
      const $img = document.createElement('img');
      const $setName = document.createElement('div');
      $setWrapper.className = 'set-wrapper';
      $img.setAttribute('src', cardSets.response.data[i].images.logo);
      $img.setAttribute('class', 'set');
      $img.setAttribute('data-view-id', cardSets.response.data[i].id);
      $setName.textContent = cardSets.response.data[i].name;
      $setWrapper.appendChild($img);
      $setWrapper.appendChild($setName);
      $setList[1].appendChild($setWrapper);
    }
    if (cardSets.response.data[i].series === 'Sun & Moon') {
      const $setWrapper = document.createElement('div');
      const $img = document.createElement('img');
      const $setName = document.createElement('div');
      $setWrapper.className = 'set-wrapper';
      $img.setAttribute('src', cardSets.response.data[i].images.logo);
      $img.setAttribute('class', 'set');
      $img.setAttribute('data-view-id', cardSets.response.data[i].id);
      $setName.textContent = cardSets.response.data[i].name;
      $setWrapper.appendChild($img);
      $setWrapper.appendChild($setName);
      $setList[2].appendChild($setWrapper);
    }
  }
});
cardSets.send();
