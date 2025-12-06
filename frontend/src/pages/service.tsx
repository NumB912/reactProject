import React, { useEffect } from 'react'
import { getDataService } from '../model/modeldata'
export async function loadService({params}) {
  const { serviceID } = params;
  console.log("🟡 params:", params);
  const service = await getDataService(serviceID);
  return {service}
}

const Service = () => {
  return (
    <div>Service</div>
  )
}

export default Service