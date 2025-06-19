export const ServiceTour = async () => {
  try {
    const respone = await fetch("http://localhost:5000/api/tourServices");
    if (respone.ok) {
      const data = await respone.json();
      console.log(data)
      return data.TourServices;
    }
  } catch (err) {
    console.log(err);
  }

  return null;
};


export const HotelServices = async () => {
  try {
    const respone = await fetch("http://localhost:5000/api/HotelServices");
    if (respone.ok) {
      const data = await respone.json();
      console.log(data)
      return data;
    }
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const RentalService = async ()=>{

    try {
    const respone = await fetch("http://localhost:5000/api/RentalCarServices");
    if (respone.ok) {
      const data = await respone.json();
      console.log(data)
      return data;
    }
  } catch (err) {
    console.log(err);
  }

  return null;
}
