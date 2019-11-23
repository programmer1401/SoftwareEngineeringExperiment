import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

@Injectable({
    providedIn: CoreModule
})
export class CommonService {
    constructor() {
    }

    /**
     * 比较两个实体是否相等
     * @param entity1 实体1
     * @param entity2 实体2
     */
    compareEntityEqual(entity1, entity2): boolean {
        return entity1 && entity2 ? entity1.id === entity2.id : false;
    }
}
