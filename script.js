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
  textarea.placeholder = "Write contents for this card...";
  saveBtn.dataset.action = "inputTextarea";
  saveBtn.type = "submit";
  saveBtn.textContent = "Save";
  saveBtn.dataset.position = position;
  saveBtn.dataset.action = "save";
  cancelBtn.textContent = "X";
  cancelBtn.dataset.action = "cancel";
  form.appendChild(textarea);
  form.appendChild(saveBtn);
  form.appendChild(cancelBtn);
  document.querySelector(`section#${position}`).appendChild(form);
  document.querySelector(`.addBtn[data-position="${position}"]`).style.display =
    "none";
}
