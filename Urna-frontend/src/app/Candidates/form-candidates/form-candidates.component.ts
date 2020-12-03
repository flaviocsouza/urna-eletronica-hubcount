import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../candidate';
import { CandiateService } from '../candidate.service';

@Component({
  selector: 'app-form-candidates',
  templateUrl: './form-candidates.component.html'
})
export class FormCandidatesComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute, 
              private service: CandiateService) { }

  public candidate: Candidate = new Candidate
  public candidateId: string

  public formCandidate: FormGroup
  public showMessageError: boolean = false
  public roles = [
    {roleId: 1, name:'Prefeito'},
    {roleId: 2, name:'Vereador'}
  ]

  public candidatestr: string 

  ngOnInit(): void {

    this.candidateId = this.activatedRoute.snapshot.paramMap.get('candidateId')
    
    this.formCandidate = this.fb.group({
      fullName: [this.candidate.fullName, Validators.required],
      viceCandidateName: [this.candidate.viceCandidateName],
      role: [this.candidate.role, Validators.required],
      captionNumber: [this.candidate.captionNumber,  [Validators.required, Validators.pattern('^[0-9]*$')]]
    })
    
    if(this.candidateId) {
      this.service.getCandidates()
        .subscribe(
          candidates =>{ 
            this.candidate = candidates.find(candidate => candidate.id === this.candidateId)
            console.log(this.candidate)
            this.formCandidate.setValue({
              fullName: this.candidate.fullName,
              viceCandidateName: this.candidate.viceCandidateName,
              role: this.candidate.role,
              captionNumber: this.candidate.captionNumber
            })
          },
          error => console.log(error)
        )  
    }
  }

  submitCandidate() {
    
    this.candidate = Object.assign(this.candidate, this.formCandidate.value)
    console.log(this.formCandidate.value)
    if(this.formCandidate.valid){
      if(this.candidateId) {
        this.service.putCandidate(this.candidate)
          .subscribe(
            _ => this.router.navigate(['candidates']),
            error => console.log(error)
          )
      }
      else {
        this.service.postCandidates(this.candidate)
          .subscribe(
            _ => this.router.navigate(['candidates']),
            error => console.log(error)
          )
      }
            
    } 
    else this.showMessageError = true;
  }
}
