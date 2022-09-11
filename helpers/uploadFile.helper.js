const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (files, fileName = "") => {
  return new Promise((resolve, reject) => {
    const { image } = files;
    const nameCut = image.name.split(".");
    const extension = nameCut[nameCut.length - 1];
    const nameTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", fileName, nameTemp);
    image.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(nameTemp);
    });
  });
};
module.exports = {
  uploadFile,
};
