const coll = document.querySelectorAll('.collapsible');
const $menu = document.querySelector('.menu');
const $myLinks = document.querySelector('.my-links');
const $set = document.querySelector('.expansion-sets');
const $viewHome = document.querySelector('.view-home');
const $viewSet = document.querySelector('.view-set');
const $deckColumn = document.querySelector('.deck-column');
const $header = document.querySelector('header');
const $setLogo = document.querySelector('.set-logo');
const $cardContainer = document.querySelector('.card-container');
const $setList = document.querySelectorAll('.set-list');
const $loadingScreenWrapper = document.querySelector('.loading-screen-wrapper');
const $addminus = document.querySelector('.add-minus');
const $viewMyDeck = document.querySelector('.view-my-deck');
const $myDeckNav = document.querySelector('.my-deck-page');
const $deckCardCollection = document.querySelector('.deck-card-collection');
const $deckWrapper = document.querySelector('.deck-wrapper');
const $displayDeckCard = document.querySelector('.display-deck-card');
const $displayCollectionCard = document.querySelector('.display-collection-card');
const $noCards = document.querySelectorAll('.no-cards');
const $deckImageCover = document.querySelector('.deck-image-cover');

const cardSets = new XMLHttpRequest();
cardSets.open('GET', 'https://api.pokemontcg.io/v2/sets');
cardSets.responseType = 'json';
cardSets.addEventListener('load', function () {
  for (let i = 0; i < cardSets.response.data.length; i++) {
    if (cardSets.response.data[i].series === 'Scarlet & Violet') {
      const $setWrapper = createSet(i);
      $setList[0].appendChild($setWrapper);
    } else if (cardSets.response.data[i].series === 'Sword & Shield') {
      const $setWrapper = createSet(i);
      $setList[1].appendChild($setWrapper);
    } else if (cardSets.response.data[i].series === 'Sun & Moon') {
      const $setWrapper = createSet(i);
      $setList[2].appendChild($setWrapper);
    }
  }
});
cardSets.send();

function renderCover() {
  const deckCardIds = Object.keys(data.myDeck);
  if (Object.keys(data.myDeck).length !== 0) {
    $deckImageCover.setAttribute('src', data.myDeck[deckCardIds[0]].img);
  } else {
    $deckImageCover.setAttribute('src', '/images/pokemon-card-backside.png');
  }
  toggleNoCards();
}
renderCover();

function createSet(index) {
  const $setWrapper = document.createElement('div');
  const $img = document.createElement('img');
  const $setName = document.createElement('div');
  $setWrapper.className = 'set-wrapper';
  $img.setAttribute('src', cardSets.response.data[index].images.logo);
  $img.setAttribute('class', 'set');
  $img.setAttribute('data-view-id', cardSets.response.data[index].id);
  $setName.textContent = cardSets.response.data[index].name;
  $setWrapper.appendChild($img);
  $setWrapper.appendChild($setName);
  return $setWrapper;
}

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const $content = this.nextElementSibling;
    if ($content.style.display === 'flex') {
      $content.style.display = 'none';
    } else {
      $content.style.display = 'flex';
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

$deckCardCollection.addEventListener('click', () => {
  if (event.target.matches('.desktop-deck-card')) {
    $displayDeckCard.setAttribute('src', event.target.src);
    $displayDeckCard.setAttribute('alt', 'displayed card');
    $displayDeckCard.setAttribute('data-card-id', event.target.getAttribute('data-card-id'));
    toggleAddMinusButtons();
  }
});

$set.addEventListener('click', function (event) {
  if (event.target.matches('.set')) {
    viewSwap('view-set');
    renderPokemonCards(event.target.getAttribute('data-view-id'));
    $setLogo.setAttribute('src', event.target.src);
    clearDeck($deckWrapper);
    renderDeckCard($deckWrapper);
  }
});

function viewSwap(view) {
  if (view === 'view-home') {
    $viewHome.classList.remove('hidden');
    $viewSet.classList.add('hidden');
    $viewMyDeck.classList.add('hidden');
    $deckColumn.classList.remove('hidden');
  } else if (view === 'view-set') {
    $viewSet.classList.remove('hidden');
    $viewHome.classList.add('hidden');
    $viewMyDeck.classList.add('hidden');
    $deckColumn.classList.add('hidden');
  } else if (view === 'view-my-deck') {
    $viewSet.classList.add('hidden');
    $viewHome.classList.add('hidden');
    $viewMyDeck.classList.remove('hidden');
  }
}

$myDeckNav.addEventListener('click', () => {
  viewSwap('view-my-deck');
  clearDeck($deckCardCollection);
  renderDeckCard($deckCardCollection);
  $displayDeckCard.setAttribute('src', 'images/pokemon-card-backside.png');
});

function renderPokemonCards(setId) {
  const pokemonCards = new XMLHttpRequest();
  pokemonCards.open('GET', 'https://api.pokemontcg.io/v2/cards?orderBy=number&q=set.id:' + setId);
  pokemonCards.responseType = 'json';
  pokemonCards.addEventListener('loadstart', function () {
    $loadingScreenWrapper.style.display = 'flex';
  });
  pokemonCards.addEventListener('load', function () {
    $loadingScreenWrapper.style.display = 'none';
    $displayCollectionCard.removeAttribute('data-card-id');
    for (let i = 0; i < pokemonCards.response.data.length; i++) {
      data.cardCollection.push(pokemonCards.response.data[i]);
      const $cardWrapper = document.createElement('div');
      const $card = document.createElement('img');
      const $counter = document.createElement('div');
      $cardWrapper.className = 'card-wrapper';
      $card.className = 'card';
      $counter.className = 'counter';
      $card.setAttribute('data-card-id', data.cardCollection[i].id);
      $card.setAttribute('src', data.cardCollection[i].images.large);
      $cardContainer.appendChild($cardWrapper);
      $cardWrapper.appendChild($card);
      $cardWrapper.appendChild($counter);
    }
  });
  pokemonCards.send();
}

$cardContainer.addEventListener('click', function (event) {
  if (event.target.matches('.card')) {
    $displayCollectionCard.setAttribute('src', event.target.src);
    $displayCollectionCard.setAttribute('alt', 'displayed card');
    $displayCollectionCard.setAttribute('data-card-id', event.target.getAttribute('data-card-id'));
    toggleAddMinusButtons();
  }
});

$deckWrapper.addEventListener('click', event => {
  if (event.target.matches('.deck-card')) {
    $displayCollectionCard.setAttribute('src', event.target.src);
    $displayCollectionCard.setAttribute('data-card-id', event.target.getAttribute('data-card-id'));
  }
  toggleAddMinusButtons();
});

$header.addEventListener('click', function (event) {
  if (event.target.matches('.home-page')) {
    viewSwap('view-home');
    $myLinks.style.display = 'none';
    clearCardCollection();
    for (let i = 0; i < $setList.length; i++) {
      $setList[i].style.display = 'none';
    }
    $displayCollectionCard.setAttribute('src', 'images/pokemon-card-backside.png');
    toggleAddMinusButtons();
  } else if (event.target.matches('.my-deck-page')) {
    $myLinks.style.display = 'none';
    viewSwap('view-my-deck');
    clearDeck($deckCardCollection);
    renderDeckCard($deckCardCollection);
  }
});

function clearCardCollection() {
  while ($cardContainer.firstChild) {
    $cardContainer.removeChild($cardContainer.firstChild);
  }
  data.cardCollection = [];
}

$addminus.addEventListener('click', function (event) {
  const cardId = $displayCollectionCard.getAttribute('data-card-id');
  const cardImg = $displayCollectionCard.getAttribute('src');
  if (event.target.matches('.add')) {
    const obj = {};
    if (Object.hasOwn(data.myDeck, cardId)) {
      data.myDeck[cardId].counter++;
    } else {
      obj.counter = 1;
      obj.img = cardImg;
      data.myDeck[cardId] = obj;
    }
  } else if (event.target.matches('.minus')) {
    if (Object.hasOwn(data.myDeck, cardId)) {
      data.myDeck[cardId].counter--;
      if (data.myDeck[cardId].counter === 0) {
        delete data.myDeck[cardId];
      }
    }
  }
  clearDeck($deckWrapper);
  renderDeckCard($deckWrapper);
  renderCover();
});

function toggleAddMinusButtons() {
  if ($displayCollectionCard.getAttribute('src') === 'images/pokemon-card-backside.png') {
    $addminus.classList.add('hidden');
  } else {
    $addminus.classList.remove('hidden');
  }
}

function renderDeckCard(view) {
  for (const key in data.myDeck) {
    for (let i = 0; i < data.myDeck[key].counter; i++) {
      const $card = document.createElement('img');
      $card.setAttribute('src', data.myDeck[key].img);
      $card.setAttribute('data-card-id', key);
      if (view === $deckWrapper) {
        $card.classList.add('deck-card');
      } else if (view === $deckCardCollection) {
        $card.classList.add('desktop-deck-card');
      }
      view.appendChild($card);
    }
  }
  toggleNoCards();
}

function clearDeck(dom) {
  while (dom.firstChild) {
    dom.removeChild(dom.firstChild);
  }
}

function toggleNoCards() {
  if (Object.keys(data.myDeck).length === 0) {
    for (let i = 0; i < $noCards.length; i++) {
      $noCards[i].style.display = 'flex';
      $deckImageCover.style.display = 'none';
    }
  } else {
    for (let i = 0; i < $noCards.length; i++) {
      $noCards[i].style.display = 'none';
      $deckImageCover.style.display = 'flex';
    }
  }
}
