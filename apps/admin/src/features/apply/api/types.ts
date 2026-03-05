export type ApplicationType = 'ADD' | 'REMOVE' | 'CREATE';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';

export interface ApplicationTarget {
  targetSubId: number;
  targetName: string;
  targetPhoneNumber: string;
  targetFamilyRole: string;
}

export interface ApplicationItem {
  requestId: number;
  requestDisplayId: string;
  familyId: number;
  familyDisplayId: string;
  familyName: string;
  requestSubId: number;
  requesterName: string;
  requesterPhoneNumber: string;
  targets: ApplicationTarget[];
  relationDocumentUrl: string;
  requestedAt: string;
}

export interface GetApplicationsResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  applyType: ApplicationType;
  status: ApplicationStatus;
  requests: ApplicationItem[];
}

export interface GetApplicationsRequest {
  applyType: ApplicationType;
  status: ApplicationStatus;
  page: number;
  size: number;
}
