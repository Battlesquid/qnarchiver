import ms from "ms";

const units = [
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year"
] as const;

export type DateUnits = typeof units[number];

export type AgoString = `${number} ${DateUnits} ago`;

export type FloorOptions = {
    constrainToMonth: boolean
}

const minutefloor = (date: Date) => {
    const copy = new Date(date);
    copy.setSeconds(0);
    copy.setMilliseconds(0);
    return copy;
}

const hourfloor = (date: Date) => {
    const copy = new Date(date);
    copy.setMinutes(0);
    return minutefloor(copy);
}

const dayfloor = (date: Date) => {
    const copy = new Date(date);
    copy.setHours(0);
    return hourfloor(copy);
}

const weekfloor = (date: Date, opt: FloorOptions = { constrainToMonth: false }) => {
    const copy = new Date(date);
    if (!opt.constrainToMonth) {
        const offset = 0 - copy.getDay();
        copy.setDate(copy.getDate() + offset);
    }
    return dayfloor(copy);
}

const monthfloor = (date: Date) => {
    const copy = new Date(date);
    copy.setDate(1);
    return weekfloor(copy, { constrainToMonth: true });
}

const yearfloor = (date: Date) => {
    const copy = new Date(date);
    copy.setMonth(0);
    return monthfloor(copy);
}

const floordate = (unit: DateUnits, date: Date) => ({
    "minute": minutefloor(date),
    "hour": hourfloor(date),
    "day": dayfloor(date),
    "week": weekfloor(date),
    "month": monthfloor(date),
    "year": yearfloor(date)
})[unit];

export const yyyymmdd = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthPadding = month < 10 ? "0" : "";
    const day = date.getDate();
    const dayPadding = day < 10 ? "0" : "";
    return `${year}-${monthPadding}${month}-${dayPadding}${day}`;
}

export const ago = (input: AgoString) => {
    const regex = new RegExp(`(?<val>\\d+) (?<unit>${units.join("|")})s? ago`);
    const match = input.match(regex);
    if (!match) {
        throw Error(`"${input}" must match the format [value] [unit] ago (eg, 1 month ago)`);
    }

    const value = parseInt(match.groups!.val);
    const unit = match.groups!.unit as DateUnits;

    let createdDate;
    const now = new Date(Date.now());

    if (unit === "month") {
        now.setMonth(now.getMonth() - value);
        createdDate = floordate("month", now);
    } else {
        const offset = ms(`${value} ${unit}`);
        const elapsed = now.getTime() - offset;
        createdDate = floordate(unit, new Date(elapsed));
    }
    return createdDate;
}
