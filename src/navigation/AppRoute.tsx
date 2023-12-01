import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/home/Home';
import Payment from '../views/payment/Payment';
import Sale from '../views/sale/Sale';
import Purchase from '../views/purchase/Purchase';
import RightMenu from '../views/rightMenu/RightMenu';
import LeftMenu from '../views/leftMenu/LeftMenu';
import SVG from '../assets/svg';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setAuthState } from '../store/slices/authSlice';
import { useEffect } from 'react';
import { useLazyCheckDeviceQuery } from '../services/authService';
import Splash from '../views/splash/Splash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../theme';
import { ROUTES } from '../constants/routeConstant';
import { getUniqueId } from 'react-native-device-info';
import ChooseLanguage from '../views/chooseLanguage/ChooseLanguage';
import ChooseRole from '../views/chooseRole/ChooseRole';
import OtpSend from '../views/otpSend/OtpSend';
import OtpVerification from '../views/otpVerification/OtpVerification';
import CreateDairy from '../views/createDairy/CreateDairy';
import i18n from '../locales/i18n';
import MMKVStorage from '../store/mmkv';
import { MMKV_KEYS } from '../constants/mmkvConstant';
import { FONTS } from '../theme';
import TabHeader from '../components/tabHeader/TabHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImportContacts from '../views/importContacts/ImportContacts';
import PartyForm from '../views/partyForm/PartyForm';
import PartyList from '../views/partyList/PartyList';
import StackHeader from '../components/stackHeader/StackHeader';
import AppText from '../components/text/AppText';
import { useTranslation } from 'react-i18next';
import { getFormData } from '../helpers/utils';
import { setDeviceId, setUserId } from '../config/apiConfig';
import { size } from 'lodash';
import { setSelectedDairy } from '../store/slices/dairySlice';
import CustomizePrice from '../views/customizePrice/CustomizePrice';
import SelectItemParty from '../views/selectItemParty/SelectItemParty';
import ItemList from '../views/itemList/ItemList';
import ItemForm from '../views/itemForm/ItemForm';
import StaffList from '../views/staffList/StaffList';
import StaffForm from '../views/staffForm/StaffForm';
import DairyPermission from '../views/dairyPermission/DairyPermission';
import Receipt from '../views/receipt/Receipt';
import Report from '../views/report/Report';
import DayBook from '../views/dayBook/DayBook';
import VoucherBook from '../views/voucherBook/VoucherBook';
import CashBook from '../views/cashBook/CashBook';
import LedgerBook from '../views/ledgerBook/LedgerBook';
import SmartFilter from '../views/smartFilter/SmartFilter';

const RightDrawer = createDrawerNavigator();
const LeftDrawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Auth = createNativeStackNavigator();
const App = createNativeStackNavigator();

const AuthStack = () => {
  const { userID, isDairyCreated } = useAppSelector(state => state.auth);
  return (
    <Auth.Navigator
      initialRouteName={
        userID && !isDairyCreated ? ROUTES.createDairy : ROUTES.chooseLanguage
      }>
      <Auth.Screen
        name={ROUTES.chooseLanguage}
        component={ChooseLanguage}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name={ROUTES.chooseRole}
        component={ChooseRole}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name={ROUTES.otpSend}
        component={OtpSend}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name={ROUTES.otpVerification}
        component={OtpVerification}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name={ROUTES.createDairy}
        component={CreateDairy}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

const HomeTabs = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={props => ({
        tabBarIcon: ({ focused, color, size }) => {
          const { route } = props;
          if (route.name === 'Receipt') {
            return <SVG.receiptIcon />;
          } else if (route.name === 'Payment') {
            return <SVG.paymentIcon />;
          } else if (route.name === 'SmartFilterSale') {
            return <SVG.saleIcon />;
          } else if (route.name === 'SmartFilterPurchase') {
            return <SVG.purchaseIcon />;
          } else if (route.name === 'Home') {
            return (
              <SVG.dashboardIcon width={24} height={24} fill={'#002047'} />
            );
          }
        },
        tabBarActiveTintColor: '#002047',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: FONTS.regular,
        },
        tabBarItemStyle: {
          height: 54,
        },
        tabBarStyle: {
          height: 54,
        },
        tabBarLabel: ({ focused, color }) => {
          const { route } = props;
          if (route.name === 'Receipt') {
            return <AppText color={color}>{t('Buttons.Receipt')}</AppText>;
          } else if (route.name === 'Payment') {
            return <AppText color={color}>{t('Buttons.Payment')}</AppText>;
          } else if (route.name === 'SmartFilterSale') {
            return <AppText color={color}>{t('Buttons.Sale')}</AppText>;
          } else if (route.name === 'SmartFilterPurchase') {
            return <AppText color={color}>{t('Buttons.Purchase')}</AppText>;
          } else if (route.name === 'Home') {
            return <AppText color={color}>{t('Buttons.Home')}</AppText>;
          }
        },
        header: prop =>
          prop?.route?.name !== 'Home' ? (
            <StackHeader showBackIcon={false} {...prop} />
          ) : (
            <TabHeader showBackIcon={false} {...prop} />
          ),
      })}>
      <Tab.Screen name="Receipt" component={Receipt} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SmartFilterSale" component={SmartFilter} />
      <Tab.Screen name="SmartFilterPurchase" component={SmartFilter} />
    </Tab.Navigator>
  );
};

function LeftDrawerScreen() {
  return (
    <LeftDrawer.Navigator
      id="LeftDrawer"
      drawerContent={props => <LeftMenu {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}>
      <LeftDrawer.Screen name="Home" component={HomeTabs} />
    </LeftDrawer.Navigator>
  );
}

const RightDrawerStack = () => {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      drawerContent={props => <RightMenu {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}>
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
};

const AppStack = () => {
  return (
    <App.Navigator
      screenOptions={{
        header: props => <StackHeader showBackIcon={true} {...props} />,
        headerShadowVisible: true,
      }}>
      <App.Screen
        name={ROUTES.app}
        component={RightDrawerStack}
        options={{ headerShown: false }}
      />
      <App.Screen name={ROUTES.partyForm} component={PartyForm} />
      <App.Screen name={ROUTES.partyList} component={PartyList} />
      <Auth.Screen
        name={ROUTES.addDairy}
        component={CreateDairy}
        options={{ headerShown: false }}
      />
      <Auth.Screen name={ROUTES.importContacts} component={ImportContacts} />
      <Auth.Screen name={ROUTES.customizePrice} component={CustomizePrice} />
      <Auth.Screen name={ROUTES.selectItemParty} component={SelectItemParty} />
      <Auth.Screen name={ROUTES.itemList} component={ItemList} />
      <Auth.Screen name={ROUTES.itemForm} component={ItemForm} />
      <Auth.Screen name={ROUTES.staffList} component={StaffList} />
      <Auth.Screen name={ROUTES.staffForm} component={StaffForm} />
      <Auth.Screen name={ROUTES.dairyPermission} component={DairyPermission} />
      <Auth.Screen name={ROUTES.report} component={Report} />
      <Auth.Screen name={ROUTES.dayBook} component={DayBook} />
      <Auth.Screen name={ROUTES.voucherBook} component={VoucherBook} />
      <Auth.Screen name={ROUTES.cashBook} component={CashBook} />
      <Auth.Screen name={ROUTES.ledgerBook} component={LedgerBook} />
      <Auth.Screen name={ROUTES.purchase} component={Purchase} />
      <Auth.Screen name={ROUTES.sales} component={Sale} />
      <Auth.Screen name={ROUTES.payment} component={Payment} />
      <Auth.Screen name={ROUTES.receipt} component={Receipt} />
    </App.Navigator>
  );
};

export default function AppRoute() {
  const { userID, isDairyCreated, isValidUser } = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  const [checkDevice, result] = useLazyCheckDeviceQuery();

  useEffect(() => {
    const selectedLang = MMKVStorage.getItem(MMKV_KEYS.language) || 'en';
    i18n.changeLanguage(selectedLang);
    const verifyUserDevice = async () => {
      const deviceId = await getUniqueId();
      const formData = getFormData({
        cDeviceid: deviceId,
      });
      checkDevice(formData).then((res: any) => {
        if (
          res?.data?.Data &&
          res?.data?.Data !== null &&
          size(res?.data?.Data) > 0 &&
          res?.data?.Data[0]?.nUserid
        ) {
          setUserId(res?.data?.Data[0]?.nUserid);
          setDeviceId(deviceId);
          dispatch(setAuthState(res?.data));
          dispatch(setSelectedDairy(res?.data?.Data[0]?.Dairy[0]));
        }
      });
    };
    verifyUserDevice();
  }, []);

  if (result?.isLoading) {
    return <Splash />;
  }
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {userID && isDairyCreated && isValidUser ? (
            <AppStack />
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
