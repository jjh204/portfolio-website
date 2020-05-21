(function () {
  var form = document.querySelector("#contact-form");
  var formConfirm = document.querySelector("#form-sent");
  var nameInput = document.querySelector("#contact-name");
  var emailInput = document.querySelector("#contact-email");
  var messageInput = document.querySelector("#contact-message");

  function showErrorMessage(input, message) {
    var container = input.parentElement;

    var error = container.querySelector(".error-message");
    if (error) {
      container.removeChild(error);
    }

    if (message) {
      var error = document.createElement("div");
      error.classList.add("error-message");
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateName() {
    var value = nameInput.value;

    if (!value) {
      showErrorMessage(nameInput, "A name is required.");
      return false;
    }

    if (value.length < 1) {
      showErrorMessage(nameInput, "A name is required.");
      return false;
    }

    showErrorMessage(nameInput, null);
    return true;
  }

  function validateEmail() {
    var value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, "An e-mail address is required.");
      return false;
    }

    if (value.indexOf("@") === -1) {
      showErrorMessage(emailInput, "You must enter a valid e-mail address.");
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;
  }

  function validateMessage() {
    var value = messageInput.value;

    if (!value) {
      showErrorMessage(messageInput, "A message is required.");
      return false;
    }

    if (value.length < 1) {
      showErrorMessage(messageInput, "A message is required.");
      return false;
    }

    showErrorMessage(messageInput, null);
    return true;
  }

  function validateForm() {
    var isValidName = validateName();
    var isValidEmail = validateEmail();
    var isValidMessage = validateMessage();
    return isValidName && isValidEmail && isValidMessage;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Your message has been sent.");
      form.classList.add("is-hidden");
      formConfirm.classList.remove("is-hidden");
    }
  });

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);
})();
