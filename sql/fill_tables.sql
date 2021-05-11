-- Set params
SET SESSION my.number_of_sales = '200';
SET SESSION my.number_of_users = '500';
SET SESSION my.number_of_products = '300';
SET SESSION my.number_of_stores = '500';
SET SESSION my.number_of_coutries = '100';
SET SESSION my.number_of_cities = '30';
SET SESSION my.status_names = '5';
SET SESSION my.start_date = '2019-01-01 00:00:00';
SET SESSION my.end_date = '2020-02-01 00:00:00';

-- load the pgcrypto extension to gen_random_uuid ()
CREATE EXTENSION pgcrypto;

-- Filling of products
INSERT INTO product
SELECT id, concat('Product ', id)
FROM GENERATE_SERIES(1, current_setting('my.number_of_products')::INT) AS id;

-- Filling of countries
INSERT INTO country
SELECT id, concat('Country ', id)
FROM GENERATE_SERIES(1, current_setting('my.number_of_coutries')::INT) AS id;

-- Filling of cities
INSERT INTO city
SELECT id
	, concat('City ', id)
	, floor(random() * (current_setting('my.number_of_coutries')::INT) + 1)::INT
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
	, concat('User ', id)
	, MD5(random()::text)
	, MD5(random()::text)
	, MD5(random()::text)
	, MD5(random()::text)
	, MD5(random()::text)
	, random_between(0,2)
	, MD5(random()::text)
	, random_between(0,1)
	, random_between(0,1)
	, MD5(random()::text)
	, MD5(random()::text)
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
