import { AiFillCloseCircle } from "react-icons/ai";
import Button from "components/button";

interface PopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Popup({
  isOpen,
  title,
  message,
  onClose,
  onConfirm
}: PopupProps) {
  return (
    <div>
      {isOpen && (
        <div className="flex justify-center items-center fixed bg-gray-800 bg-opacity-30 inset-0 z-50">
          <div className="flex flex-col p-5  w-auto h-auto max-w-xl rounded-md bg-white shadow-lg">
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl">{title}</h1>
              <Button className="border-none text-xl ml-36" onClick={onClose}>
                <AiFillCloseCircle />
              </Button>
            </div>
            <div className="inline-block my-8 ">
              <h1 className="text-left">{message}</h1>
            </div>
            <div className="flex justify-end items-center ">
              <Button
                className="w-20 text-gray-900 font-medium rounded-lg p-2 hover:bg-gray-200 hover:bg-opacity-30"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="w-20 text-blue-400 font-medium rounded-lg p-2 hover:bg-gray-200 hover:bg-opacity-30"
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
