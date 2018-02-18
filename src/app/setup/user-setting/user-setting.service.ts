import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {UserSetting} from './user-setting';
import {Page} from '../../shared/model/page';
import {Observable} from 'rxjs';
import {PagedData} from '../../shared/model/paged-data';

@Injectable()
export class UserSettingService {
  lists: FirebaseListObservable<any>;
  rows: UserSetting[] = [];
  _path: string = '/User';

  constructor(private agFb: AngularFireDatabase) {
    this.lists = agFb.list(this._path, {preserveSnapshot: true});
  }

  getPath(): string {
    return this._path;
  }

  requestData() {
    return this.lists;
  }

  requestDataByCode(code: string) {
    return this.agFb.object(this._path + '/' + code);
  }

  addData(data: UserSetting) {
    return this.lists.update(data.key, data);
  }

  updateData(data: UserSetting) {
    return this.lists.update(data.key, data);
  }

  updateDataStatus(data: UserSetting, active: boolean) {
    return this.lists.update(data.key, {
      disable: active
    });
  }

  removeData(data: UserSetting) {
    return this.lists.remove(data.key);
  }

  requestLastData() {
    return this.agFb.list(this._path, {
      query: {
        limitToLast: 1
      }
    });
  }

  public getResults(page: Page): Observable<PagedData<UserSetting>> {
    return Observable.of(this.rows).map((data) => this.getPagedData(page));
  }

  private getPagedData(page: Page): PagedData<UserSetting> {
    const pagedData = new PagedData<UserSetting>();
    page.totalElements = this.rows.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min((start + page.size), page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = this.rows[i];
      pagedData.data.push(new UserSetting(jsonObj));
    }
    pagedData.page = page;
    return pagedData;
  }

}
