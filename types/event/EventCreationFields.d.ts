interface EventCreationFields {
  name: string;
  category: SelectOption<string>;
  description?: string;
  project_goal?: number;
  goal_measurement?: string;
  goal_measurement_unit?: SelectOption<string>;
  goal_kind?: SelectOption<string>;
  start_date_time: Date;
  end_date_time: Date;
  location: SelectOption<string>;
  tags: SelectOption<string>[];
  image: {
    url: string;
    file: File;
  };
  min_num_of_volunteers?: number;
}

interface NewEventFields {
  eventValues: EventCreationFields;
  isProject: boolean;
}