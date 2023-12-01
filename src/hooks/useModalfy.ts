import { useModal } from 'react-native-modalfy';
import { MODALS } from '../constants/routeConstant';

export default () => {
  const { openModal, closeModal } = useModal();

  const showDropdown = () => {
    openModal(MODALS.dropdown);
  };

  const hideDropdown = () => {
    closeModal(MODALS.dropdown);
  };

  return {
    showDropdown,
    hideDropdown,
  };
};
