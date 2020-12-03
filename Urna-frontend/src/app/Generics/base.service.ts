import { HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { throwError } from 'rxjs'

export abstract class BaseService {

    protected UrlServiceApi: string = "https://localhost:44350/"
    
    protected getJsonHeader () {
        return { headers: new HttpHeaders({ 'Content-Type':'application/json' }) }
    }

    protected getData = ( response: any ) => response.data || {}

    protected handleError( response: Response | any) {
        let errorMessages: string[] = []

        if( response instanceof HttpErrorResponse) {
            if(response.statusText === 'Unknown Error') {
                errorMessages.push('Ocorreu um Erro')
                response.error.errors = errorMessages
            }
        }

        console.log(`ERROR:  ${response}`)
        return throwError(response)
    }

}