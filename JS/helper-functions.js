function getById(ElementId) {
  if (typeof ElementId != "string") throw "Please enter a String as an ID";
  return document.getElementById(ElementId);
}
function getByDataAll(dataName = "") {
  if (typeof dataName != "string")
    throw "Please enter a String as an data name";
  return document.querySelectorAll(`[data-${dataName}]`);
}
function getByData(dataName = "") {
  if (typeof dataName != "string")
    throw "Please enter a String as an data name";
  return document.querySelector(`[data-${dataName}]`);
}
function activeThis(array, current, className) {
  array.forEach((item) => {
    item.classList.remove(className);
  });
  current.classList.add(className);
}
export { getById, getByDataAll, getByData, activeThis };
