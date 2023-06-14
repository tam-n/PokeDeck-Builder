/* exported data */

const data = {
  editing: null,
  view: 'home',
  myDeck: [],
  cardSet: [],
  entryId: 0
};

const $setWrapper = document.querySelectorAll('.set-wrapper');

const cardSets = new XMLHttpRequest();
cardSets.open('GET', 'https://api.pokemontcg.io/v2/sets');
cardSets.responseType = 'json';
cardSets.addEventListener('load', function () {
  for (let i = 0; i < cardSets.response.data.length; i++) {
    if (cardSets.response.data[i].series === 'Scarlet & Violet') {
      const $img = document.createElement('img');
      const $setName = document.createElement('div');
      $img.setAttribute('src', cardSets.response.data[i].images.logo);
      $img.setAttribute('class', 'set');
      $img.setAttribute('data-view-id', cardSets.response.data[i].id);
      $setName.textContent = cardSets.response.data[i].name;
      $setWrapper[0].appendChild($img);
      $setWrapper[0].appendChild($setName);
    }
    if (cardSets.response.data[i].series === 'Sword & Shield') {
      const $img = document.createElement('img');
      const $setName = document.createElement('div');
      $img.setAttribute('src', cardSets.response.data[i].images.logo);
      $img.setAttribute('class', 'set');
      $img.setAttribute('data-view-id', cardSets.response.data[i].id);
      $setName.textContent = cardSets.response.data[i].name;
      $setWrapper[1].appendChild($img);
      $setWrapper[1].appendChild($setName);
    }
    if (cardSets.response.data[i].series === 'Sun & Moon') {
      const $img = document.createElement('img');
      const $setName = document.createElement('div');
      $img.setAttribute('src', cardSets.response.data[i].images.logo);
      $img.setAttribute('class', 'set');
      $img.setAttribute('data-view-id', cardSets.response.data[i].id);
      $setName.textContent = cardSets.response.data[i].name;
      $setWrapper[2].appendChild($img);
      $setWrapper[2].appendChild($setName);
    }
  }
});
cardSets.send();
