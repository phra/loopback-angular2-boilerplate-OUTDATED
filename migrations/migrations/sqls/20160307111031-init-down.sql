/* Replace with your SQL commands */

DO
$func$
BEGIN
   RAISE NOTICE '%', 
  (SELECT 'DROP TABLE IF EXISTS '
       || string_agg(quote_ident(schemaname) || '.' || quote_ident(tablename), ', ')
       || ' CASCADE'
   FROM   pg_tables
   WHERE  schemaname = 'public'
   AND tablename <> 'migrations'
   -- AND tableowner = 'postgres' -- optionaly restrict to one user
   );

   EXECUTE
  (SELECT 'DROP TABLE IF EXISTS '
       || string_agg(quote_ident(schemaname) || '.' || quote_ident(tablename), ', ')
       || ' CASCADE'
   FROM   pg_tables
   WHERE  schemaname = 'public'
   AND tablename <> 'migrations'
   -- AND tableowner = 'postgres' -- optionaly restrict to one user
   );
END
$func$;