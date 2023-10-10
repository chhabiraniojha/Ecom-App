const fs = require('fs');
const path = require('path');
const db =require("../util/database")

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('insert into product(`title`,`price`,`desc`,`image`) values(?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl])
  }

  static fetchAll() {
    return db.execute("select * from product");
  }

  static findById(id){
    return db.execute("select * from product where id=?",[id])
  }

  static deleteById(id){
    return db.execute("delete from product where id=?",[id])
  }
  


};
