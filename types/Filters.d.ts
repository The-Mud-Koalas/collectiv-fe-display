interface EventFilters {
    status: SelectOption<string> | null;
    type: SelectOption<string> | null;
    category: SelectOption<string> | null;
    tag: SelectOption<string> | null;
    location: SelectOption<string> | null;
}

type LocationFilters = Omit<EventFilters, "location">;