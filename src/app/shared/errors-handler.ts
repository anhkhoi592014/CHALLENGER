import { ErrorHandler, Injectable, ViewContainerRef, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class ErrorsHandler implements ErrorHandler{
    constructor(
        private injector:Injector
    ){

    }
    handleError(error: Error | HttpErrorResponse){
        const toastr = this.injector.get(ToastrManager);
        if(error instanceof HttpErrorResponse){
            if(!navigator.onLine){
                console.log("Không có mạng");
            }else{
                if(error.status === 403){
                    console.log("403");
                }else if(error.status === 404){
                    console.log("404");
                }
            }
        }else{
            // toastr.errorToastr('Có lỗi xãy ra', 'Thông báo ',{
            // position: 'top-right',
            // animate: 'slideFromTop'
            // })
        }
    }
}
