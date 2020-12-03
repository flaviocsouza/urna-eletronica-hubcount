import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../Generics/base.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService extends BaseService {

  constructor( private http: HttpClient) {
    super();
   }

   getVotes = (voteType?: number): Observable<any> => this.http.get<string>(this.UrlServiceApi + 'GetVotes/'+ voteType.toString(), this.getJsonHeader())


}
