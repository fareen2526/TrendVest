-- Remove symbol and purchase_date columns from investments table
ALTER TABLE investments
DROP COLUMN symbol,
DROP COLUMN purchase_date; 