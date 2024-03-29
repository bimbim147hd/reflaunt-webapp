import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { ApiUrl } from './api-url.service';
import { FileService } from './file/file.service';
import { AdminApiModule } from './admin/admin.module';
import { SliderService } from './slider/slider.service';
import { ProductService } from './product/product.service';
import { UserService } from './user/user.service';
import { ShipmentService } from './shipment/shipment.service';
import { NotificationService } from './notification/notification.service';
import { WalletService } from './wallet/wallet.service';
import { VoucherService } from './voucher/voucher.service';
import { InboxService } from './inbox/inbox.service';
@NgModule({
  imports: [CommonModule, AdminApiModule],
  declarations: [],
  providers: [
    ApiUrl,
    ApiService,
    AuthService,
    RoleService,
    PermissionService,
    FileService,
    SliderService,
    ProductService,
    UserService,
    ShipmentService,
    NotificationService,
    WalletService,
    VoucherService,
    InboxService
  ]
})
export class ApiModule {}
