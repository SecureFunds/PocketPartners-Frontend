import { Component, OnInit } from '@angular/core';
import { PaymentService } from "../../../services/payment.service";
import { PartnerService } from "../../../../pockets/services/Partner.service";
import { PartnerEntity } from "../../../../pockets/model/partnerEntity";
import { PaymentEntity } from "../../../model/payment-entity";
import { AuthenticationService } from "../../../../iam/services/authentication.service";
import { GroupService } from "../../../../group/services/group.service";
import { GroupOperationsService } from "../../../../group/services/group-operations.service";

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  userId: number = 0;
  joinedGroups: any = [];
  pendingPayments: any = [];
  constructor(
    private partnerService: PartnerService,
    private paymentService: PaymentService,
    private authenticationService: AuthenticationService,
    private groupService: GroupService,
    private groupOperationService: GroupOperationsService,
  ) { }
  user: PartnerEntity = new PartnerEntity();

  ngOnInit(): void {
    this.authenticationService.currentUserId.subscribe((userId: any) => {
      this.userId = userId;
      this.partnerService.getPartnerById(userId).subscribe((partner: any) => {
        this.paymentService.getJoinedUserGroups(userId).subscribe((groups: any) => {
          groups.forEach((group: any) => {
            this.groupService.getById(group.groupId).subscribe((group: any) => {
              this.joinedGroups.push(group);
            });
          });
        });
      });
    });
  }

  onGroupChange(groupId: number): void {
    this.pendingPayments = []; 
    this.groupOperationService.getAllGroupOperationsByGroupId(groupId).subscribe((groupOperations: any) => {
      groupOperations.forEach((groupOperation: any) => {
        this.paymentService.getPaymentByUserIdAndStatus(this.userId, groupOperation.status="PENDING").subscribe((payments: any) => {
          if (groupOperation.status == "PENDING") {
            this.pendingPayments.push(...payments);
          }
        });
      });
    });
  }

  onSubmit(payment: PaymentEntity): void {
    this.paymentService.postCompletePaymentById(payment.id).subscribe();
  }
}
