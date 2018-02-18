import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatFormFieldModule} from '@angular/material';
import {GalleryConfig, /*GalleryService*/} from 'ng-gallery';
import {Upload} from '../../../shared/model/upload';
import {UploadService} from '../../../services/upload.service';
import {Language} from 'angular-l10n';
import {TdLoadingService} from '@covalent/core';
import {UserSettingService} from '../user-setting.service';
import {UserSetting} from '../user-setting';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-setting-dialog',
  templateUrl: './user-setting-dialog.component.html',
  styleUrls: ['./user-setting-dialog.component.scss'],
  providers: [ UserSettingService ]
})
export class UserSettingDialogComponent implements OnInit {

  @Language() lang: string;

  data: UserSetting = new UserSetting({});
  disableSelect = new FormControl(true);
  error: any;
  images = [];
  storage_ref = '/main/settings/item_type';

  constructor(@Inject(MAT_DIALOG_DATA) public md_data: UserSetting,
              private _itemtypeService: UserSettingService,
              private _loadingService: TdLoadingService,
              public dialogRef: MatDialogRef<UserSettingDialogComponent>) {

    try {
      if (md_data) {
        this.data = new UserSetting(md_data);
        /*if (!this.data.image) {
          this.displayImage('../../../../../assets/images/user.png');
        } else {
          this.displayImage(this.data.image);
        }*/

      } else {
        // this.displayImage('../../../../../assets/images/user.png');
        // this._itemtypeService.requestData().subscribe(() => {
        //   this.generateCode();
        // });
      }
    } catch (error) {
      this.error = error;
    }
  }

  ngOnInit(): void {
  }

  // generateCode() {
  //   this._loadingService.register('data.form');
  //   // const prefix = 'TYPE';
  //   // this.data.code = prefix + '-001';
  //   this.data.code = '1';
  //   this._itemtypeService.requestLastData().subscribe((s) => {
  //     s.forEach((ss: UserSetting) => {
  //       console.log('Prev Code :' + ss.code);
  //       // tslint:disable-next-line:radix
  //       const str = parseInt(ss.code.substring(ss.code.length - 1, ss.code.length)) + 1;
  //       const last = '' + str;
  //
  //       /*let last = prefix + '-' + str;
  //
  //       if (str < 100) {
  //         last = prefix + '-0' + str;
  //       }
  //
  //       if (str < 10) {
  //         last = prefix + '-00' + str;
  //       }*/
  //
  //       this.data.code = last;
  //     });
  //     this._loadingService.resolve('data.form');
  //   });
  // }

  saveData(form) {

    if (form.valid) {

      this.error = false;
      this._loadingService.register();

      this.data.tel = form.value.tel ? form.value.tel : null;
      this.data.address = form.value.address ? form.value.address : null;
      this.data.status = form.value.status ? form.value.status : null;

      if (this.md_data) {
        if (_.isEqual(this.data, this.md_data)) {
          this.dialogRef.close(false);
        } else {
          this._itemtypeService.updateData(this.data).then(() => {
            this.dialogRef.close(this.data);
            this._loadingService.resolve();
          }).catch((err) => {
            this.error = err.message;
            this._loadingService.resolve();
          });
        }
      } else {
        this._itemtypeService.addData(this.data).then(() => {
          this.dialogRef.close(this.data);
          this._loadingService.resolve();
        }).catch((err) => {
          this.error = err.message;
          this._loadingService.resolve();
        });
      }
    }
  }


  openLink(link: string) {
    window.open(link, '_blank');
  }

}
