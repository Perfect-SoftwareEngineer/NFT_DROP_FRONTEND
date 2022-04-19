export type BasketballItemType = {
    id: number;
    title: string;
    traits: Array<any>;
};

export type SerumItemType = {
    id: number;
    title: string;
    desc: string;
};

export type MutantItemType = {
    id: number;
    title: string;
    desc: string;
};

export type WearableItemType = {
    id: number;
    type: number;
    url: string;
    title: string;
    desc: string;
};

export type RaffleWinnerItemType = {
    name: string;
    url: string;
    date: string;
    address: string;
    status: string;
};
