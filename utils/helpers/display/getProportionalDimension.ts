type Dimension = WidthDimension | HeightDimension;

export const getProportionalDimension = (
  originalWidth: number,
  originalHeight: number
) => {
  const aspectRatio = originalWidth / originalHeight;

  const getWidth = (dimension: Dimension) =>
    (dimension as WidthDimension).width ??
    (dimension as HeightDimension).height * aspectRatio;

  const getHeight = (dimension: Dimension) =>
    (dimension as HeightDimension).height ??
    (dimension as WidthDimension).width / aspectRatio;

  return { getWidth, getHeight };
};
