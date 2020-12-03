import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesViewComponent } from './Candidates/candidates-view/candidates-view.component';
import { FormCandidatesComponent } from './Candidates/form-candidates/form-candidates.component';
import { ResultsViewComponent } from './Results/results-view/results-view.component';
import { VoteViewComponent } from './Votes/vote-view/vote-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  { path: 'results', component: ResultsViewComponent },
  { path: 'candidates', component: CandidatesViewComponent},
  { path: 'editCandidates/:candidateId', component: FormCandidatesComponent},
  { path: 'insertCandidates', component: FormCandidatesComponent},
  { path: 'vote/:voteFor', component: VoteViewComponent, runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
