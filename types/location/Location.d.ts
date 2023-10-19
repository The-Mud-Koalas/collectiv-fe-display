interface EventLocation {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface LocationParticipationData {
    location_id: string;
    participation_data: {
        volunteers_count_in_location: number;
        participants_in_location: number;
        contributors_in_location: number;
    }
}

interface LocationProjectGoalsData {
    location_id: string;
    contribution_data: {
        measurement_unit: string;
        goal_kind: string;
        total_contribution: number;
    }[];
}

interface LocationRatingData {
    location_id: string;
    average_rating: number;
}

interface LocationSentimentData {
    location_id: string;
    average_sentiment_score: number;
}

interface LocationEventData {
    location_id: string;
    event_count_data: {
        num_of_events_in_location: number;
        num_of_initiatives_in_location: number;
        num_of_projects_in_location: number;
    }
}