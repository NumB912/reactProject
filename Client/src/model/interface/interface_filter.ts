export type FilterType = "Radio" | "CheckBox";
export type FilterInputType = "StarRadio" | "ValueRadio" | "CheckBox";

export interface FilterOption {
  id: string;
  value: string | number;
}

export interface FilterItem {
  type: FilterType;
  title: string;
  inputType: FilterInputType;
  name: string;
  options: FilterOption[];
}
