/* exported data */

var data = {
  editing: null,
  view: 'home',
  myDeck: {},
  cardCollection: [],
  entryId: 0
};

window.addEventListener('beforeunload', function (event) {
  const currentData = JSON.stringify(data);
  localStorage.setItem('local-storage-tcg', currentData);
});

const previousData = localStorage.getItem('local-storage-tcg');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
