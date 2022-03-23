export type Tariff = 'REGULAR' | 'CZECH_STUDENT_PASS_15' | 'CZECH_STUDENT_PASS_26';

/**
 * TRAIN_LOW_COST = Low cost
 * C0 = Standard
 * C1 = Relax
 * C2 = Business
 */
export type SeatClassKey = 'TRAIN_LOW_COST' | 'C0' | 'C1' | 'C2';

export type PriceClass = {
    seatClassKey: SeatClassKey,
    freeSeatsCount: number,
    price: number,
    creditPrice: number,
    bookable: boolean,
    // not all
};

export type Route = {
    id: string,
    departureTime: string,  // date-time
    freeSeatsCount: number,
    priceFrom: number,
    bookable: boolean,
    priceClasses: PriceClass[],
    // not all
};
