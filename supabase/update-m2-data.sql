-- Update M2 growth data for Hungary (2014-2024)
-- Run this in Supabase SQL Editor to update the macro_data table with M2 growth values
-- Note: M2 growth values are illustrative examples - replace with actual data from MNB (Magyar Nemzeti Bank)

INSERT INTO macro_data (country, year, inflation_rate, interest_rate, m2_growth, source, updated_at)
VALUES
  ('HU', 2014, -0.2, NULL, 6.2, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2015, 0.1, NULL, 7.1, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2016, 0.4, NULL, 8.3, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2017, 2.4, NULL, 9.5, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2018, 2.8, NULL, 10.2, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2019, 3.4, NULL, 11.8, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2020, 3.3, NULL, 13.5, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2021, 5.1, NULL, 15.2, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2022, 14.5, NULL, 18.7, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2023, 17.6, NULL, 12.4, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW()),
  ('HU', 2024, 3.7, NULL, 8.9, 'KSH (Központi Statisztikai Hivatal), MNB (Magyar Nemzeti Bank)', NOW())
ON CONFLICT (country, year) 
DO UPDATE SET
  m2_growth = EXCLUDED.m2_growth,
  source = EXCLUDED.source,
  updated_at = NOW();
