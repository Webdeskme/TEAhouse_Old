const fileIcons = require("./getIconClass.js");

exports.confirmAccessKey = (key, compareDate) => {
  let outSplit = key.split("");
  let secs = `${outSplit[0]}${outSplit[1]}`;
  let month = `${outSplit[2]}${outSplit[3]}${outSplit[4]}`;
  let date = `${outSplit[5]}${outSplit[6]}`;
  let day = `${outSplit[7]}${outSplit[8]}${outSplit[9]}`;
  let year = `20${outSplit[10]}${outSplit[11]}`;
  const months = {
    0: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AUG",
    8: "SEP",
    9: "OCT",
    10: "NOV",
    11: "DEC"
  };
  let monthIdx;
  for (const property in months) {
    if (`${months[property]}` === month) {
      monthIdx = property;
    }
  }
  if (monthIdx !== undefined) {
    let acccessCodeDate = new Date(
      parseInt(year),
      parseInt(monthIdx),
      parseInt(date)
    ).getTime();

    let totalMs = compareDate - acccessCodeDate;
    totalSeconds = parseInt(Math.floor(totalMs / 1000));
    totalMins = parseInt(Math.floor(totalSeconds / 60));
    totalHours = parseInt(Math.floor(totalMins / 60));
    days = parseInt(Math.floor(totalHours / 24));
    if (days <= 7) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
exports.getFileType = file => {
  let fileObj = {};
  fileObj.name = file;
  let icon = fileIcons.getClassWithColor(file);

  if (icon !== null) {
    let dataSplit = icon.split(" ");
    fileObj.className = dataSplit[0];

    fileObj.colors = dataSplit.slice(1).join(" ");
  }
  /*else if (icon === null && file.indexOf(".") === -1) {
    fileObj.className = "folder-icon";
    fileObj.colors = null;
    fileObj.files = fs.readdirSync(homedir + file + "/");
  } */
  else {
    fileObj.className = "fabfile-icon";
    fileObj.colors = "medium-blue";
  }

  return fileObj;
};
exports.getList = (object, html, parent) => {
  if (object.type === "directory") {
    if (object.name === "WebCast") {
      html += `<span class="directory"><img src="/folder.svg" width="15" style="margin-right:15px" />${object.name}</span><ul>`;
    } else {
      parent = parent + object.name + "/";
      html += `<span class="directory"><img src="/folder.svg" width="15" style="margin-right:15px" /> ${object.name}</span><ul>`;
    }
    object.children.forEach((child, childIdx) => {
      if (child.type === "directory") {
        html = exports.getList(child, html, parent);
      } else {
        let type = exports.getFileType(child.name);

        html += `<li><i class="icon ${type.className} ${type.colors}"></i><a href="${parent}${child.name}">${child.name}</a></li>`;
      }
    });
    html += "</ul>";
  } else {
    let type = exports.getFileType(object);

    html += `<li><i class="icon ${type.className} ${type.colors}"></i><a href="${parent}${object.name}">${object.name}</a></li>`;
  }
  return html;
};
