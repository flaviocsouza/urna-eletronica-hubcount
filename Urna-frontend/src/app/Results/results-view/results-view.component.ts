import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/Candidates/candidate';
import { CandiateService } from 'src/app/Candidates/candidate.service';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styles: [
  ]
})
export class ResultsViewComponent implements OnInit {

  constructor(private candidateService: CandiateService,
              private resultsService: ResultsService) { }
  
  public candidates: Candidate[]
  public mayorResults: any[]
  public councilorResults: any[]

  public showMayorVotes: boolean
  public showCouncilorVotes: boolean
  
  public results: any = {
    allVotes: 0,
    mayorVotes: 0,
    councilorVotes: 0,
    blankOrNullVotes: 0
  }

  ngOnInit(): void {
    this.candidateService.getCandidates().subscribe(
      candidates => this.candidates = candidates,
      error => console.log(error)
    )
    this.resultsService.getVotes(0).subscribe(
      votes => {
         this.results.allVotes = votes
         console.log(votes)
      },
      error => console.log(error)
    )
    this.resultsService.getVotes(1).subscribe(
      votes => {
        this.results.mayorVotes = votes
        console.log(this.mayorResults)
      },
      error => console.log(error)
    )
    this.resultsService.getVotes(2).subscribe(
      votes => {
        this.results.councilorVotes = votes
        console.log(votes)
      },
      error => console.log(error)
    )
    this.resultsService.getVotes(3).subscribe(
      votes => {
        this.results.blankOrNullVotes = votes
        console.log(votes)
      },
      error => console.log(error)
    )
  }
}
