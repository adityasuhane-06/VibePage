let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const getDay = (timestamp) => {
  if (!timestamp) return '';
  let d = new Date(timestamp);
  return `${d.getDay()}  ${months[d.getMonth()]}`;
};