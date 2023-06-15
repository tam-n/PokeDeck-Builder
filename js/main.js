const coll = document.querySelectorAll('.collapsible');

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

const $menu = document.querySelector('.menu');
const $myLinks = document.querySelector('.my-links');

$menu.addEventListener('click', function (event) {
  if (event.target.matches('.hamburger-menu')) {
    if ($myLinks.style.display === 'block') {
      $myLinks.style.display = 'none';
    } else {
      $myLinks.style.display = 'block';
    }
  }
});
