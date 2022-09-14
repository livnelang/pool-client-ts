import { MonthRange } from "../views/Orders/utils/ordersUtils";

export interface AppMails {
  defaultMailAddress: string;
  ownerMailAddress: string;
  extraAccountantMail: string;
}

export type MappedMailOptionValue = {
  [key in AppMailKey]: boolean;
};

type AppMailKey = keyof AppMails;

export interface SendOrderByMailRequest {
  formObject: {
    date: MonthRange;
  };
  mailsDetails: MappedMailOptionValue;
  dateText: string;
  subjectPrefix: any;
}
