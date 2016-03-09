--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.11
-- Dumped by pg_dump version 9.3.11
-- Started on 2016-03-07 12:07:01 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 175 (class 1259 OID 16589)
-- Name: acl; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE acl (
    model character varying(1024),
    property character varying(1024),
    accesstype character varying(1024),
    permission character varying(1024),
    principaltype character varying(1024),
    principalid character varying(1024),
    id integer NOT NULL
);


--
-- TOC entry 173 (class 1259 OID 16585)
-- Name: acl_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE acl_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2076 (class 0 OID 0)
-- Dependencies: 173
-- Name: acl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE acl_id_seq OWNED BY acl.id;


--
-- TOC entry 177 (class 1259 OID 16594)
-- Name: role; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE role (
    id integer NOT NULL,
    name character varying(1024) NOT NULL,
    description character varying(1024),
    created timestamp with time zone,
    modified timestamp with time zone
);


--
-- TOC entry 174 (class 1259 OID 16587)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2080 (class 0 OID 0)
-- Dependencies: 174
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- TOC entry 187 (class 1259 OID 16649)
-- Name: rolemapping; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE rolemapping (
    id integer NOT NULL,
    principaltype character varying(1024),
    principalid character varying(1024),
    roleid integer
);


--
-- TOC entry 185 (class 1259 OID 16644)
-- Name: rolemapping_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE rolemapping_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2081 (class 0 OID 0)
-- Dependencies: 185
-- Name: rolemapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE rolemapping_id_seq OWNED BY rolemapping.id;


--
-- TOC entry 172 (class 1259 OID 16576)
-- Name: user; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE "user" (
    nome character varying(1024),
    cognome character varying(1024),
    telefono character varying(1024),
    ruolo integer NOT NULL,
    abilitato boolean NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    realm character varying(1024),
    username character varying(1024),
    password character varying(1024) NOT NULL,
    credentials character varying(1024),
    challenges character varying(1024),
    email character varying(1024) NOT NULL,
    emailverified boolean,
    verificationtoken character varying(1024),
    status character varying(1024),
    lastupdated timestamp with time zone,
    id integer NOT NULL
);


--
-- TOC entry 171 (class 1259 OID 16574)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2082 (class 0 OID 0)
-- Dependencies: 171
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 178 (class 1259 OID 16600)
-- Name: usercredential; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE usercredential (
    profile character varying(2048) NOT NULL,
    provider character varying(1024),
    authscheme character varying(1024),
    externalid character varying(1024),
    credentials character varying(1024),
    created timestamp with time zone,
    modified timestamp with time zone,
    id integer NOT NULL,
    userid integer
);


--
-- TOC entry 176 (class 1259 OID 16592)
-- Name: usercredential_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE usercredential_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2083 (class 0 OID 0)
-- Dependencies: 176
-- Name: usercredential_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE usercredential_id_seq OWNED BY usercredential.id;


--
-- TOC entry 188 (class 1259 OID 16656)
-- Name: useridentity; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE useridentity (
    profile character varying(2048) NOT NULL,
    provider character varying(1024),
    authscheme character varying(1024),
    externalid character varying(1024),
    credentials character varying(1024),
    created timestamp with time zone,
    modified timestamp with time zone,
    id integer NOT NULL,
    userid integer
);


--
-- TOC entry 184 (class 1259 OID 16642)
-- Name: useridentity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE useridentity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2084 (class 0 OID 0)
-- Dependencies: 184
-- Name: useridentity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE useridentity_id_seq OWNED BY useridentity.id;


--
-- TOC entry 1919 (class 2604 OID 16595)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY acl ALTER COLUMN id SET DEFAULT nextval('acl_id_seq'::regclass);


--
-- TOC entry 1920 (class 2604 OID 16608)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- TOC entry 1925 (class 2604 OID 16652)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY rolemapping ALTER COLUMN id SET DEFAULT nextval('rolemapping_id_seq'::regclass);


--
-- TOC entry 1918 (class 2604 OID 16579)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1921 (class 2604 OID 16604)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY usercredential ALTER COLUMN id SET DEFAULT nextval('usercredential_id_seq'::regclass);


--
-- TOC entry 1926 (class 2604 OID 16660)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY useridentity ALTER COLUMN id SET DEFAULT nextval('useridentity_id_seq'::regclass);


--
-- TOC entry 2056 (class 0 OID 16589)
-- Dependencies: 175
-- Data for Name: acl; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2085 (class 0 OID 0)
-- Dependencies: 173
-- Name: acl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('acl_id_seq', 1, false);


--
-- TOC entry 2058 (class 0 OID 16594)
-- Dependencies: 177
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO role VALUES (1, 'admin', NULL, '2016-03-07 12:00:02.724+01', '2016-03-07 12:00:02.724+01');
INSERT INTO role VALUES (2, 'cliente', NULL, '2016-03-07 12:00:02.729+01', '2016-03-07 12:00:02.729+01');
INSERT INTO role VALUES (3, 'fornitore', NULL, '2016-03-07 12:00:02.729+01', '2016-03-07 12:00:02.729+01');


--
-- TOC entry 2089 (class 0 OID 0)
-- Dependencies: 174
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('role_id_seq', 3, true);


--
-- TOC entry 2068 (class 0 OID 16649)
-- Dependencies: 187
-- Data for Name: rolemapping; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO rolemapping VALUES (1, 'USER', '1', 2);


--
-- TOC entry 2090 (class 0 OID 0)
-- Dependencies: 185
-- Name: rolemapping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('rolemapping_id_seq', 1, true);


--
-- TOC entry 2053 (class 0 OID 16576)
-- Dependencies: 172
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "user" VALUES ('Mario', 'Bianchi', '123-456789', 2, true, '2016-03-07 12:00:02.743+01', '2016-03-07 12:00:02.975+01', NULL, 'cliente', '$2a$10$BsNKjQC8YeDGQcxGMXlMeOzRdFduiUkRD8F38YKFzLtSa.A2bJA4y', NULL, NULL, 'cliente@test.xxx', NULL, NULL, NULL, NULL, 1);


--
-- TOC entry 2091 (class 0 OID 0)
-- Dependencies: 171
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_id_seq', 1, true);


--
-- TOC entry 2059 (class 0 OID 16600)
-- Dependencies: 178
-- Data for Name: usercredential; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2092 (class 0 OID 0)
-- Dependencies: 176
-- Name: usercredential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('usercredential_id_seq', 1, false);


--
-- TOC entry 2069 (class 0 OID 16656)
-- Dependencies: 188
-- Data for Name: useridentity; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2093 (class 0 OID 0)
-- Dependencies: 184
-- Name: useridentity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('useridentity_id_seq', 1, false);


--
-- TOC entry 1930 (class 2606 OID 16613)
-- Name: acl_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY acl
    ADD CONSTRAINT acl_pkey PRIMARY KEY (id);


--
-- TOC entry 1932 (class 2606 OID 16627)
-- Name: role_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 1942 (class 2606 OID 16668)
-- Name: rolemapping_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY rolemapping
    ADD CONSTRAINT rolemapping_pkey PRIMARY KEY (id);


--
-- TOC entry 1928 (class 2606 OID 16584)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 1934 (class 2606 OID 16622)
-- Name: usercredential_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY usercredential
    ADD CONSTRAINT usercredential_pkey PRIMARY KEY (id);


--
-- TOC entry 1944 (class 2606 OID 16672)
-- Name: useridentity_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY useridentity
    ADD CONSTRAINT useridentity_pkey PRIMARY KEY (id);


--
-- TOC entry 2075 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-03-07 12:07:01 CET

--
-- PostgreSQL database dump complete
--

