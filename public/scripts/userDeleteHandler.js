const mainElement = document.querySelector("main");
const dialog = document.getElementById("confirmDialog");
const closeButton = document.getElementById("cancelDialogButton");
const confirmButton = document.getElementById("confirmDialogButton");

const hideDialogHandler = () => {
  dialog.close();
};
const confirmDialogHandler = async () => {
  try {
    const response = await fetch(
      `/admin/user/${confirmButton.dataset.userid}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      location.reload();
    } else {
      alert("Chyba pri odosielani hodnotenia");
    }
  } catch (error) {
    alert("Chyba komunikácie so serverom");
  }
};

const showConfirmDialog = (event) => {
  const h4 = dialog.querySelector("h4");
  h4.textContent = `Do you really want to delete user: ${event.currentTarget.dataset.username}?`;
  confirmButton.setAttribute("data-userid", event.currentTarget.dataset.userid);
  confirmButton.addEventListener("click", confirmDialogHandler);
  dialog.showModal();
};

const deleteButtons = document.querySelectorAll(".divButton span");
for (const db of deleteButtons) {
  db.addEventListener("click", showConfirmDialog);
}

closeButton.addEventListener("click", hideDialogHandler);
