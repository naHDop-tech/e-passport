-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

INSERT INTO "classes" VALUES
    ('Draft', 'Waiting for verify confirmation from user');
INSERT INTO "classes" VALUES
    ('Base', 'Confirmed user');
INSERT INTO "classes" VALUES
    ('Full', 'User have added all additional info, like phone, address, passport data and ready to get the NFT');
INSERT INTO "classes" VALUES
    ('Nft', 'User have got the NFT');

INSERT INTO "user_sex" VALUES
    ('Male');
INSERT INTO "user_sex" VALUES
    ('Female');
INSERT INTO "user_sex" VALUES
    ('It');
INSERT INTO "user_sex" VALUES
    ('Unset');

INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (0,'UT','UTO','Utopian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (4,'AF','AFG','Afghan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (248,'AX','ALA','Åland Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (8,'AL','ALB','Albanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (12,'DZ','DZA','Algerian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (16,'AS','ASM','American Samoan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (20,'AD','AND','Andorran');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (24,'AO','AGO','Angolan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (660,'AI','AIA','Anguillan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (10,'AQ','ATA','Antarctic');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (28,'AG','ATG','Antiguan or Barbudan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (32,'AR','ARG','Argentine');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (51,'AM','ARM','Armenian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (533,'AW','ABW','Aruban');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (36,'AU','AUS','Australian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (40,'AT','AUT','Austrian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (31,'AZ','AZE','Azerbaijani, Azeri');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (44,'BS','BHS','Bahamian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (48,'BH','BHR','Bahraini');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (50,'BD','BGD','Bangladeshi');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (52,'BB','BRB','Barbadian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (112,'BY','BLR','Belarusian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (56,'BE','BEL','Belgian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (84,'BZ','BLZ','Belizean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (204,'BJ','BEN','Beninese, Beninois');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (60,'BM','BMU','Bermudian, Bermudan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (64,'BT','BTN','Bhutanese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (68,'BO','BOL','Bolivian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (535,'BQ','BES','Bonaire');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (70,'BA','BIH','Bosnian or Herzegovinian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (72,'BW','BWA','Motswana, Botswanan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (74,'BV','BVT','Bouvet Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (76,'BR','BRA','Brazilian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (86,'IO','IOT','BIOT');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (96,'BN','BRN','Bruneian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (100,'BG','BGR','Bulgarian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (854,'BF','BFA','Burkinabé');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (108,'BI','BDI','Burundian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (132,'CV','CPV','Cabo Verdean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (116,'KH','KHM','Cambodian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (120,'CM','CMR','Cameroonian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (124,'CA','CAN','Canadian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (136,'KY','CYM','Caymanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (140,'CF','CAF','Central African');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (148,'TD','TCD','Chadian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (152,'CL','CHL','Chilean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (156,'CN','CHN','Chinese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (162,'CX','CXR','Christmas Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (166,'CC','CCK','Cocos Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (170,'CO','COL','Colombian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (174,'KM','COM','Comoran, Comorian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (178,'CG','COG','Congolese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (180,'CD','COD','Congolese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (184,'CK','COK','Cook Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (188,'CR','CRI','Costa Rican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (384,'CI','CIV','Ivorian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (191,'HR','HRV','Croatian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (192,'CU','CUB','Cuban');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (531,'CW','CUW','Curaçaoan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (196,'CY','CYP','Cypriot');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (203,'CZ','CZE','Czech');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (208,'DK','DNK','Danish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (262,'DJ','DJI','Djiboutian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (212,'DM','DMA','Dominican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (214,'DO','DOM','Dominican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (218,'EC','ECU','Ecuadorian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (818,'EG','EGY','Egyptian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (222,'SV','SLV','Salvadoran');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (226,'GQ','GNQ','Equatorial Guinean, Equatoguinean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (232,'ER','ERI','Eritrean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (233,'EE','EST','Estonian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (231,'ET','ETH','Ethiopian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (238,'FK','FLK','Falkland Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (234,'FO','FRO','Faroese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (242,'FJ','FJI','Fijian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (246,'FI','FIN','Finnish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (250,'FR','FRA','French');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (254,'GF','GUF','French Guianese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (258,'PF','PYF','French Polynesian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (260,'TF','ATF','French Southern Territories');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (266,'GA','GAB','Gabonese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (270,'GM','GMB','Gambian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (268,'GE','GEO','Georgian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (276,'DE','DEU','German');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (288,'GH','GHA','Ghanaian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (292,'GI','GIB','Gibraltar');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (300,'GR','GRC','Greek, Hellenic');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (304,'GL','GRL','Greenlandic');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (308,'GD','GRD','Grenadian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (312,'GP','GLP','Guadeloupe');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (316,'GU','GUM','Guamanian, Guambat');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (320,'GT','GTM','Guatemalan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (831,'GG','GGY','Channel Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (324,'GN','GIN','Guinean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (624,'GW','GNB','Bissau-Guinean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (328,'GY','GUY','Guyanese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (332,'HT','HTI','Haitian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (334,'HM','HMD','Heard Island or McDonald Islands');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (336,'VA','VAT','Vatican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (340,'HN','HND','Honduran');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (344,'HK','HKG','Hong Kong, Hong Kongese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (348,'HU','HUN','Hungarian, Magyar');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (352,'IS','ISL','Icelandic');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (356,'IN','IND','Indian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (360,'ID','IDN','Indonesian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (364,'IR','IRN','Iranian, Persian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (368,'IQ','IRQ','Iraqi');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (372,'IE','IRL','Irish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (833,'IM','IMN','Manx');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (376,'IL','ISR','Israeli');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (380,'IT','ITA','Italian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (388,'JM','JAM','Jamaican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (392,'JP','JPN','Japanese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (832,'JE','JEY','Channel Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (400,'JO','JOR','Jordanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (398,'KZ','KAZ','Kazakhstani, Kazakh');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (404,'KE','KEN','Kenyan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (296,'KI','KIR','I-Kiribati');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (408,'KP','PRK','North Korean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (410,'KR','KOR','South Korean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (414,'KW','KWT','Kuwaiti');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (417,'KG','KGZ','Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (418,'LA','LAO','Lao, Laotian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (428,'LV','LVA','Latvian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (422,'LB','LBN','Lebanese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (426,'LS','LSO','Basotho');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (430,'LR','LBR','Liberian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (434,'LY','LBY','Libyan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (438,'LI','LIE','Liechtenstein');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (440,'LT','LTU','Lithuanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (442,'LU','LUX','Luxembourg, Luxembourgish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (446,'MO','MAC','Macanese, Chinese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (807,'MK','MKD','Macedonian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (450,'MG','MDG','Malagasy');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (454,'MW','MWI','Malawian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (458,'MY','MYS','Malaysian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (462,'MV','MDV','Maldivian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (466,'ML','MLI','Malian, Malinese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (470,'MT','MLT','Maltese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (584,'MH','MHL','Marshallese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (474,'MQ','MTQ','Martiniquais, Martinican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (478,'MR','MRT','Mauritanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (480,'MU','MUS','Mauritian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (175,'YT','MYT','Mahoran');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (484,'MX','MEX','Mexican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (583,'FM','FSM','Micronesian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (498,'MD','MDA','Moldovan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (492,'MC','MCO','Monégasque, Monacan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (496,'MN','MNG','Mongolian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (499,'ME','MNE','Montenegrin');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (500,'MS','MSR','Montserratian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (504,'MA','MAR','Moroccan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (508,'MZ','MOZ','Mozambican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (104,'MM','MMR','Burmese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (516,'NA','NAM','Namibian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (520,'NR','NRU','Nauruan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (524,'NP','NPL','Nepali, Nepalese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (528,'NL','NLD','Dutch, Netherlandic');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (540,'NC','NCL','New Caledonian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (554,'NZ','NZL','New Zealand, NZ');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (558,'NI','NIC','Nicaraguan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (562,'NE','NER','Nigerien');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (566,'NG','NGA','Nigerian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (570,'NU','NIU','Niuean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (574,'NF','NFK','Norfolk Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (580,'MP','MNP','Northern Marianan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (578,'NO','NOR','Norwegian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (512,'OM','OMN','Omani');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (586,'PK','PAK','Pakistani');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (585,'PW','PLW','Palauan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (275,'PS','PSE','Palestinian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (591,'PA','PAN','Panamanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (598,'PG','PNG','Papua New Guinean, Papuan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (600,'PY','PRY','Paraguayan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (604,'PE','PER','Peruvian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (608,'PH','PHL','Philippine, Filipino');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (612,'PN','PCN','Pitcairn Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (616,'PL','POL','Polish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (620,'PT','PRT','Portuguese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (630,'PR','PRI','Puerto Rican');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (634,'QA','QAT','Qatari');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (638,'RE','REU','Réunionese, Réunionnais');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (642,'RO','ROU','Romanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (643,'RU','RUS','Russian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (646,'RW','RWA','Rwandan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (652,'BL','BLM','Barthélemois');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (654,'SH','SHN','Saint Helenian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (659,'KN','KNA','Kittitian or Nevisian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (662,'LC','LCA','Saint Lucian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (663,'MF','MAF','Saint-Martinoise');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (666,'PM','SPM','Saint-Pierrais or Miquelonnais');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (670,'VC','VCT','Saint Vincentian, Vincentian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (882,'WS','WSM','Samoan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (674,'SM','SMR','Sammarinese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (678,'ST','STP','São Toméan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (682,'SA','SAU','Saudi, Saudi Arabian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (686,'SN','SEN','Senegalese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (688,'RS','SRB','Serbian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (690,'SC','SYC','Seychellois');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (694,'SL','SLE','Sierra Leonean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (702,'SG','SGP','Singaporean');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (534,'SX','SXM','Sint Maarten');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (703,'SK','SVK','Slovak');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (705,'SI','SVN','Slovenian, Slovene');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (90,'SB','SLB','Solomon Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (706,'SO','SOM','Somali, Somalian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (710,'ZA','ZAF','South African');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (239,'GS','SGS','South Georgia or South Sandwich Islands');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (728,'SS','SSD','South Sudanese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (724,'ES','ESP','Spanish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (144,'LK','LKA','Sri Lankan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (729,'SD','SDN','Sudanese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (740,'SR','SUR','Surinamese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (744,'SJ','SJM','Svalbard');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (748,'SZ','SWZ','Swazi');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (752,'SE','SWE','Swedish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (756,'CH','CHE','Swiss');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (760,'SY','SYR','Syrian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (158,'TW','TWN','Chinese, Taiwanese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (762,'TJ','TJK','Tajikistani');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (834,'TZ','TZA','Tanzanian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (764,'TH','THA','Thai');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (626,'TL','TLS','Timorese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (768,'TG','TGO','Togolese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (772,'TK','TKL','Tokelauan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (776,'TO','TON','Tongan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (780,'TT','TTO','Trinidadian or Tobagonian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (788,'TN','TUN','Tunisian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (792,'TR','TUR','Turkish');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (795,'TM','TKM','Turkmen');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (796,'TC','TCA','Turks and Caicos Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (798,'TV','TUV','Tuvaluan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (800,'UG','UGA','Ugandan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (804,'UA','UKR','Ukrainian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (784,'AE','ARE','Emirati, Emirian, Emiri');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (826,'GB','GBR','British, UK');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (581,'UM','UMI','American');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (840,'US','USA','American');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (858,'UY','URY','Uruguayan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (860,'UZ','UZB','Uzbekistani, Uzbek');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (548,'VU','VUT','Ni-Vanuatu, Vanuatuan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (862,'VE','VEN','Venezuelan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (704,'VN','VNM','Vietnamese');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (92,'VG','VGB','British Virgin Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (850,'VI','VIR','U.S. Virgin Island');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (876,'WF','WLF','Wallis and Futuna, Wallisian or Futunan');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (732,'EH','ESH','Sahrawi, Sahrawian, Sahraouian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (887,'YE','YEM','Yemeni');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (894,'ZM','ZMB','Zambian');
INSERT INTO "nationalities" (code,alpha_2,alpha_3,nationality) VALUES (716,'ZW','ZWE','Zimbabwean');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
