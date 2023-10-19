interface ForumPost {
    id: string;
    content: string;
    author: string;
    author_name: string | null;
    author_role: 'participant' | 'volunteer' | 'contributor' | 'creator';
    forum: string;
    posted_at: string;
    is_anonymous: boolean;
    vote_count: number;
    upvoters: string[];
    downvoters: string[];
}

type NamedEntity = { word: string, count: number }

interface ForumTopWords {
    PER?: NamedEntity[];
    ORG?: NamedEntity[];
    LOC?: NamedEntity[];
    MISC?: NamedEntity[];
}

interface ForumAnalytics {
    sentiment_score: number | null;
    top_words: ForumTopWords;
    num_posts: number;
    num_trending_posts: number;
}

interface TrendingForums {
    'event_id': string,
    'event_name': string,
    'event_location_id': string,
    'event_location_name': string,
    'forum_top_words': ForumTopWords,
    'forum_trending_posts': ForumPost[],
}

type GlobalForum = TrendingForums[]