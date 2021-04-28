import { ConfirmDialogComponent, DocumentListComponent } from '@alfresco/adf-content-services';
import { AlfrescoApiService, NotificationService } from '@alfresco/adf-core';
import { NodeChildAssociation } from '@alfresco/js-api';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {
  RenameNodeDialogComponent, RenameNodeDialogDataOutput
} from 'app/shared/components/dialogs/rename-node-dialog/rename-node-dialog.component';
import { Observable } from 'rxjs';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.css']
})
export class DocumentlistComponent implements OnInit {

  @ViewChild('documentList', { static: true })
  documentList: DocumentListComponent;

  @Input()
  showViewer = false;

  nodeId: string = null;

  constructor(
    private notificationService: NotificationService,
    private preview: PreviewService,
    private apiService: AlfrescoApiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  uploadSuccess(event: any) {
    this.notificationService.showInfo('File uploaded');
    this.documentList.reload();
  }

  showPreview(event: any) {
    const entry = event.value.entry;
    if (entry && entry.isFile) {
      this.preview.showResource(entry.id);
    }
  }

  onGoBack(event: any) {
    this.showViewer = false;
    this.nodeId = null;
  }

  onContentActionError(event: any) {
    this.notificationService.showError('The action cannot be completed. A file with the same name already exists.');
  }

  onContentActionSuccess(event: any) {
    this.documentList.reload();
    this.notificationService.showInfo('The action has been completed.');
  }

  onOpenRenameNodeDialog(event: any) {
    const node: NodeChildAssociation = event.value.entry;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { node };

    const dialogRef: MatDialogRef<RenameNodeDialogComponent> = this.dialog.open(RenameNodeDialogComponent, dialogConfig);

    const outputDialogData$: Observable<RenameNodeDialogDataOutput> = dialogRef.afterClosed();
    outputDialogData$.subscribe(
      (dialogResult: RenameNodeDialogDataOutput) => {
        if (dialogResult.error) {
          this.notificationService.showError('Impossible de renommer l\'élément.');
          return;
        } else if (dialogResult.data) {
          this.documentList.reload();
          this.notificationService.showInfo('L\'élément a été renommé.');
        }
      }
    );
  }

  onOpenRemoveNodeDialog(event: any) {
    const node: NodeChildAssociation = event.value.entry;

    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer ce fichier ?',
        yesLabel: 'Oui, supprimer',
        noLabel: 'Non'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.apiService.nodesApi.deleteNode(node.id)
          .then(() => {
            this.documentList.reload();
            this.notificationService.showInfo(`L'élément a été supprimé.`);
          })
          .catch((err: Error) => {
            this.notificationService.showError(`Impossible de supprimer l'élément.`);
          });
      }
    });
  }

}
