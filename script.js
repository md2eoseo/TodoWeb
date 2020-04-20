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
  textarea.placeholder = "Write contents for this card...";
  saveBtn.type = "submit";
  saveBtn.value = "Save";
  cancelBtn.value = "X";
  form.appendChild(textarea);
  form.appendChild(saveBtn);
  form.appendChild(cancelBtn);
  console.log(e.target.dataset.position);
}
