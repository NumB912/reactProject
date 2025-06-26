import RadioOption from "./OptionType/RadioOption";
import CheckBoxOption from "./OptionType/CheckBoxOption";
import { FilterItem } from "../../model/interface/interface_filter";
interface SideBarFilterProps {
  arr: FilterItem[];
}

const SideBarFilter = ({ arr }: SideBarFilterProps) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      {arr.map((filter:FilterItem, index) => {
        if (filter.type === "Radio") {
          return (
            <div key={index} className="flex w-full flex-col gap-6">
              <p className="text-sm">{filter.title}</p>
              <RadioOption
                key={index}
                arr={filter.options}
                type={filter.inputType}
                nameRadio={filter.name}
              />
            </div>
          );
        } else if (filter.type === "CheckBox") {
          return (
            <div key={index} className="flex flex-col gap-6">
              <p className="text-sm">{filter.title}</p>
              <CheckBoxOption
                key={index}
                arr={filter.options}
                checkBoxName={filter.name}
              />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default SideBarFilter;
