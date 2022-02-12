const sectionLinksContainer = document.getElementById(
  "section-links-container"
);
let sectionslinks = Array.from(sectionLinksContainer.children);
for (let i = 0; i < sectionLinksContainer.children.length; i++) {
  sectionslinks[i].onclick = function () {
    sectionslinks.forEach((e) => e.classList.remove("active"));
    this.classList.add("active");
  };
}
const burgerShape = document.getElementById("burger-shape");
burgerShape.onclick = () => {
  sectionLinksContainer.classList.toggle("show");
};
