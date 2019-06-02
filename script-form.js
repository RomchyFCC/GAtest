var submitForm = document.getElementById('form');
var dataEmail = document.getElementById('email');
var dataCheck = document.getElementById('checkbox');
var dataEmailError = document.getElementById('emailError');
var dataCheckError = document.getElementById('checkError');
var error = false;
var regexEmail = new RegExp(/^([\w-\.]*[a-zA-Z0-9_]+@([\w-]+\.)+[\w-]{2,4})?$/);
submitForm.addEventListener('submit', function (e) {
  error = false;
  dataEmailError.classList.add('hide');
  dataCheckError.classList.add('hide');

  if (dataEmail.value.length < 1) {
    error = true;
    dataEmailError.classList.remove('hide');
  } else {
    if (!regexEmail.test(dataEmail.value)) {
      error = true;
      dataEmailError.classList.remove('hide');
    }
  }

  if (!dataCheck.checked) {
    error = true;
    dataCheckError.classList.remove('hide');
  }

  if (error) {
    e.preventDefault();
  }
});