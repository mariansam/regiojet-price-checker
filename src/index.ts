import { request } from './request.ts';
import { Route } from './types.ts';
import { REQUEST_URL, SEAT_CLASS, USE_CREDIT_PRICE, OUTPUT_FILE } from './config.ts';

const assert = (condition: any, msg: string, code: number) => {
    if (!condition) {
        console.error(msg);
        Deno.exit(code);
    }
};

const daysDifference = (startDate: Date, endDate: Date): number => {
    // clone them because of mutability
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffMs = end.getTime() - start.getTime();

    const diffDays = Math.ceil(diffMs / (1000*60*60*24));

    return diffDays;
};

const route = await request<Route>(REQUEST_URL, { headers: { 'X-Currency': 'CZK' }});

assert(route.bookable, 'The given route is not bookable, exiting', 1);

assert(route.freeSeatsCount > 0, 'The given route has less than one free seats, exiting', 2);

const priceClass = route.priceClasses.find(priceClass => priceClass.seatClassKey === SEAT_CLASS);

assert(priceClass, 'The given route doesnt contain the specified seat class, exiting', 3);

assert(priceClass!.bookable, 'The given seat class is not bookable, exiting', 4);

assert(priceClass!.freeSeatsCount > 0, 'The given seat class has less than one free seats, exiting', 5);

const price = USE_CREDIT_PRICE ? priceClass!.creditPrice : priceClass!.price;

const departureDate = new Date(route.departureTime);
const now = new Date();

const daysDiff = daysDifference(now, departureDate);

const line = `${daysDiff}\t${now.getHours()}:${now.getMinutes()}\t${price}\n`;

console.log(line);
await Deno.writeTextFile(OUTPUT_FILE, line, { append: true });
