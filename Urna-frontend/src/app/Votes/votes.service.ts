import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../Generics/base.service';
import { Vote } from './vote';

@Injectable({ providedIn: 'root' })
export class VotesService extends BaseService {


  constructor( private http: HttpClient) {
    super();
   }

   private apiIpAdress = 'https://api.ipify.org?format=json'

   getIpAdress = (): Observable<any> => this.http.get<string>(this.apiIpAdress)

   postVote(vote: Vote): Observable<any> {
     return this.http.post(this.UrlServiceApi + 'PostVote', vote, this.getJsonHeader())
      .pipe(
        catchError(this.handleError)
      )
   }
}
