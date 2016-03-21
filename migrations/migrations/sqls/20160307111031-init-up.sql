--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.6
-- Dumped by pg_dump version 9.4.6
-- Started on 2016-03-20 04:23:37 CET

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
-- TOC entry 175 (class 1259 OID 17618)
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
-- TOC entry 176 (class 1259 OID 17624)
-- Name: acl_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE acl_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2125 (class 0 OID 0)
-- Dependencies: 176
-- Name: acl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE acl_id_seq OWNED BY acl.id;


--
-- TOC entry 177 (class 1259 OID 17626)
-- Name: fornitore; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE fornitore (
    nome character varying(1024) NOT NULL,
    telefono character varying(1024) NOT NULL,
    geopoint point NOT NULL,
    via character varying(1024) NOT NULL,
    completo character varying(1024) NOT NULL,
    civico character varying(1024) NOT NULL,
    piva character varying(1024) NOT NULL,
    citta character varying(1024) NOT NULL,
    provincia character varying(1024) NOT NULL,
    stato character varying(1024) NOT NULL,
    tipo integer NOT NULL,
    raggio integer NOT NULL,
    orari character varying(1024) NOT NULL,
    consegna numeric NOT NULL,
    minimo numeric NOT NULL,
    gratis integer NOT NULL,
    tz character varying(1024) NOT NULL,
    lang character varying(1024) NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    id integer NOT NULL,
    userid integer
);


--
-- TOC entry 178 (class 1259 OID 17632)
-- Name: fornitore_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE fornitore_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2126 (class 0 OID 0)
-- Dependencies: 178
-- Name: fornitore_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE fornitore_id_seq OWNED BY fornitore.id;


--
-- TOC entry 179 (class 1259 OID 17634)
-- Name: indirizzo; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE indirizzo (
    via character varying(1024) NOT NULL,
    civico character varying(1024) NOT NULL,
    geopoint point NOT NULL,
    cap character varying(1024),
    citta character varying(1024) NOT NULL,
    provincia character varying(1024) NOT NULL,
    stato character varying(1024) NOT NULL,
    completo character varying(1024) NOT NULL,
    campanello character varying(1024),
    piano character varying(1024),
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    id integer NOT NULL,
    userid integer
);


--
-- TOC entry 180 (class 1259 OID 17640)
-- Name: indirizzo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indirizzo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2127 (class 0 OID 0)
-- Dependencies: 180
-- Name: indirizzo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indirizzo_id_seq OWNED BY indirizzo.id;


--
-- TOC entry 194 (class 1259 OID 17720)
-- Name: item; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE item (
    name character varying(1024) NOT NULL,
    "desc" character varying(1024) NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    id integer NOT NULL
);


--
-- TOC entry 193 (class 1259 OID 17718)
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2128 (class 0 OID 0)
-- Dependencies: 193
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE item_id_seq OWNED BY item.id;


--
-- TOC entry 181 (class 1259 OID 17642)
-- Name: prodotto; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE prodotto (
    nome character varying(1024) NOT NULL,
    descrizione character varying(1024) NOT NULL,
    categoria integer NOT NULL,
    abilitato boolean NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    id integer NOT NULL
);


--
-- TOC entry 182 (class 1259 OID 17648)
-- Name: prodotto_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE prodotto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2130 (class 0 OID 0)
-- Dependencies: 182
-- Name: prodotto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE prodotto_id_seq OWNED BY prodotto.id;


--
-- TOC entry 183 (class 1259 OID 17650)
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
-- TOC entry 184 (class 1259 OID 17656)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2131 (class 0 OID 0)
-- Dependencies: 184
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- TOC entry 185 (class 1259 OID 17658)
-- Name: rolemapping; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE rolemapping (
    id integer NOT NULL,
    principaltype character varying(1024),
    principalid character varying(1024),
    roleid integer
);


--
-- TOC entry 186 (class 1259 OID 17664)
-- Name: rolemapping_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE rolemapping_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2132 (class 0 OID 0)
-- Dependencies: 186
-- Name: rolemapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE rolemapping_id_seq OWNED BY rolemapping.id;


--
-- TOC entry 187 (class 1259 OID 17666)
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
-- TOC entry 188 (class 1259 OID 17672)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2133 (class 0 OID 0)
-- Dependencies: 188
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 189 (class 1259 OID 17674)
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
-- TOC entry 190 (class 1259 OID 17680)
-- Name: usercredential_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE usercredential_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2134 (class 0 OID 0)
-- Dependencies: 190
-- Name: usercredential_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE usercredential_id_seq OWNED BY usercredential.id;


--
-- TOC entry 191 (class 1259 OID 17682)
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
-- TOC entry 192 (class 1259 OID 17688)
-- Name: useridentity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE useridentity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2135 (class 0 OID 0)
-- Dependencies: 192
-- Name: useridentity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE useridentity_id_seq OWNED BY useridentity.id;


--
-- TOC entry 1956 (class 2604 OID 17690)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY acl ALTER COLUMN id SET DEFAULT nextval('acl_id_seq'::regclass);


--
-- TOC entry 1957 (class 2604 OID 17691)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY fornitore ALTER COLUMN id SET DEFAULT nextval('fornitore_id_seq'::regclass);


--
-- TOC entry 1958 (class 2604 OID 17692)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indirizzo ALTER COLUMN id SET DEFAULT nextval('indirizzo_id_seq'::regclass);


--
-- TOC entry 1965 (class 2604 OID 17723)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY item ALTER COLUMN id SET DEFAULT nextval('item_id_seq'::regclass);


--
-- TOC entry 1959 (class 2604 OID 17693)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY prodotto ALTER COLUMN id SET DEFAULT nextval('prodotto_id_seq'::regclass);


--
-- TOC entry 1960 (class 2604 OID 17694)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- TOC entry 1961 (class 2604 OID 17695)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY rolemapping ALTER COLUMN id SET DEFAULT nextval('rolemapping_id_seq'::regclass);


--
-- TOC entry 1962 (class 2604 OID 17696)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1963 (class 2604 OID 17697)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY usercredential ALTER COLUMN id SET DEFAULT nextval('usercredential_id_seq'::regclass);


--
-- TOC entry 1964 (class 2604 OID 17698)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY useridentity ALTER COLUMN id SET DEFAULT nextval('useridentity_id_seq'::regclass);


--
-- TOC entry 2099 (class 0 OID 17618)
-- Dependencies: 175
-- Data for Name: acl; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2136 (class 0 OID 0)
-- Dependencies: 176
-- Name: acl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('acl_id_seq', 1, false);


--
-- TOC entry 2101 (class 0 OID 17626)
-- Dependencies: 177
-- Data for Name: fornitore; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2137 (class 0 OID 0)
-- Dependencies: 178
-- Name: fornitore_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('fornitore_id_seq', 1, false);


--
-- TOC entry 2103 (class 0 OID 17634)
-- Dependencies: 179
-- Data for Name: indirizzo; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO indirizzo VALUES ('Via Don Giovanni Minzoni', '13', '(11.3370161999999937,44.5027980999999997)', NULL, 'Bologna', 'Bo', 'Italia', 'Via Don Giovanni Minzoni, 13, Bologna, BO, Italia', 'Rossi Mario', NULL, '2016-03-07 12:00:02.994+01', '2016-03-07 12:00:02.994+01', 1, 1);


--
-- TOC entry 2138 (class 0 OID 0)
-- Dependencies: 180
-- Name: indirizzo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('indirizzo_id_seq', 1, true);


--
-- TOC entry 2118 (class 0 OID 17720)
-- Dependencies: 194
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO item VALUES ('item1', 'desc1', '2016-03-20 01:00:00+01', '2016-03-20 04:21:53.591+01', 1);
INSERT INTO item VALUES ('item2', 'desc2', '2016-03-20 01:00:00+01', '2016-03-20 04:22:21.507+01', 2);
INSERT INTO item VALUES ('item3', 'desc3', '2016-03-20 01:00:00+01', '2016-03-20 04:22:28.874+01', 3);
INSERT INTO item VALUES ('item4', 'desc4', '2016-03-20 01:00:00+01', '2016-03-20 04:22:31.688+01', 4);
INSERT INTO item VALUES ('item5', 'desc5', '2016-03-20 01:00:00+01', '2016-03-20 04:22:35.791+01', 5);


--
-- TOC entry 2139 (class 0 OID 0)
-- Dependencies: 193
-- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('item_id_seq', 5, true);


--
-- TOC entry 2105 (class 0 OID 17642)
-- Dependencies: 181
-- Data for Name: prodotto; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2141 (class 0 OID 0)
-- Dependencies: 182
-- Name: prodotto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('prodotto_id_seq', 1, false);


--
-- TOC entry 2107 (class 0 OID 17650)
-- Dependencies: 183
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO role VALUES (1, 'admin', NULL, '2016-03-07 12:00:02.724+01', '2016-03-07 12:00:02.724+01');
INSERT INTO role VALUES (2, 'cliente', NULL, '2016-03-07 12:00:02.729+01', '2016-03-07 12:00:02.729+01');
INSERT INTO role VALUES (3, 'fornitore', NULL, '2016-03-07 12:00:02.729+01', '2016-03-07 12:00:02.729+01');


--
-- TOC entry 2142 (class 0 OID 0)
-- Dependencies: 184
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('role_id_seq', 3, true);


--
-- TOC entry 2109 (class 0 OID 17658)
-- Dependencies: 185
-- Data for Name: rolemapping; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO rolemapping VALUES (1, 'USER', '1', 2);
INSERT INTO rolemapping VALUES (2, 'USER', '2', 1);


--
-- TOC entry 2143 (class 0 OID 0)
-- Dependencies: 186
-- Name: rolemapping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('rolemapping_id_seq', 2, true);


--
-- TOC entry 2111 (class 0 OID 17666)
-- Dependencies: 187
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "user" VALUES ('Mario', 'Bianchi', '123-456789', 2, true, '2016-03-07 12:00:02.743+01', '2016-03-07 12:00:02.975+01', NULL, 'gabriele', '$2a$10$BsNKjQC8YeDGQcxGMXlMeOzRdFduiUkRD8F38YKFzLtSa.A2bJA4y', NULL, NULL, 'cliente@test.xxx', NULL, NULL, NULL, NULL, 1);
INSERT INTO "user" VALUES ('Paolo', 'Rossi', '123-456789', 1, true, '2016-03-20 04:18:10.728+01', '2016-03-20 04:18:10.897+01', NULL, 'phra', '$2a$10$VngFr9UMkG2Ab/HYIJ3x0OM3X8wr8Y449T59NEY13pY7YfLERankS', NULL, NULL, 'asd@test.xxx', NULL, NULL, NULL, NULL, 2);


--
-- TOC entry 2144 (class 0 OID 0)
-- Dependencies: 188
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('user_id_seq', 2, true);


--
-- TOC entry 2113 (class 0 OID 17674)
-- Dependencies: 189
-- Data for Name: usercredential; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2145 (class 0 OID 0)
-- Dependencies: 190
-- Name: usercredential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('usercredential_id_seq', 1, false);


--
-- TOC entry 2115 (class 0 OID 17682)
-- Dependencies: 191
-- Data for Name: useridentity; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2146 (class 0 OID 0)
-- Dependencies: 192
-- Name: useridentity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('useridentity_id_seq', 1, false);


--
-- TOC entry 1969 (class 2606 OID 17700)
-- Name: acl_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY acl
    ADD CONSTRAINT acl_pkey PRIMARY KEY (id);


--
-- TOC entry 1971 (class 2606 OID 17702)
-- Name: fornitore_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY fornitore
    ADD CONSTRAINT fornitore_pkey PRIMARY KEY (id);


--
-- TOC entry 1973 (class 2606 OID 17704)
-- Name: indirizzo_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY indirizzo
    ADD CONSTRAINT indirizzo_pkey PRIMARY KEY (id);


--
-- TOC entry 1987 (class 2606 OID 17728)
-- Name: item_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- TOC entry 1975 (class 2606 OID 17706)
-- Name: prodotto_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY prodotto
    ADD CONSTRAINT prodotto_pkey PRIMARY KEY (id);


--
-- TOC entry 1977 (class 2606 OID 17708)
-- Name: role_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 1979 (class 2606 OID 17710)
-- Name: rolemapping_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY rolemapping
    ADD CONSTRAINT rolemapping_pkey PRIMARY KEY (id);


--
-- TOC entry 1981 (class 2606 OID 17712)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 1983 (class 2606 OID 17714)
-- Name: usercredential_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY usercredential
    ADD CONSTRAINT usercredential_pkey PRIMARY KEY (id);


--
-- TOC entry 1985 (class 2606 OID 17716)
-- Name: useridentity_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY useridentity
    ADD CONSTRAINT useridentity_pkey PRIMARY KEY (id);


--
-- TOC entry 2124 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-03-20 04:23:38 CET

--
-- PostgreSQL database dump complete
--

