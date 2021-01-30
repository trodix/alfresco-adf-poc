import { NodesApiService } from '@alfresco/adf-core';
import { NodeBodyUpdate, NodeChildAssociation } from '@alfresco/js-api';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface RenameNodeDialogDataInput {
  elementName: string;
}

export interface RenameNodeDialogDataOutput {
  data?: any;
  error?: Error;
}

@Component({
  selector: 'app-rename-node-dialog',
  templateUrl: './rename-node-dialog.component.html',
  styleUrls: ['./rename-node-dialog.component.css']
})
export class RenameNodeDialogComponent implements OnInit {

  form: FormGroup;
  node: NodeChildAssociation;
  output: RenameNodeDialogDataOutput;

  constructor(
    private nodeService: NodesApiService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RenameNodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.node = data.node;
  }

  ngOnInit() {
    this.form = this.fb.group({
      elementName: new FormControl(this.node.name, {
        validators: [
          Validators.minLength(2),
          Validators.required
        ],
        updateOn: 'change'
      })
    });
  }

  hasFormError(): boolean {
    return this.form.get('elementName').hasError('required')
      || this.form.get('elementName').hasError('minlength');
  }

  onSubmit(): void {
    if (!this.form.errors) {

      const nodeBody: NodeBodyUpdate = {
        name: this.form.get('elementName').value
      };

      this.nodeService.updateNode(this.node.id, nodeBody).subscribe(
        (node: NodeChildAssociation) => {
          this.output = { data: node };
          this.dialogRef.close(this.output);
        },
        failure => {
          this.output = { error: failure.error };
          this.dialogRef.close(this.output);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
