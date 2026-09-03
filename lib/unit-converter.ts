
// UnitCategory
export type UnitCategory =
    | "length"
    | "weight"
    | "temperature"
    | "volume"
    | "time"
    | "area"
    | "speed"
    | "digital";

export type UnitDefinition = {
    id: string;
    label: string;
    symbol: string;
};

export type UnitCategoryDefinition = {
    id: UnitCategory;
    label: string;
    units: UnitDefinition[];
};

export const unitCategories: UnitCategoryDefinition[] = [
    {
        id: "length",
        label: "طول",
        units: [
            { id: "millimeter", label: "میلی‌متر", symbol: "mm" },
            { id: "centimeter", label: "سانتی‌متر", symbol: "cm" },
            { id: "meter", label: "متر", symbol: "m" },
            { id: "kilometer", label: "کیلومتر", symbol: "km" },
            { id: "inch", label: "اینچ", symbol: "in" },
            { id: "foot", label: "فوت", symbol: "ft" },
            { id: "yard", label: "یارد", symbol: "yd" },
            { id: "mile", label: "مایل", symbol: "mi" },
        ],
    },

    {
        id: "weight",
        label: "وزن",
        units: [
            { id: "milligram", label: "میلی‌گرم", symbol: "mg" },
            { id: "gram", label: "گرم", symbol: "g" },
            { id: "kilogram", label: "کیلوگرم", symbol: "kg" },
            { id: "ton", label: "تن", symbol: "t" },
            { id: "ounce", label: "اونس", symbol: "oz" },
            { id: "pound", label: "پوند", symbol: "lb" },
        ],
    },

    {
        id: "temperature",
        label: "دما",
        units: [
            { id: "celsius", label: "سلسیوس", symbol: "°C" },
            { id: "fahrenheit", label: "فارنهایت", symbol: "°F" },
            { id: "kelvin", label: "کلوین", symbol: "K" },
        ],
    },

    {
        id: "volume",
        label: "حجم",
        units: [
            { id: "milliliter", label: "میلی‌لیتر", symbol: "ml" },
            { id: "liter", label: "لیتر", symbol: "L" },
            { id: "cubicMeter", label: "متر مکعب", symbol: "m³" },
            { id: "gallon", label: "گالن", symbol: "gal" },
            { id: "cup", label: "پیمانه", symbol: "cup" },
        ],
    },

    {
        id: "time",
        label: "زمان",
        units: [
            { id: "millisecond", label: "میلی‌ثانیه", symbol: "ms" },
            { id: "second", label: "ثانیه", symbol: "s" },
            { id: "minute", label: "دقیقه", symbol: "min" },
            { id: "hour", label: "ساعت", symbol: "h" },
            { id: "day", label: "روز", symbol: "day" },
            { id: "week", label: "هفته", symbol: "week" },
        ],
    },

    {
        id: "area",
        label: "مساحت",
        units: [
            { id: "squareMeter", label: "متر مربع", symbol: "m²" },
            { id: "squareKilometer", label: "کیلومتر مربع", symbol: "km²" },
            { id: "hectare", label: "هکتار", symbol: "ha" },
            { id: "squareFoot", label: "فوت مربع", symbol: "ft²" },
            { id: "squareMile", label: "مایل مربع", symbol: "mi²" },
        ],
    },

    {
        id: "speed",
        label: "سرعت",
        units: [
            { id: "meterPerSecond", label: "متر بر ثانیه", symbol: "m/s" },
            { id: "kilometerPerHour", label: "کیلومتر بر ساعت", symbol: "km/h" },
            { id: "milePerHour", label: "مایل بر ساعت", symbol: "mph" },
        ],
    },

    {
        id: "digital",
        label: "حافظه دیجیتال",
        units: [
            { id: "bit", label: "بیت", symbol: "bit" },
            { id: "byte", label: "بایت", symbol: "B" },
            { id: "kilobyte", label: "کیلوبایت", symbol: "KB" },
            { id: "megabyte", label: "مگابایت", symbol: "MB" },
            { id: "gigabyte", label: "گیگابایت", symbol: "GB" },
            { id: "terabyte", label: "ترابایت", symbol: "TB" },
        ],
    },
];

//UnitDefinition
const conversionFactors: Record<
    Exclude<UnitCategory, "temperature">,
    Record<string, number>
> = {
    length: {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344,
    },

    weight: {
        milligram: 0.000001,
        gram: 0.001,
        kilogram: 1,
        ton: 1000,
        ounce: 0.028349523125,
        pound: 0.45359237,
    },

    volume: {
        milliliter: 0.001,
        liter: 1,
        cubicMeter: 1000,
        gallon: 3.785411784,
        cup: 0.2365882365,
    },

    time: {
        millisecond: 0.001,
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
    },

    area: {
        squareMeter: 1,
        squareKilometer: 1_000_000,
        hectare: 10_000,
        squareFoot: 0.09290304,
        squareMile: 2_589_988.110336,
    },

    speed: {
        meterPerSecond: 1,
        kilometerPerHour: 0.2777777778,
        milePerHour: 0.44704,
    },

    digital: {
        bit: 1,
        byte: 8,
        kilobyte: 8_000,
        megabyte: 8_000_000,
        gigabyte: 8_000_000_000,
        terabyte: 8_000_000_000_000,
    },
};

//UnitCategoryDefinition
export function convertUnit(
    value: number,
    category: UnitCategory,
    fromUnit: string,
    toUnit: string
): number {
    if (!Number.isFinite(value)) {
        return 0;
    }

    if (fromUnit === toUnit) {
        return value;
    }

    if (category === "temperature") {
        return convertTemperature(value, fromUnit, toUnit);
    }

    const factors = conversionFactors[category];

    const fromFactor = factors[fromUnit];
    const toFactor = factors[toUnit];

    if (fromFactor === undefined || toFactor === undefined) {
        return 0;
    }

    const baseValue = value * fromFactor;

    return baseValue / toFactor;
}

//unitCategories
function convertTemperature(
    value: number,
    fromUnit: string,
    toUnit: string
): number {
    let celsius: number;

    switch (fromUnit) {
        case "celsius":
            celsius = value;
            break;

        case "fahrenheit":
            celsius = (value - 32) * (5 / 9);
            break;

        case "kelvin":
            celsius = value - 273.15;
            break;

        default:
            return 0;
    }

    switch (toUnit) {
        case "celsius":
            return celsius;

        case "fahrenheit":
            return celsius * (9 / 5) + 32;

        case "kelvin":
            return celsius + 273.15;

        default:
            return 0;
    }
}