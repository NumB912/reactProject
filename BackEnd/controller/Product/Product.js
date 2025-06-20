const pool = require("../../config/config");
const { v4: uuidv4 } = require('uuid');

async function CreateProduct({
  NameProduct,
  Price,
  ServiceID,
  Description
}) {
  try {
    const ProductID = uuidv4();

    const query = `
      INSERT INTO public."PRODUCT"
      ("ProductID", "NameProduct", "Price", "ServiceID", "Description")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [ProductID, NameProduct, Price, ServiceID, Description ?? null];

    const result = await pool.query(query, values);
    return result.rows[0];  /
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

async function GetProductsByService(ServiceID) {
  try {
    const query = `SELECT * FROM public."PRODUCT" WHERE "ServiceID" = $1`;
    const result = await pool.query(query, [ServiceID]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function GetProduct(ProductID) {
  try {
    const query = `SELECT * FROM public."PRODUCT" WHERE "ProductID" = $1`;
    const result = await pool.query(query, [ProductID]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

async function EditProduct(ProductID, {
  NameProduct,
  Price,
  ServiceID,
  Description
}) {
  try {
    const query = `
      UPDATE public."PRODUCT"
      SET "NameProduct" = $1,
          "Price" = $2,
          "ServiceID" = $3,
          "Description" = $4
      WHERE "ProductID" = $5
      RETURNING *;
    `;
    const values = [NameProduct, Price, ServiceID, Description ?? null, ProductID];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

async function DeleteProduct(ProductID) {
  try {
    const query = `
      DELETE FROM public."PRODUCT"
      WHERE "ProductID" = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [ProductID]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

module.exports = {
  CreateProduct,
  GetProductsByService,
  GetProduct,
  EditProduct,
  DeleteProduct
};
