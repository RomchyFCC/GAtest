var sortButton = document.getElementById('sort');
var sortInput = document.getElementById('string');
var sortResult = document.getElementById('result');
var sortRegex = new RegExp(/^[a-zA-Z0-9]+$/);
var error = false;
sortButton.addEventListener('click', function (e) {
  error = false;

  if (!sortRegex.test(sortInput.value)) {
    error = true;
  }

  if (!error) {
    // get input value, convert it to array, use sort method and convert the sorted array back to string
    resArr = sortInput.value.split('');
    resArr = resArr.sort();
    var result = resArr.join('');
    sortResult.innerHTML = result;
    gtag('event', 'String sorted', {
      'event_category': 'User engagement',
      'event_label': result
    });
  } else {
    sortResult.innerHTML = 'Sortirate lahko samo številke in črke!';
  }
});