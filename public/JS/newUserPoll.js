var optionName = document.querySelector('#optionName');
var optionCount = document.querySelector('#optionCount');
var optionButton = document.querySelector('#optionButton');

var askUserForm = document.querySelector('.askUSerForm');
var doneUserForm = document.querySelector('.doneUserForm');

optionButton.addEventListener('click', function(){
  askUserForm.style.display = 'none';
  alert(optionName.value);
  alert(optionCount.value);
});
