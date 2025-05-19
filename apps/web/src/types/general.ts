export const approvalStatusArray = ["PENDING", "APPROVED", "REJECTED"] as const;

export const vehicleType = [
  "STANDARD_SEDAN",
  "WHEEL_CHAIR_ACCESSIBLE_VAN",
  "STRETCHER_EQUIPPED_VEHICLE",
] as const;

export const shiftTypeArray = [
  "DAY",
  "NIGHT",
  "DAY_(6:00AM-2:00PM)",
  "DAY_(7:00AM-3:00PM)",
  "DAY_(7:00AM-7:00PM)",
  "AFTERNOON_(2:00PM-10:00PM)",
  "AFTERNOON_(3:00PM-11:00PM)",
  "NIGHT_(10:00PM-6:00AM)",
  "NIGHT_(11:00PM-7:00AM)",
  "NIGHT_(7:00PM-7:00AM)",
  "CUSTOM",
] as const;

export const shiftAdStatusArray = [
  "MARKETPLACE",
  "INVITATION_SENT_TO_PERMANENT_STAFF",
  "INVITATION_SENT_TO_INTERNAL_STAFF",
  "PRIVATE",
  "PENDING",
  "CRITICAL",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
  "COMPLETED",
  "EXPIRED",
] as const;

export const shiftPlanTaskStatusArray = [
  "PENDING",
  "INVITATION_ACCEPTED",
  "EXECUTED",
  "ERRORED",
  "CANCELLED",
  "USER_ACCEPTED", // Shift accepted from phone call.
  "USER_BUSY",
  "USER_UNATTENDED",
  "USER_REJECTED",
  "FAILED",
] as const;

/**
 * An array representing the different workflows for posting a shift.
 */
export const shiftPostingWorkflowArray = [
  /**
   * "DIRECT_TO_MARKETPLACE"
   * The shift will be directly posted to the marketplace.
   */
  "DIRECT_TO_MARKETPLACE",

  /**
   * "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE"
   * The shift will first be offered to internal staff set by Carestream 24.
   * If the shift has more than 3 days, it will only be visible to internal staff for the first 24 hours.
   * If the shift has between 1 to 3 days, it will be visible to internal staff for the first 6 hours.
   * If the shift has less than 24 hours, it will be moved to close call.
   */
  "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE",

  /**
   * "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE"
   * The shift will first be offered to priority lists set by the organization.
   * If no one from the priority list picks it up, the shift will be moved to the marketplace.
   */
  "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE",

  /**
   * "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE"
   * The shift will first be offered to the priority list, then to internal staff, and finally to the marketplace.
   */
  "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE",

  /**
   * "CLOSE_CALL"
   * Close call shifts are special shifts that will be directly available to the marketplace as well as available staff.
   * If any available staff picks it up, it will be directly assigned to that staff.
   */
  "CLOSE_CALL",

  /**
   * "DIRECT_TO_USER"
   * The shift will be directly offered to a specific user.
   * The shift will only be available to him. If he picks it up, it will be directly assigned to him. Else it will be cancelled.
   */
  "DIRECT_TO_USER",

  /**
   * "DIRECT_TO_INTERNAL_USER"
   * The shift will be directly offered to a specific internal user.
   * The shift will only be available to him. If he picks it up, it will be directly assigned to him. Else it will be cancelled.
   */
  "DIRECT_TO_INTERNAL_USER",

  /**
   * "FORCE_ASSIGN"
   * The shift will be directly assigned to a user.
   * The user will not have any option to accept or reject it.
   */
  "FORCE_ASSIGN",
] as const;

export const applicationStatusArray = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
  "EXPIRED",
] as const;

export const invitationStatusArray = [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "TIMED_OUT",
  "CANCELLED",
] as const;

export const shiftStatusArray = [
  "UNKNOWN",
  "ASSIGNED",
  "REASSIGNED",
  "STARTED",
  "COMPLETED",
  "CANCELLED",
] as const;

export const timesheetStatusArray = [
  "DRAFT",
  "APPLIED",
  "APPROVED_BY_ORGANIZATION",
  "APPROVED_BY_ADMIN",
  "REJECTED_BY_ORGANIZATION",
  "REJECTED_BY_ADMIN",
  "PAID_BY_ORGANIZATION",
  "PAID_BY_ADMIN",
  "CANCELLED",
] as const;

export const activityTypeArray = [
  "CHECK_IN",
  "CHECK_OUT",
  "BREAK_START",
  "BREAK_END",
  "OVERTIME_START",
  "OVERTIME_END",
] as const;

export const userTypeArray = [
  "UNKNOWN",
  "REGISTERED_NURSE",
  "CARER",
  "ORGANISATION_ADMIN",
  "SYSTEM_ADMIN",
  "REGISTERED_PRACTICAL_NURSE",
  "DOCTOR_OF_SOCIAL_WORK",
  "PERSONAL_SUPPORT_WORKER",
  "INTERNAL_STAFF",
  "DIETARY_AIDE",
] as const;

export const paymentStatusArray = [
  "PENDING",
  "PAID_BY_ORGANIZATION",
  "PAID_BY_ADMIN",
  "FAILED",
  "CANCELLED",
] as const;

export const applicationTypeArray = [
  "MARKETPLACE",
  "FAVORITE",
  "INTERNAL",
  "DIRECT",
  "INVITATION",
  "FORCE_ASSIGN",
] as const;

export const scheduledTaskTypeArray = [
  "SHIFT_AD_STATUS_UPDATE",
  "INTERNAL_STAFF_CALLOUT",
  "SHIFT_PLAN_CALL_TASK",
  "SHIFT_PLAN_RETRY_CALL_TASK",
  "SHIFT_AD_TO_CLOSE_CALL",
  "SHIFT_REMINDER",
  "SHIFT_AD_CLOSE",
] as const;

export const scheduledTaskStatusArray = [
  "PENDING",
  "RUNNING",
  "FINISHED",
  "ERRORED",
  "CANCELLED",
] as const;

export const userListTypeArray = ["INTERNAL", "ORG_STAFF", "GLOBAL"] as const;

export const adListingTypeArray = ["PUBLIC", "PRIORITY", "INTERNAL"] as const;

export const activityLogTypeArray = [
  "SHIFT_AD_CREATED",
  "TIMESHEET_SUMBITTED",
  "TIMESHEET_APPROVED",
  "TIMESHEET_REJECTED",
  "SHIFT_AD_NEW_APPLICATION",
  "SHIFT_AD_DELETED",
  "SHIFT_AD_STATUS_UPDATE",
] as const;

function createEnum<T extends string>(array: readonly T[]) {
  const obj = Object.fromEntries(array.map((key) => [key, key])) as {
    [K in T]: K;
  };
  return obj;
}

export const VehicleType = createEnum(vehicleType);
export type VehicleType = keyof typeof VehicleType;

export const ApprovalStatus = createEnum(approvalStatusArray);
export type ApprovalStatus = keyof typeof ApprovalStatus;

export const ShiftType = createEnum(shiftTypeArray);
export type ShiftType = keyof typeof ShiftType;

export const ShiftAdStatus = createEnum(shiftAdStatusArray);
export type ShiftAdStatus = keyof typeof ShiftAdStatus;

export const ShiftPostingWorkflow = createEnum(shiftPostingWorkflowArray);
export type ShiftPostingWorkflow = keyof typeof ShiftPostingWorkflow;

export const ApplicationStatus = createEnum(applicationStatusArray);
export type ApplicationStatus = keyof typeof ApplicationStatus;

export const InvitationStatus = createEnum(invitationStatusArray);
export type InvitationStatus = keyof typeof InvitationStatus;

export const ShiftStatus = createEnum(shiftStatusArray);
export type ShiftStatus = keyof typeof ShiftStatus;

export const TimesheetStatus = createEnum(timesheetStatusArray);
export type TimesheetStatus = keyof typeof TimesheetStatus;

export const ActivityType = createEnum(activityTypeArray);
export type ActivityType = keyof typeof ActivityType;

export const UserType = createEnum(userTypeArray);
export type UserType = keyof typeof UserType;

export const PaymentStatus = createEnum(paymentStatusArray);
export type PaymentStatus = keyof typeof PaymentStatus;

export const UserListType = createEnum(userListTypeArray);
export type UserListType = keyof typeof UserListType;

export const ApplicationType = createEnum(applicationTypeArray);
export type ApplicationType = keyof typeof ApplicationType;

export const ShiftListingType = createEnum(adListingTypeArray);
export type ShiftListingType = keyof typeof ShiftListingType;

export const ScheduledTaskType = createEnum(scheduledTaskTypeArray);
export type ScheduledTaskType = keyof typeof ScheduledTaskType;

export const ScheduledTaskStatus = createEnum(scheduledTaskStatusArray);
export type ScheduledTaskStatus = keyof typeof ScheduledTaskStatus;

export const ShiftPlanTaskStatus = createEnum(shiftPlanTaskStatusArray);
export type ShiftPlanTaskStatus = keyof typeof ShiftPlanTaskStatus;

export const ActivityLogType = createEnum(activityLogTypeArray);
export type ActivityLogType = keyof typeof ActivityLogType;

type StepStatus = {
  status: "not-done" | "done" | "active" | "rejected";
  updatedAt: Date | string;
  required: boolean;
};

type NotificationStatus = {
  email: boolean;
  sms: boolean;
};

export type OnboardingMeta = {
  type: "ONBOARDING";
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "APPROVED" | "REJECTED";
  personalDetails: StepStatus;
  addressDetails: StepStatus;
  professionalDetails: StepStatus;
  avatar: StepStatus;
  diplomaCertificate: StepStatus;
  workHistory: StepStatus;
  backgroundCheck: StepStatus;
  references: StepStatus;
  training: StepStatus;
  right_to_work: StepStatus;
  addressProof: StepStatus;
  tbScreening: StepStatus;
  imunizationProof: StepStatus;
  covidProof: StepStatus;
};

export type NotificationMeta = {
  type: "NOTIFICATION";
  shiftReminder: NotificationStatus;
  shiftApproval: NotificationStatus;
  shiftCancellation: NotificationStatus;
  passwordChange: NotificationStatus;
  login: NotificationStatus;
  timesheetApproval: NotificationStatus;
  timesheetRejection: NotificationStatus;
  shiftInvitation: NotificationStatus;
  criticalShift: NotificationStatus;
};

export type UserMetaValue = OnboardingMeta | NotificationMeta;

export type DocsRequiredMeta = {
  [key in UserType]: string[];
};

export type HealthCheckMeta = {
  dbRead: number;
  dbWrite: number;
  cryptoFunc: number;
  dbBulkRead: number;
  requestBy: string;
};

export type HealthDataMeta = {
  data: string;
};

export type DocExpiryMeta = {
  [key: string]: number;
};

export type ServerMetaValues =
  | DocsRequiredMeta
  | HealthCheckMeta
  | HealthDataMeta
  | DocExpiryMeta;

export type ServerMetaKeys =
  | "DOCS_REQUIRED"
  | "HEALTH_CHECK"
  | "HEALTH_DATA"
  | "DOCS_EXPIRY";
