const modal = document.getElementById('modal');
const modalText = modal.querySelector("p");

const showModal = (text) => {
    modalText.innerHTML = text;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

const removeModal = () => {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
}

export {showModal, removeModal};