import React from "react";
import IconAndLabel from "../../../component/UI/IconLabel";

const LiteraryDot = () => {
  return (
    <div className="flex gap-4">
      <div className="literary flex flex-col items-center justify-center">
        <IconAndLabel
          Label={<p className="font-bold">1</p>}
          name="location-dot"
          className="rounded bg-primary text-white p-2 gap-0 flex-wrap justify-center"
          IconLayout="center"
          LabelLayout="center"
        />
        <div className="h-full bg-primary w-1"></div>
      </div>

      <div className="literary-detail mb-13">
        <p className="literary-title font-bold">Title literary</p>
        <p className="text-md">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
          eligendi at esse, odit rem aut. Sint eos natus facere totam aut
          recusandae odit nam incidunt excepturi fugiat dolorem, exercitationem
          deserunt!
        </p>
      </div>
    </div>
  );
};

export default LiteraryDot;
