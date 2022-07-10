export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoggedUser {
  userName: string;
  token: string;
}

export interface AppMails {
  defaultMailAddress: string;
  ownerMailAddress: string;
  extraAccountantMail: string;
}

export interface LoginResponse {
  loggedUser: LoggedUser;
  mails: AppMails;
}
