-- Follow-up to 075: validates the NOT VALID constraint added there. This
-- scans the table but only needs SHARE UPDATE EXCLUSIVE (concurrent reads
-- and writes proceed), unlike adding+validating a CHECK constraint in one
-- statement, which holds ACCESS EXCLUSIVE for the whole scan.
ALTER TABLE vault_transactions VALIDATE CONSTRAINT vault_transactions_type_check;
