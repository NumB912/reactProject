const pool = require("../../config/config");
const { v4: uuidv4 } = require('uuid');

async function GetServices(type) {
  try {
    const dataServices =`SELECT 
    S."ServiceID",
    S."ServiceName",
    S."Discription",
    A."AreaName",
    P."NameProvince",
	S."ServiceTypeID",
	"COMPANY_SUPPLIER"."CompanyName",
    ARRAY_AGG(I."URL") AS "ImageURLs"
FROM "SERVICE" S
JOIN "LOCATION" L ON L."LocationID" = S."LocationID"
JOIN "SUPPLIER" SP ON SP."SupplierID" = S."SupplierID"
JOIN "IMAGE_ASSOCIATION" IA ON IA."ImageAssociationID" = S."ImageAssociationID"
JOIN "AREA" A ON A."AreaID" = L."AreaID"
JOIN "IMAGE" I ON I."ImageAssociationID" = IA."ImageAssociationID"
JOIN "PROVINCE" P ON P."ProvinceID" = L."ProvinceID"
JOIN "COMPANY_SUPPLIER" ON "COMPANY_SUPPLIER"."CompanySupplierID" = SP."CompanyID"
WHERE S."ServiceTypeID" = $1
GROUP BY S."ServiceID", S."ServiceName", S."Discription", A."AreaName", P."NameProvince", P."NameProvince","COMPANY_SUPPLIER"."CompanyName"
`;
    const values = [type]
    const results = await pool.query(dataServices,values)
    console.log(results.rows)
    if (!results.rows || results.rows.length === 0) {
      return null;
    }

    return results.rows;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

async function GetService(ServiceID) {
  try {
    const query = `SELECT * FROM public."SERVICE" WHERE "ServiceID" = $1`;
    const values = [ServiceID];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching service:', error);
    throw error;
  }
}

async function CreateService({
  Service
}) {
  try {
    const ServiceID = uuidv4(); 

    const query = `
      INSERT INTO public."SERVICE" 
      ("ServiceID", "SupplierID", "ServiceName", "StatusID", "ServiceTypeID", "ImageAssociationID", "LocationID", "Discription")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      ServiceID,
      Service.SupplierID,
      Service.ServiceName,
      Service.StatusID,
      Service.ServiceTypeID,
      Service.ImageAssociationID,
      Service.LocationID,
      Service.Discription ?? null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // trả về object service mới tạo, có cả ServiceID
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
}


async function EditService(ServiceID, {
  SupplierID,
  ServiceName,
  StatusID,
  ServiceTypeID,
  ImageAssociationID,
  LocationID,
  Discription
}) {
  try {
    const query = `
      UPDATE public."SERVICE"
      SET
        "SupplierID" = $1,
        "ServiceName" = $2,
        "StatusID" = $3,
        "ServiceTypeID" = $4,
        "ImageAssociationID" = $5,
        "LocationID" = $6,
        "Discription" = $7
      WHERE "ServiceID" = $8
      RETURNING *;
    `;
    const values = [
      SupplierID,
      ServiceName,
      StatusID,
      ServiceTypeID,
      ImageAssociationID,
      LocationID,
      Discription ?? null,
      ServiceID
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error editing service:', error);
    throw error;
  }
}

async function DeleteService(ServiceID) {
  try {
    const query = `
      DELETE FROM public."SERVICE"
      WHERE "ServiceID" = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [ServiceID]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}

module.exports = {
  GetServices,
  GetService,
  CreateService,
  EditService,
  DeleteService
};
