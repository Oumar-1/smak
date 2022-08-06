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
export { getById, getByDataAll, getByData };
