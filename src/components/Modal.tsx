type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  desciption: string;
};

const Modal = ({ isOpen, onClose, onConfirm, title, desciption }: Props) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-x-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {title}
            </h2>
            <p className="text-gray-600 mb-6">{desciption}</p>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
