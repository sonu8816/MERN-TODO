import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        className: 'bg-green-500 text-white p-4 rounded-lg shadow-lg',
        bodyClassName: 'text-center text-sm',
        progressClassName: 'bg-green-200',
        position: "top-right",
        autoClose: 3000,
        closeButton: false,
        hideProgressBar: false,
        icon: false,
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        className: 'bg-red-500 text-white p-4 rounded-lg shadow-lg',
        bodyClassName: 'text-center text-sm',
        progressClassName: 'bg-red-200',
        position: "top-right",
        autoClose: 3000,
        closeButton: false,
        hideProgressBar: false,
        icon: false,
    });
};
