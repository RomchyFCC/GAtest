var button = document.getElementById('clickButton');

button.addEventListener('click', function() {
  gtag('event', 'Homepage button click', {
    'event_category': 'User engagement',
    'event_label': 'Klikni me!'
  });
});