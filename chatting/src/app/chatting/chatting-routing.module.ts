import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChattingListComponent} from "./chatting-list/chatting-list.component";

const routes: Routes = [
  {
    path: '',
    component: ChattingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChattingRoutingModule { }
