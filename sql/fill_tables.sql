-- Set params
SET SESSION my.number_of_sales = '200';
SET SESSION my.number_of_users = '500';
SET SESSION my.number_of_products = '300';
SET SESSION my.number_of_stores = '500';
SET SESSION my.number_of_countries = '100';
SET SESSION my.number_of_cities = '30';
SET SESSION my.status_names = '5';
SET SESSION my.start_date = '2019-01-01 00:00:00';
SET SESSION my.end_date = '2020-02-01 00:00:00';

-- load the pgcrypto
CREATE EXTENSION pgcrypto;

-- random_between
 CREATE OR REPLACE FUNCTION random_between(low INT ,high INT)
    RETURNS INT AS
 $$
 BEGIN
    RETURN floor(random() * (high-low + 1) + low);
 END;
 $$ LANGUAGE 'plpgsql' STRICT;

-- random_text
CREATE OR REPLACE FUNCTION random_text(INTEGER)
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT UPPER(
    SUBSTRING(
      (SELECT string_agg(md5(random()::TEXT), '')
       FROM generate_series(
           1,
           CEIL($1 / 32.)::INTEGER)
       ), 1, $1) );
$$;

-- random_choice
CREATE OR REPLACE FUNCTION random_choice(
    choices text[]
)
RETURNS text AS $$
DECLARE
    size_ int;
BEGIN
    size_ = array_length(choices, 1);
    RETURN (choices)[floor(random()*size_)+1];
END
 $$ LANGUAGE 'plpgsql' STRICT;


-- Filling of products
INSERT INTO product
SELECT id, concat('Product ', id)
FROM GENERATE_SERIES(1, current_setting('my.number_of_products')::INT) AS id;

-- Filling of countries
INSERT INTO country
SELECT id, concat('Country ', id)
FROM GENERATE_SERIES(1, current_setting('my.number_of_countries')::INT) AS id;

-- Filling of cities
INSERT INTO city
SELECT id
	, concat('City ', id)
	, floor(random() * (current_setting('my.number_of_countries')::INT) + 1)::INT
FROM GENERATE_SERIES(1, current_setting('my.number_of_cities')::INT) AS id;

-- Filling of stores
INSERT INTO store
SELECT id
	, concat('Store ', id)
	, floor(random() * (current_setting('my.number_of_cities')::INT) + 1)::INT
FROM GENERATE_SERIES(1, current_setting('my.number_of_stores')::INT) AS id;

-- Filling of users
INSERT INTO users
SELECT id
  , random_choice(array['George', 'Anderson', 'Smith', 'Iverson', 'Henery', 'Oliver', 'Benjamin', 'Alexander', 'Noah'])
  , random_choice(array['Taylor', 'Jackson', 'Thompson', 'Harris', 'Garcia', 'Hernandez', 'Williams', 'Clark', 'Davis'])
  , crypt('password', gen_salt('bf'))
  , random_between(0,1)
  , random_text(42)
  , random_between(0,1)
  , random_between(0,1)
  , random_between(1, 300)
  , random_between(1, 300)
FROM GENERATE_SERIES(1, current_setting('my.number_of_users')::INT) AS id;

-- Filling of users
INSERT INTO status_name
SELECT status_name_id
	, concat('Status Name ', status_name_id)
FROM GENERATE_SERIES(1, current_setting('my.status_names')::INT) AS status_name_id;

-- Filling of sales
INSERT INTO sale
SELECT gen_random_uuid ()
	, round(CAST(float8 (random() * 10000) AS NUMERIC), 3)
	, TO_TIMESTAMP(start_date, 'YYYY-MM-DD HH24:MI:SS') +
		random() * (TO_TIMESTAMP(end_date, 'YYYY-MM-DD HH24:MI:SS')
							- TO_TIMESTAMP(start_date, 'YYYY-MM-DD HH24:MI:SS'))
	, floor(random() * (current_setting('my.number_of_products')::INT) + 1)::INT
	, floor(random() * (current_setting('my.number_of_users')::INT) + 1)::INT
	, floor(random() * (current_setting('my.number_of_stores')::INT) + 1)::INT
FROM GENERATE_SERIES(1, current_setting('my.number_of_sales')::INT) AS id
	, current_setting('my.start_date') AS start_date
	, current_setting('my.end_date') AS end_date;

-- Filling of order_status
INSERT INTO order_status
SELECT gen_random_uuid ()
	, date_sale + random()* (date_sale + '5 days' - date_sale)
	, sale_id
	, floor(random() * (current_setting('my.status_names')::INT) + 1)::INT
FROM sale;
