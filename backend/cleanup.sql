-- Delete old products that don't have the new fields populated
DELETE FROM products WHERE id IN (1,2,3,4,5);
