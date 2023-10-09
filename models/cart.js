const fs=require("fs");
const path=require("path")
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
module.exports=class Cart{
   static addProduct(id,price){
    let cart={products:[],totalPrice:0}
    fs.readFile(p,(err,content)=>{
         if(err){
            cart={products:[{id:id,qty:1}],totalPrice:price};
         }else{
            cart=JSON.parse(content);
            const existingProductIndex=cart.products.findIndex(prod=> prod.id===id);
            let existingProduct=cart.products[existingProductIndex];
            let updatedProd;
            // console.log(existingProduct)
            if(existingProduct){
                updatedProd={...existingProduct};
                updatedProd.qty=updatedProd.qty+1;
                cart.products=[...cart.products]
                cart.products[existingProductIndex]=(updatedProd);
                
            }else{
                updatedProd={id:id,qty:1}
                cart.products=[...cart.products,updatedProd];
                
            }
            cart.totalPrice=cart.totalPrice+price;
            

         }
         fs.writeFile(p,JSON.stringify(cart),err=>{
            console.log(err);
        })

    })

   }
}