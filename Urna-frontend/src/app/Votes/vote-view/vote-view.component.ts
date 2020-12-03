import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Vote } from '../vote'
import { VotesService } from '../votes.service'
import { CandiateService } from '../../Candidates/candidate.service'
import { Candidate } from 'src/app/Candidates/candidate'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'


@Component({
  selector: 'app-vote-view',
  templateUrl: './vote-view.component.html',
  styleUrls: ['./vote-view.compontne.css']
})
export class VoteViewComponent implements OnInit, OnDestroy {

  @ViewChild('digitsForm') digitsForm: ElementRef;
  
  public voteFor: number = 1

  private navigationSubscription;
  private vote: Vote = new Vote
  private candidates: Candidate[]
  public selectedCandidate: Candidate = new Candidate;
  public formCaptionNumber: FormGroup
  public strCaptionNumber: String
  public labelVoteFor: string 

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute, 
              private voteService: VotesService,
              private candidateService: CandiateService) { }
 

  ngOnInit(): void {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit()
      }
    });

    this.voteFor = Number(this.activatedRoute.snapshot.paramMap.get('voteFor'))
    this.labelVoteFor = this.voteFor == 2? "VEREADOR": "PREFEITO"
    this.voteService.getIpAdress()
      .subscribe(
        ipResponse => this.vote.ipAdress = ipResponse.ip,
        error => console.log(error)
      )
    
    this.candidateService.getCandidates()
        .subscribe(
          candidates =>  this.candidates = candidates,
          error => console.log(error)
        )
    this.formCaptionNumber = this.fb.group({
      firstDigit: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
      secondDigit: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
      thirdDigit: ['',  [Validators.required,  Validators.pattern('^[0-9]*$')]],
      fourthDigit: ['',  [Validators.required,  Validators.pattern('^[0-9]*$')]],
      fifthDigit: ['',  [Validators.required,  Validators.pattern('^[0-9]*$')]]
    })

    
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
    }
  }

  checkField(name: any){
    let formCaption = this.formCaptionNumber
    let nextEl = this.digitsForm.nativeElement[name]
    console.log(nextEl)
    if(nextEl) nextEl.focus()

    let strCaption: string = formCaption.get('firstDigit').value + formCaption.get('secondDigit').value
    
    if(this.voteFor === 2) {
      strCaption += formCaption.get('thirdDigit').value +
        formCaption.get('fourthDigit').value +
        formCaption.get('fifthDigit').value
    }
    if((this.voteFor === 2 && strCaption.length === 5)||
       (this.voteFor === 1 && strCaption.length === 2)){
         let caption = Number(strCaption) 
         
         if(caption)
           this.selectedCandidate = this.candidates.find(c => c.captionNumber === caption) || new Candidate
       }
  }

  submitVote(blank:boolean = false){
    this.vote.captionNumber = blank ? 0 : this.selectedCandidate.captionNumber
    this.vote.voteFor = this.voteFor
    this.vote.voteDate = new Date
    
    if(this.validateVote())
      this.voteService.postVote(this.vote)
        .subscribe(
          _ => this.router.navigate(['results']),
          error => console.log(error)
        )
  }
  
  validateVote() {
    if(this.formCaptionNumber.get('firstDigit').invalid)  return false
    
    if(this.formCaptionNumber.get('secondDigit').invalid)  return false
    
    if(this.voteFor === 2)
    {
      if(this.formCaptionNumber.get('thirdDigit').invalid)  return false
      if(this.formCaptionNumber.get('fourthDigit').invalid)  return false
      if(this.formCaptionNumber.get('fifthDigit').invalid)  return false
    }
    return true
  }

  clearForm() {
    this.formCaptionNumber.reset()
    this.selectedCandidate = new Candidate
  }
}
