interface WidthDimension {
    width: number;
}

interface HeightDimension {
    height: number;
}

interface SvgProps {
    color: string;
    dimensions: WidthDimension | HeightDimension
}