// ДОП ФУНКЦИОНАЛ

const linksHeading = document.querySelector(".links-heading");
const linksSearch = document.querySelector(".links-search");
const searchIcon = document.querySelector(".search-icon");
const linksList = document.querySelector(".links-list");
const currentLinksContainer = document.querySelector(".current-links-container");
const linkItemContainer = document.querySelector(".link-item-container")
const editIconContainer = document.querySelector(".link-edit-container");
const closelinksIcon = document.querySelector(".close-links-icon");
let index;

// Контейнер редактирования

const linksEditContainer = document.querySelector(".links-edit-container");
const editInputName = document.querySelector(".edit-name");
const editInputLink = document.querySelector(".edit-link");
const editBtnSave = document.querySelector(".edit-save");
const editBtnDelete = document.querySelector(".edit-delete")
const backIconEdit = document.querySelector(".back-icon-edit");

// Контейнер создания ссылки

const linksNewContainer = document.querySelector(".links-new-container");
const newLinkBtn = document.querySelector(".new-link");
const backIconNew = document.querySelector(".back-icon-new");
const createInputName = document.querySelector(".create-new-name");
const createInputLink = document.querySelector(".create-new-link");
const createLinkBtn = document.querySelector(".new-save");

linksHeading.addEventListener("click", () => {
  currentLinksContainer.classList.add("links-container-active");
})

// Открывать поисковик с запросом

linksSearch.addEventListener("keydown", (e) => {
  if (e.keyCode == 13)  window.open(`https://yandex.ru/search/?text=${linksSearch.value}`)
})

searchIcon.addEventListener("click", () => {
  window.open(`https://yandex.ru/search/?text=${linksSearch.value}`);
})

closelinksIcon.addEventListener("click", () => {
  currentLinksContainer.classList.remove("links-container-active");
})

// Иконки назад

backIconEdit.addEventListener("click", () => {
  linksEditContainer.classList.remove("edit-container-active")
})

backIconNew.addEventListener("click", () => {
  linksNewContainer.classList.remove("edit-container-active")
})

// События с контейнером редактирования ссылки

linksList.addEventListener("click", (e) => {
  let target = e.target;
  index = [].indexOf.call(editIconContainer.children, target);
  if(target.classList.contains("link-edit-icon")) {
    linksEditContainer.classList.add("edit-container-active");
    editInputName.value = linkItemContainer.children[index].textContent;
    editInputLink.value = linkItemContainer.children[index].href;
  }
})

editBtnSave.addEventListener("click", () => {
  linkItemContainer.children[index].textContent = editInputName.value;
  linkItemContainer.children[index].href = editInputLink.value;
  linksEditContainer.classList.remove("edit-container-active")
})

editBtnDelete.addEventListener("click", () => {
  linkItemContainer.children[index].remove();
  editIconContainer.children[index].remove();
  linksEditContainer.classList.remove("edit-container-active");
})

// События с контейнером создания ссылки

newLinkBtn.addEventListener("click", () => {
  linksNewContainer.classList.add("edit-container-active");
  createInputName.value = "";
  createInputLink.value = "";
})

const addNewLink = () => {
  const a = document.createElement('a');
  a.textContent = createInputName.value;
  a.href = createInputLink.value;
  a.classList.add("link-name");
  linkItemContainer.append(a);
}

const createNewIcon = () => {
  const div = document.createElement('div');
  div.classList.add("link-edit-icon");
  editIconContainer.append(div);
}

createLinkBtn.addEventListener("click", () => {
  addNewLink();
  createNewIcon();
  linksNewContainer.classList.remove("edit-container-active");
})


// Сохранить текущие ссылки

window.addEventListener("beforeunload", () => {
  let arr = [];
  const linkName = document.querySelectorAll(".link-name");
  linkName.forEach(link => {
    arr.push({
      textContent: link.textContent, href: link.href})
    })
  localStorage.setItem(`linksArr`, JSON.stringify(arr));
})

// Загрузить ссылки из Local

const renderLink = () => {
  const linksArr = JSON.parse(localStorage.getItem('linksArr'));
  linksArr.forEach(el => {
    const a = document.createElement('a');
    a.textContent = el.textContent;
    a.href = el.textContent;
    a.classList.add("link-name");
    linkItemContainer.append(a);

    const div = document.createElement('div');
    div.classList.add("link-edit-icon");
    editIconContainer.append(div);
  })
}

if (localStorage.getItem("linksArr")) {
  renderLink();
}