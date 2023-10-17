const numericValidator = (message: string) => (v: string) =>
  !isNaN(Number(v)) || message;

export { numericValidator };
