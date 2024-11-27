const RATE = [
    "Tệ",
    "Kém",
    "Ổn",
    "Tốt",
    "Tuyệt vời"
];

export const RateToText = (rate) => {
    if(rate < 1) return RATE[0];
    if(rate < 2 && rate >= 1) return RATE[1];
    if(rate < 3 && rate >= 2) return RATE[2];
    if(rate < 4 && rate >= 3) return RATE[3];
    if(rate <= 5 && rate >= 4) return RATE[4];

    return "";
}

