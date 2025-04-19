import React from 'react';
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import {getDataService} from '../model/modeldata';

export async function loadServices() {
  try {
    const Services = await getDataService();
    return Array.isArray(Services) ? Services : [];
  } catch (error) {
    console.error("Lỗi khi load services:", error);
    return [];
  }
}

const servicesLoad = () => {
  const services = useLoaderData();
  const navigate = useNavigate();

  return (
      <div className="grid grid-cols-4 gap-2 w-full place-items-center">
        {services.map((svc, index) => (
          <div key={index} className="" onClick={() => navigate(`/service/${svc.idservice}`)}>
            <img
              src="https://img.freepik.com/free-photo/products-ready-spa-session_23-2151916542.jpg"
              alt={svc.nameService}
              className="w-full object-cover h-full"/>
            <div className="">
              <h3 className="">{svc.nameservice}</h3>
              <div className=" ">
                <p>{svc.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default servicesLoad;
