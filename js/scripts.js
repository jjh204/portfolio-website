(function () {
  const form = document.getElementById("contact-form");
  const submit = document.getElementById('submit')
  const url = "https://xiaklqq2sf.execute-api.us-east-1.amazonaws.com/dev/email/send";
  const formConfirm = document.querySelector("#form-sent");
  const nameInput = document.querySelector("#contact-name");
  const emailInput = document.querySelector("#contact-email");
  const messageInput = document.querySelector("#contact-message");

  function post(url, body, callback) {
    const req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function () {
      if (req.status < 400) {
        callback(null, JSON.parse(req.responseText));
      } else {
        callback(new Error("Request failed: " + req.statusText));
      }
    });
    req.send(JSON.stringify(body));
  }

  function showErrorMessage(input, message) {
    const container = input.parentElement;
    const error = container.querySelector(".error-message");
    if (error) {
      container.removeChild(error);
    }
    if (message) {
      const error = document.createElement("div");
      error.classList.add("error-message");
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateName() {
    const value = nameInput.value;
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
    const value = emailInput.value;
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
    const value = messageInput.value;
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
    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidMessage = validateMessage();
    return isValidName && isValidEmail && isValidMessage;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      submit.disabled = true

      const payload = {
        name: form.name.value,
        email: form.email.value,
        content: form.content.value
      }
      post(url, payload, function (err, res) {
        if (err) { return error(err) }
        success()
      })
    }
  });

  function success() {
    submit.disabled = false
    alert("Your message has been sent.");
    form.classList.add("is-hidden");
    formConfirm.classList.remove("is-hidden");
    submit.blur()
    form.name.focus()
    form.name.value = ''
    form.email.value = ''
    form.content.value = ''
  }

  function error(err) {
    alert("There was an error with sending your message, hold up until I fix it. Thanks for waiting.");
    submit.disabled = false
    console.log(err)
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);
})();
