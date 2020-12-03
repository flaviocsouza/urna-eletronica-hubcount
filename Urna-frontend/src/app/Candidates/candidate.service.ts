import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from './candidate';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from '../Generics/base.service';

@Injectable({ providedIn: 'root' })
export class CandiateService extends BaseService {
    
    constructor(private http: HttpClient){
        super()
    }


    getCandidates = () : Observable<Candidate[]> => this.http.get<Candidate[]>(this.UrlServiceApi + 'GetCandidates');

    postCandidates = ( candidate : Candidate) : Observable<Candidate> => { 
        return this.http.post<Candidate>(this.UrlServiceApi + 'PostCandidate', candidate, this.getJsonHeader())
            .pipe(
                catchError(this.handleError)
            )
    }

    putCandidate = ( candidate : Candidate) : Observable<Candidate> => { 
        return this.http.put<Candidate>(this.UrlServiceApi + 'EditCandidate/', candidate, this.getJsonHeader())
            .pipe(
                catchError(this.handleError)
            )
    }

    deleteCandidate = ( candidateId: string) : Observable<Candidate> => { 
        return this.http.delete<any>(this.UrlServiceApi + 'DeleteCandidate/', {...this.getJsonHeader(), params:{candidateId: candidateId}})
            .pipe(
                catchError(this.handleError)
            )
    }
}