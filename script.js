"use strict";
const DB_URL = "https://todoweb-a2c8.restdb.io/rest/card";
const API_KEY = "5e9e0988436377171a0c266d";

window.addEventListener("load", () => {
  document.querySelectorAll(".addBtn").forEach((ele) => {
    ele.addEventListener("click", showAddForm);
  });
});

function showAddForm(e) {
  const form = document.createElement("form");
  const textarea = document.createElement("textarea");
  const saveBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const position = e.target.dataset.position;
  form.id = "addForm";
  textarea.placeholder = "Write contents for this card...";
  textarea.name = "desc";
  saveBtn.dataset.action = "inputTextarea";
  saveBtn.type = "submit";
  saveBtn.textContent = "Save";
  saveBtn.dataset.action = "save";
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkValidation(form, position);
  });
  cancelBtn.textContent = "X";
  cancelBtn.dataset.action = "cancel";
  form.appendChild(textarea);
  form.appendChild(saveBtn);
  form.appendChild(cancelBtn);
  document.querySelector(`section#${position}`).appendChild(form);
  document
    .querySelector(`.addBtn[data-position="${position}"]`)
    .classList.add("hidden");
  form.elements.desc.focus();
}

function checkValidation(form, position) {
  let validForm = false;
  const elements = form.elements;

  const textarea = form.querySelector("textarea");
  textarea.classList.remove("invalid");
  console.log(textarea.value);
  if (!textarea.checkValidity()) {
    ele.classList.add("invalid");
  }

  if (textarea.value != "") {
    textarea.classList.remove("invalid");
    // textarea_p.classList.add("hidden");
    validForm = true;
  } else {
    route.classList.add("invalid");
    // textarea_p.classList.remove("hidden");
  }

  if (form.checkValidity() && validForm) {
    if (form == document.querySelector("#addForm")) {
      post({ position: position, desc: textarea.value });
      console.log("submitted " + elements.desc.value);
      form.remove();
      document
        .querySelector(`.addBtn[data-position="${position}"]`)
        .classList.remove("hidden");
    } else {
    }
    return true;
  } else {
    if (!textarea.checkValidity()) {
      ele.classList.add("invalid");
    }
    console.log("validation error!!");
  }
}

function post(data) {
  const postData = JSON.stringify(data);
  fetch(DB_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`inserted ${data} in database`);
    });
}