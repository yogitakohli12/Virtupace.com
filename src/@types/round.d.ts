interface IRound {
    round: number,
    tokens_allocated: number,
    round_target: number,
    price_per_token: string,
    percent_increase_from_last_round: string,
    percent_difference_to_listing_price: string,
    funds_raised_cumulative: string,
    percent_increase_next_round: string,
    is_active: boolean
}
