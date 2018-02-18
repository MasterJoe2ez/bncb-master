
export class UserSetting {
  key?: string | null | undefined;
  address?: string | null | undefined;
  status?: string | null | undefined;
  tel?: string | null | undefined;

  constructor(params: UserSetting) {
    Object.assign(this, params);
  }
}
