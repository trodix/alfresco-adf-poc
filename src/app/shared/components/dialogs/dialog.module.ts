import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RenameNodeDialogComponent } from './rename-node-dialog/rename-node-dialog.component';

@NgModule({
  declarations: [
    RenameNodeDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule
  ],
  exports: [
    RenameNodeDialogComponent
  ],
  providers: [],
})
export class DialogModule { }
