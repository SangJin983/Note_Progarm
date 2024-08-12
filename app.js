document.addEventListener("DOMContentLoaded", () => {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach((noteContent) => {
    const $noteContainer = createNoteElem(noteContent);
    $noteListContainer.append($noteContainer);
  });
});

const $addNoteButton = document.querySelector(".add-note-btn");
const $noteInput = document.querySelector(".note-input");
const $noteListContainer = document.querySelector(".notes-container");

/* html element에 해당하는 변수에는 $ 접두어나 elem 접미어를 넣는 관행이 있다. */
/* 변수명 바꿀때는 F2 눌러서 한 번에 바꾸는게 쓰기 좋다. */

$addNoteButton.onclick = addNote; // addNote()로 하면, 반환한 값을 저장하게 된다.

function createNoteElem(noteContent) {
  const $noteContainer = document.createElement("div");
  $noteContainer.classList.add("note");

  const $note = document.createElement("pre");
  $note.textContent = noteContent;
  $noteContainer.append($note);

  const $editButton = document.createElement("button");
  $editButton.textContent = "✏️";
  $editButton.classList.add("edit-button");
  $editButton.addEventListener("click", () => enterEditMode($noteContainer));
  $noteContainer.append($editButton);

  const $deleteButton = document.createElement("button");
  $deleteButton.textContent = "❌";
  $deleteButton.onclick = deleteNote;
  $deleteButton.classList.add("delete-button");
  $noteContainer.append($deleteButton);

  return $noteContainer;
}

function addNote() {
  const noteContent = $noteInput.value;
  if (noteContent.trim() === "") {
    alert("아무 내용이 없습니다.");
    return;
  }

  const $noteContainer = createNoteElem(noteContent);

  $noteListContainer.append($noteContainer);
  $noteInput.value = "";

  saveNotesToLocalStorage();
}

function saveNotesToLocalStorage() {
  const notes = Array.from(document.querySelectorAll(".note pre")).map(
    ($note) => $note.textContent
  );
  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote(event) {
  event.target.parentElement.remove();
  saveNotesToLocalStorage();
}

function enterEditMode($noteContainer) {
  const $note = $noteContainer.querySelector("pre");
  const noteContent = $note.textContent;
  $noteContainer.innerHTML = "";

  const $textarea = document.createElement("textarea");
  $textarea.value = noteContent;
  $noteContainer.append($textarea);

  function handleSaveClick() {
    const newContent = $textarea.value;
    $noteContainer.remove();
    const $newNoteCotainer = createNoteElem(newContent);
    $noteListContainer.append($newNoteCotainer);
    saveNotesToLocalStorage();
  }

  const $saveButton = document.createElement("button");
  $saveButton.textContent = "💾";
  $saveButton.classList.add("save-button");
  $saveButton.addEventListener("click", handleSaveClick);
  $noteContainer.append($saveButton);
}
