import { ErrorMessage } from "@hookform/error-message";

interface ImageChooserProps {
  order: number;
  register: Function;
}

export const ImageChooser = ({order, register}: ImageChooserProps) => {

  return (
    <div className="border p-1 my-2">
      <label className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`image${order}`}>
        Image {order}:
      </label>
      <input
        type="file"
        className="w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
        id={`image${order}`}
        {...register(`image${order}`)}
      />
      <label className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`image${order}Description`}>
        Description:
      </label>
      <input
        type="text"
        id={`image${order}Description`}
        className="w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
        {...register(`image${order}Description`)}
      />
    </div>
  );
};

export default ImageChooser;