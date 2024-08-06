const $exportButton = document.querySelector(".add-note-btn");
const $noteInput = document.querySelector(".note-input");
const $noteListContainer = document.querySelector(".notes-container");

/* html element에 해당하는 변수에는 $ 접두어나 elem 접미어를 넣는 관행이 있다. */
/* 변수명 바꿀때는 F2 눌러서 한 번에 바꾸는게 쓰기 좋다. */

$exportButton.onclick = addNote; // addNote()로 하면, 반환한 값을 저장하게 된다.

function addNote() {
  const noteContent = $noteInput.value;
  if (noteContent.trim() === "") {
    alert("아무 내용이 없습니다.");
    return;
  }

  const $noteContainer = document.createElement("div"); 
  $noteContainer.classList.add("note");

  const $note = document.createElement("pre");
  $note.textContent = noteContent;
  $noteContainer.append($note);

  const $deleteButton = document.createElement("button");
  $deleteButton.textContent = "❌";
  $deleteButton.onclick = deleteNote;
  $noteContainer.append($deleteButton);

  $noteListContainer.append($noteContainer);
  $noteInput.value = "";
}

function deleteNote(event) {
  event.target.parentElement.remove();
}
