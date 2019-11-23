import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

@Injectable({
    providedIn: CoreModule
})
export class SystemConfigService {

    constructor() {
    }

    /**
     * 获取分页大小
     * @returns number 分页大小
     */
    getPageSize(): number {
        return 10;
    }
}
