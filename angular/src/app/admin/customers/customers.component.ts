import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonLookupModalComponent } from '@app/shared/common/lookup/common-lookup-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import { filter as _filter } from 'lodash-es';
import { finalize } from 'rxjs/operators';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import {  CustomerServiceProxy, CustomerListDto, ListResultDtoOfCustomerListDto } from '@shared/service-proxies/service-proxies';
import { remove as _remove } from 'lodash-es';
@Component({
    templateUrl: './customers.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CustomersComponent extends AppComponentBase implements OnInit {

    customers: CustomerListDto[] = [];
    filter: string = '';

    constructor(
        injector: Injector,
        private _customerService: CustomerServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
       this.getPeople();
    }

    getPeople(): void {
        this._customerService.getCustomer(this.filter).subscribe((result) => {
         this.customers = result.items;
        });
    }
   deletePerson(person: CustomerListDto): void {
        this.message.confirm(
            this.l('AreYouSureToDeleteThePerson', person.customerName),
            'abc',
            isConfirmed => {
                if (isConfirmed) {
                   this._customerService.deleteCustomer(person.id)
                   .subscribe(() => {
                        this.notify.info(this.l('SuccessfullyDeleted'));
                        _remove(this.customers, person);
                    });
                }
            }
        );    
    } 
}
