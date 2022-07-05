import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChattingRoutingModule } from './chatting-routing.module';
import { ChattingListComponent } from './chatting-list/chatting-list.component';


@NgModule({
  declarations: [
    ChattingListComponent
  ],
  imports: [
    CommonModule,
    ChattingRoutingModule
  ]
})
export class ChattingModule { }
