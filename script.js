/* AVL */
class Node {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
  constructor() {
    this.root = null;
  }

  height(n) {
    return n ? n.height : 0;
  }

  rotateRight(y) {
    let x = y.left;
    y.left = x.right;
    x.right = y;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }

  rotateLeft(x) {
    let y = x.right;
    x.right = y.left;
    y.left = x;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    return y;
  }

  insertNode(node, name, phone) {
    if (!node) return new Node(name, phone);
    if (name < node.name) node.left = this.insertNode(node.left, name, phone);
    else if (name > node.name)
      node.right = this.insertNode(node.right, name, phone);
    else return node;

    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    let balance = this.height(node.left) - this.height(node.right);

    if (balance > 1 && name < node.left.name) return this.rotateRight(node);
    if (balance < -1 && name > node.right.name) return this.rotateLeft(node);

    return node;
  }

  insert(name, phone) {
    this.root = this.insertNode(this.root, name, phone);
  }

  inorder(node, arr) {
    if (!node) return;
    this.inorder(node.left, arr);
    arr.push(node);
    this.inorder(node.right, arr);
  }

  list() {
    let arr = [];
    this.inorder(this.root, arr);
    return arr;
  }
}

/* APP */
const tree = new AVL();
[
  "Ana",
  "+244911111111",
  "Bruno",
  "+244922222222",
  "Carlos",
  "+244933333333",
].forEach((v, i, a) => i % 2 === 0 && tree.insert(v, a[i + 1]));

const modal = document.getElementById("modal");
const toast = document.getElementById("toast");
const contactList = document.getElementById("contactList");
const contactsSection = document.getElementById("contactsSection");

/* MENU */
document.getElementById("hamburger").onclick = () =>
  document.querySelector(".nav-links").classList.toggle("active");

/* MODAL */
openModalBtn.onclick = () => modal.classList.remove("hidden");
closeModalBtn.onclick = () => modal.classList.add("hidden");

/* ADD */
addContactBtn.onclick = () => {
  tree.insert(nameInput.value, phoneInput.value);
  modal.classList.add("hidden");
  showToast();
  render();
};

/* LIST */
toggleListBtn.onclick = () => {
  contactsSection.classList.toggle("hidden");
  render();
};

/* SEARCH */
searchInput.oninput = () => {
  contactsSection.classList.remove("hidden");
  render(searchInput.value);
};

function render(filter = "") {
  contactList.innerHTML = "";
  tree
    .list()
    .filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((c) => {
      let li = document.createElement("li");
      li.innerHTML = `${c.name} - ${c.phone} <button>Remover</button>`;
      contactList.appendChild(li);
    });
}

function showToast() {
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2000);
}
