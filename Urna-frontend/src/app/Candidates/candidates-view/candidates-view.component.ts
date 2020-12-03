import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../candidate';
import { CandiateService } from '../candidate.service'

@Component({
  selector: 'app-candidates-view',
  templateUrl: './candidates-view.component.html'
})
export class CandidatesViewComponent implements OnInit {

  constructor(private service: CandiateService,
              private router: Router) { }

  public candidateEdit: Candidate = new Candidate()
  public candidates: Candidate[]
  public str: string = "teste"

  ngOnInit() {
    this.service.getCandidates()
      .subscribe(
        candidates => this.candidates = candidates,
        error => console.log(error)
      )
  }

  editCandidate(candidate){
    this.router.navigate(['editCandidates', candidate.id ])
  }

  insertCandidate(){
    this.router.navigate(['insertCandidates'])
  }

  deleteCandidate(candidateId){
    this.service.deleteCandidate(candidateId)
      .subscribe(
        _ => window.location.reload(),
        error => console.log(error)
      )
  }
}
