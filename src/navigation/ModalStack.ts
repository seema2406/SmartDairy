import { createModalStack, ModalStackConfig } from 'react-native-modalfy';
import LoadingIndicator from '../components/loader/LoadingIndicator';
import { MODALS } from '../constants/routeConstant';
import { Dimensions, Easing } from 'react-native';
import DropdownModal from '../components/dropdown/DropdownModal';
import SmsPrintModal from '../components/modals/smsPrintModal/SmsPrintModal';
import CustomPrice from '../components/modals/customPrice/CustomPrice';

const { height } = Dimensions.get('screen');

const bottomModalConfig = {
  position: 'bottom',
  animateOutConfig: {
    easing: Easing.inOut(Easing.exp),
    duration: 500,
  },
  transitionOptions: (animatedValue: any) => ({
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [height, 0, height],
        }),
      },
    ],
  }),
};

const modalConfig: ModalStackConfig | any = {
  [MODALS.loader]: {
    modal: LoadingIndicator,
    backBehavior: 'none',
  },
  [MODALS.dropdown]: {
    modal: DropdownModal,
    ...bottomModalConfig,
    backBehavior: 'none',
  },
  [MODALS.smsPrint]: {
    modal: SmsPrintModal,
    ...bottomModalConfig,
  },
  [MODALS.customPrice]: {
    modal: CustomPrice,
    ...bottomModalConfig,
    backBehavior: 'clear',
  },
};
const defaultOptions = { backdropOpacity: 0.6 };

export default createModalStack(modalConfig, defaultOptions);
