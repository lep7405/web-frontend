import NiceModal from '@ebay/nice-modal-react';
import LoadingModal from '../common/LoadingModal.jsx';



export const showLoadingModal = () => {
  console.log("hello")
  NiceModal.show(LoadingModal);
};

export const hideLoadingModal = () => {
  NiceModal.hide(LoadingModal);
};
