type EventStatus =
  | "Scheduled"
  | "Cancelled"
  | "Ongoing"
  | "Cancelled"
  | "Completed";

type EventType = "Project" | "Initiative";

interface Tag {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Transaction {
  project_id: string;
  transaction_time: string;
  transaction_value: number;
}

interface BaseEventDetail {
  id: string;
  name: string;
  description: string;
  status: "Scheduled" | "On Going" | "Completed" | "Cancelled";
  event_category: Category;
  min_num_of_volunteers: number;
  event_location: EventLocation;
  event_creator_id: string;
  event_start_date_time: string;
  event_end_date_time: string;
  event_tags: Tag[];
  current_num_of_participants: number;
  current_num_of_volunteers: number;
  volunteer_registration_enabled: boolean;
}

interface GoalKind {
  kind: string;
}

interface ProjectDetail extends BaseEventDetail {
  event_type: "project";
  goal: number;
  goal_kind: string;
  measurement_unit: string;
  progress: number;
  transactions: Transaction[];
}

interface InitiativeDetail extends BaseEventDetail {
  event_type: "initiative";
  participation_registration_enabled: boolean;
}

type EventDetail = ProjectDetail | InitiativeDetail;

type EventParticipation =
  | {
      is_registered: false;
    }
  | {
      is_registered: true;
      data: EventParticipationData;
    };

interface BaseEventParticipation {
  participant: string;
  registration_time: string;
  has_left_forum: boolean;
  rewarded: boolean;
  submitted_review: boolean;
  total_contribution: number;
  activities: { timestamp: string; contribution: number }[];
  event?: EventDetail;
}

interface ContributorEventParticipation extends BaseEventParticipation {
  type: "contributor";
}

interface ParticipantEventParticipation extends BaseEventParticipation {
  type: "participant";
}

interface VolunteerEventParticipation extends BaseEventParticipation {
  type: "volunteer";
  granted_manager_access: boolean;
}

type EventParticipationData =
  | ContributorEventParticipation
  | ParticipantEventParticipation
  | VolunteerEventParticipation;

interface BaseUpdateEventDetail {
  volunteer_registration_enabled: boolean;
  start_date_time: Date;
  end_date_time: Date;
  tags: Array<SelectOption<string>>;
  goal: number;
  measurement_unit: string;
  progress: number;
}


interface UpdateInitiativeEventDetail extends BaseUpdateEventDetail {
  participant_registration_enabled: boolean;
}