interface SelectOption<T> {
    label: string;
    value: T;
    __isNew__?: boolean;
}