export interface FamilyPriorityRequest {
  familyId: number;
  memberPriorities: FamilyPriority[];
}
export interface FamilyPriority {
  subId: number;
  priority: number;
}
