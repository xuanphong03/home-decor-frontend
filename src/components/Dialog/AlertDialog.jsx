import PropTypes from "prop-types";

function AlertDialog({
  isOpen = false,
  title = "",
  description = "",
  confirmBtnLabel = "Continue",
  cancelBtnLabel = "Cancel",
  onClose,
  onConfirm,
}) {
  return (
    isOpen && (
      <div className="fixed inset-0 !z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative bg-white w-[500px] py-3 px-4 rounded">
          <h2 className="font-medium mb-2 text-xl">{title}</h2>
          <p className="mb-3 text-gray-700">{description}</p>
          <div className="text-right text-sm space-x-2">
            <button
              onClick={onClose}
              className="leading-8 px-3 bg-red-500 text-white min-w-[80px] rounded-sm hover:bg-red-600 transition-colors"
            >
              {cancelBtnLabel}
            </button>
            <button
              onClick={onConfirm}
              className="leading-8 px-3 bg-blue-500 text-white  min-w-[80px] rounded-sm hover:bg-blue-600 transition-colors"
            >
              {confirmBtnLabel}
            </button>
          </div>
        </div>
      </div>
    )
  );
}

AlertDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmBtnLabel: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default AlertDialog;
