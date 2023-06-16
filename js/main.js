const coll = document.querySelectorAll('.collapsible');
const $menu = document.querySelector('.menu');
const $myLinks = document.querySelector('.my-links');
const $set = document.querySelector('.expansion-sets');
const $viewHome = document.querySelector('.view-home');
const $viewSet = document.querySelector('.view-set');
const $tab = document.querySelectorAll('.tab');
const $deckColumn = document.querySelector('.deck-column');
const $header = document.querySelector('header');
const $setLogo = document.querySelector('.set-logo');
const $cardWrapper = document.querySelector('.card-wrapper');

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.display === 'flex') {
      content.style.display = 'none';
    } else {
      content.style.display = 'flex';
    }
  });
}

$menu.addEventListener('click', function (event) {
  if (event.target.matches('.hamburger-menu')) {
    if ($myLinks.style.display === 'block') {
      $myLinks.style.display = 'none';
    } else {
      $myLinks.style.display = 'block';
    }
  }
});

$set.addEventListener('click', function (event) {
  if (event.target.matches('.set')) {
    viewSwap('view-set');
    renderPokemonCards(event.target.getAttribute('data-view-id'));
    $setLogo.setAttribute('src', event.target.src);
  }
});

function viewSwap(view) {
  if (view === 'view-home') {
    $viewHome.classList.remove('hidden');
    $viewSet.classList.add('hidden');
    $deckColumn.classList.remove('hidden');
  } else if (view === 'view-set') {
    $viewSet.classList.remove('hidden');
    $viewHome.classList.add('hidden');
    $deckColumn.classList.add('hidden');
    $tab[0].style.backgroundColor = '#edefff';
  }
}

function renderPokemonCards(setId) {
  const pokemonCards = new XMLHttpRequest();
  pokemonCards.open('GET', 'https://api.pokemontcg.io/v2/cards?orderBy=number&q=set.id:' + setId);
  pokemonCards.responseType = 'json';
  pokemonCards.addEventListener('load', function () {

    for (let i = 0; i < pokemonCards.response.data.length; i++) {
      data.cardCollection.push(pokemonCards.response.data[i]);
      const $card = document.createElement('img');
      $card.className = 'card';
      $card.setAttribute('data-card-id', data.cardCollection[i].id);
      $card.setAttribute('src', data.cardCollection[i].images.large);
      $cardWrapper.appendChild($card);
    }
  });
  pokemonCards.send();
}

const $displayCollectionCard = document.querySelector('.display-collection-card');

$cardWrapper.addEventListener('click', function (event) {
  if (event.target.matches('.card')) {
    $displayCollectionCard.setAttribute('src', event.target.src);
  }
});

const $cardSetList = document.querySelectorAll('.set-list');

$header.addEventListener('click', function (event) {
  if (event.target.matches('.home-page')) {
    viewSwap('view-home');
    $myLinks.style.display = 'none';
    clearCardCollection();
    data.cardCollection = [];
    for (let i = 0; i < $cardSetList.length; i++) {
      $cardSetList[i].style.display = 'none';
    }
    $displayCollectionCard.setAttribute('src', 'images/pokemon-card-backside.png');
  }
});

function clearCardCollection() {
  $cardWrapper.innerHTML = '';
}
