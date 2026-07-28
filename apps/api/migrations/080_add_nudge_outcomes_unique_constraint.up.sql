-- Guards RecordOutcome against concurrent duplicate webhooks: without this,
-- two racing calls could both pass the "no existing outcome row" SELECT and
-- insert two rows for the same (dispatch_id, outcome_type).
ALTER TABLE nudge_outcomes ADD CONSTRAINT nudge_outcomes_dispatch_type_unique UNIQUE (dispatch_id, outcome_type);
