import {NgModule} from '@angular/core';
import {AdminSharedModule} from '@app/admin/shared/admin-shared.module';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {CustomersRoutingModule} from './customers-routing.module';
import {CustomersComponent} from './customers.component';
import {CreateCustomerModalComponent} from './create-customer-modal.component';
@NgModule({
    declarations: [CustomersComponent,CreateCustomerModalComponent],
    imports: [AppSharedModule, CustomersRoutingModule]
})
export class CustomersModule {
}
