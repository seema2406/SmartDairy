import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';

export const phoneFormSchema = yupResolver(
  yup
    .object({
      phone_number: yup
        .string()
        .required(t('Validations.MobileNumberRequired'))
        .test('len', t('Validations.MobileNumberLength'), (val: any) => {
          const validMobile = val?.replace(/[^\d]/g, '');
          return validMobile?.length === 10;
        }),
    })
    .required(),
);

export const createDairyFormSchema = yupResolver(
  yup
    .object({
      dairy_name: yup.string().required(t('Validations.DairyNameRequired')),
      mobile_number: yup
        .string()
        .required(t('Validations.MobileNumberRequired'))
        .test('len', t('Validations.MobileNumberLength'), (val: any) => {
          const validMobile = val?.replace(/[^\d]/g, '');
          return validMobile?.length === 10;
        }),
      state: yup.string().required('Select State'),
      // city: yup.string().required('Select City'),
      city: yup.string().optional(),
    })
    .required(),
);

export const partyFormSchema = yupResolver(
  yup
    .object({
      type: yup.string().required(t('Validations.PartyTypeRequired')),
      party_name: yup.string().required(t('Validations.DairyNameRequired')),
      phone_number: yup
        .string()
        .required(t('Validations.MobileNumberRequired'))
        .test('len', t('Validations.MobileNumberLength'), (val: any) => {
          const validMobile = val?.replace(/[^\d]/g, '');
          return validMobile?.length === 10;
        }),
    })
    .required(),
);

export const tabContentFormSchema = (
  tab: string,
  from: string,
  cType: string,
) =>
  yupResolver(
    yup
      .object({
        fat:
          tab === 'milk'
            ? from === 'S' && cType !== 'D'
              ? yup.string().nullable().notRequired()
              : yup.string().required(t('Validations.Required'))
            : yup.string().nullable().notRequired(),
        qty: yup.string().required(t('Validations.Required')),
        item:
          tab === 'others'
            ? yup.string().required(t('Validations.Required'))
            : yup.string().nullable().notRequired(),
        remark: yup.string().optional(),
      })
      .required(),
  );

export const tabContentFormSchemaPR = yupResolver(
  yup
    .object({
      amount: yup.string().required(t('Validations.Required')),
      remark: yup.string().optional(),
    })
    .required(),
);
export const itemFormSchema = yupResolver(
  yup
    .object({
      item_name: yup.string().required(t('Validations.ItemNameRequired')),
      unit: yup.string().required(t('Validations.UnitRequired')),
      sale_rate: yup.string().required(t('Validations.SaleRateRequired')),
      purchase_rate: yup
        .string()
        .required(t('Validations.PurchaseRateRequired')),
    })
    .required(),
);

export const customPriceSchema = yupResolver(
  yup
    .object({
      sale: yup.string().required(t('Validations.SaleRateRequired')),
      purchase: yup.string().required(t('Validations.PurchaseRateRequired')),
    })
    .required(),
);

export const staffFormSchema = yupResolver(
  yup
    .object({
      staff_name: yup.string().required(t('Validations.StaffNameRequired')),
      phone_number: yup
        .string()
        .required(t('Validations.MobileNumberRequired'))
        .test('len', t('Validations.MobileNumberLength'), (val: any) => {
          const validMobile = val?.replace(/[^\d]/g, '');
          return validMobile?.length === 10;
        }),
      permission: yup.string().required(t('Validations.DairyPermRequired')),
    })
    .required(),
);
