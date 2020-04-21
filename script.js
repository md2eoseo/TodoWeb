"use strict";
const DB_URL = "https://todoweb-a2c8.restdb.io/rest/card";
const API_KEY = "5e9e0988436377171a0c266d";

window.addEventListener("load", () => {
  document.querySelectorAll(".addBtn").forEach((ele) => {
    ele.addEventListener("click", showAddForm);
  });
  get();
});

function showAddForm(e) {
  const form = document.createElement("form");
  const textarea = document.createElement("textarea");
  const textarea_p = document.createElement("p");
  const saveBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const position = e.target.dataset.position;
  form.id = "addForm";
  textarea.placeholder = "Write contents for this card...";
  textarea.name = "desc";
  textarea_p.classList.add("hidden");
  textarea_p.textContent = "It's empty. Fill something.";
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
  cancelBtn.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    document
      .querySelector(`.addBtn[data-position="${position}"]`)
      .classList.remove("hidden");
  });
  form.appendChild(textarea);
  form.appendChild(textarea_p);
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
  console.log(elements);

  const textarea = form.querySelector("textarea");
  const textarea_p = form.querySelector("p");
  textarea.classList.remove("invalid");
  if (!textarea.checkValidity()) {
    textarea.classList.add("invalid");
  }

  if (textarea.value != "") {
    textarea.classList.remove("invalid");
    textarea_p.classList.add("hidden");
    validForm = true;
  } else {
    textarea.classList.add("invalid");
    textarea_p.classList.remove("hidden");
  }

  if (form.checkValidity() && validForm) {
    if (form == document.querySelector("#addForm")) {
      post({ position: position, desc: textarea.value });
      console.log("submitted " + textarea.value);
      form.remove();
      document
        .querySelector(`.addBtn[data-position="${position}"]`)
        .classList.remove("hidden");
    } else {
      put(
        { position: position, desc: textarea.value },
        form.parentNode.dataset.id
      );
      console.log("edited " + elements.num.value);
      form.parentNode.remove();
    }
    return true;
  } else {
    if (!textarea.checkValidity()) {
      ele.classList.add("invalid");
    }
    console.log("validation error!!");
  }
}

function put(data, id) {
  if (data.desc == "") {
    deleteIt(id);
  } else {
    const postData = JSON.stringify(data);
    fetch(DB_URL + "/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": API_KEY,
        "cache-control": "no-cache",
      },
      body: postData,
    })
      .then((d) => d.json())
      .then((data) => console.log(`edited ${data}`));
    document
      .querySelector(`div[data-id="${id}"] .editForm`)
      .classList.add("hidden");
    document
      .querySelector(`div[data-id="${id}"] .card`)
      .classList.remove("hidden");
    document.querySelector(`div[data-id="${id}"] .card .desc`).textContent =
      data.desc;
  }
}

function deleteIt(id) {
  fetch(DB_URL + "/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(`deleted ${data}`));
  document.querySelector(`div[data-id="${id}"]`).remove();
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
      showCard(data);
      console.log(`inserted ${data} in database`);
    });
}

function get() {
  document.querySelectorAll(".cards").forEach((ele) => (ele.innerHTML = ""));
  fetch(DB_URL, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then(showCards);
}

function showCards(cards) {
  cards.forEach(showCard);
}

function showCard(card) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector(`#${card.position} div`);

  copy.querySelector("div").dataset.id = card._id;
  copy.querySelector("div").dataset.position = card.position;
  copy.querySelector("span").textContent = card.desc;

  copy.querySelector(".deleteBtn").addEventListener("click", () => {
    deleteIt(card._id);
  });
  copy.querySelector(".editBtn").addEventListener("click", (e) => {
    put(
      {
        position: card.position,
        desc: e.target.parentNode.querySelector(".editText").value,
      },
      card._id
    );
  });

  copy
    .querySelector(".card")
    .addEventListener("mouseenter", (e) =>
      e.target.querySelector(".deleteBtn").classList.remove("hidden")
    );
  copy
    .querySelector(".card")
    .addEventListener("mouseleave", (e) =>
      e.target.querySelector(".deleteBtn").classList.add("hidden")
    );
  copy.querySelector(".card").addEventListener("click", (e) => {
    e.target.parentNode.querySelector("input").value = e.target.querySelector(
      ".desc"
    ).textContent;
    e.target.classList.add("hidden");
    e.target.parentNode.querySelector(".editForm").classList.remove("hidden");
  });

  parent.appendChild(copy);
}
