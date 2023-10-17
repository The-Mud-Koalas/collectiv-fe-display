interface PaginatedResults<T> {
    current: number | null;
    next: number | null;
    previous: number | null;
    results: T;
    total_pages: number;
}