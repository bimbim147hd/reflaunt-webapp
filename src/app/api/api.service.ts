import { PermissionService } from './permission/permission.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RoleService } from './role/role.service';
import { AdminApiService } from './admin/admin.service';
import { FileService } from './file/file.service';
import { SliderService } from './slider/slider.service';
import { ProductService } from './product/product.service';
import { UserService } from './user/user.service';
import { ShipmentService } from './shipment/shipment.service';
import { NotificationService } from './notification/notification.service';
import { WalletService } from './wallet/wallet.service';
import { VoucherService } from './voucher/voucher.service';
import { InboxService } from './inbox/inbox.service';

@Injectable()
export class ApiService {
  constructor(
    public auth: AuthService,
    public role: RoleService,
    public permission: PermissionService,
    public file: FileService,
    public admin: AdminApiService,
    public slider: SliderService,
    public product: ProductService,
    public user: UserService,
    public shipment: ShipmentService,
    public notification: NotificationService,
    public wallet: WalletService,
    public voucher: VoucherService,
    public inbox: InboxService
  ) {}
}
