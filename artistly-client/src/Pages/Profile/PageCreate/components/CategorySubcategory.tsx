import { Controller, useWatch } from "react-hook-form";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { categories } from "../../../../data/data";

type Props = {
  control: any;
  getValues: any;
  errors: any;
};

const CategorySubcategory = ({ control, errors }: Props) => {
  const categoryId = useWatch({
    control,
    name: "category",
  });
  const subcategories = categories.find(
    (category) => category.categoryId === categoryId
  )?.subcategories;

  return (
    <div className="flex flex-col md:grid grid-cols-2 place-content-center gap-x-12">
      <div className="flex flex-col items-center md:mb-0 mb-6">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Dropdown
              field={field}
              items={categories}
              header="Selecteaza o categorie"
              getItemLabel={(category) => category.categoryName}
              getItemValue={(category) => category.categoryId}
            />
          )}
        />

        <p className="text-red-600 text-sm whitespace-nowrap">
          {errors.category?.message}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Controller
          name="subcategory"
          control={control}
          render={({ field }) => (
            <Dropdown
              field={field}
              items={subcategories}
              header="Selecteaza o subcategorie"
              getItemLabel={(subCategory) => subCategory?.subcategoryName}
              getItemValue={(subCategory) => subCategory?.subcategoryId}
            />
          )}
        ></Controller>
        <p className="text-red-600 text-sm whitespace-nowrap">
          {errors.subcategory?.message}
        </p>
      </div>
    </div>
  );
};

export default CategorySubcategory;
