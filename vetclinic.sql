PGDMP     %    	                |         	   vetclinic    14.11    14.11 3    +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            .           1262    16394 	   vetclinic    DATABASE     m   CREATE DATABASE vetclinic WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE vetclinic;
                postgres    false            F           1247    16634    Gender    TYPE     \   CREATE TYPE public."Gender" AS ENUM (
    'Male',
    'Female',
    'male',
    'female'
);
    DROP TYPE public."Gender";
       public          postgres    false            �            1259    16658    Animal    TABLE     ]  CREATE TABLE public."Animal" (
    id integer NOT NULL,
    name text NOT NULL,
    species text NOT NULL,
    race text NOT NULL,
    gender public."Gender" NOT NULL,
    age text NOT NULL,
    "dateOfBirth" timestamp(3) without time zone NOT NULL,
    "ownerId" integer NOT NULL,
    "vetId" integer NOT NULL,
    "distinctiveQualities" text[]
);
    DROP TABLE public."Animal";
       public         heap    postgres    false    838            �            1259    16657    Animal_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Animal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Animal_id_seq";
       public          postgres    false    217            /           0    0    Animal_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Animal_id_seq" OWNED BY public."Animal".id;
          public          postgres    false    216            �            1259    33516    Appointment    TABLE     	  CREATE TABLE public."Appointment" (
    id integer NOT NULL,
    "ownerId" integer NOT NULL,
    "vetId" integer NOT NULL,
    "animalId" integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    description text NOT NULL,
    reason text NOT NULL
);
 !   DROP TABLE public."Appointment";
       public         heap    postgres    false            �            1259    33515    Appointment_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Appointment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Appointment_id_seq";
       public          postgres    false    219            0           0    0    Appointment_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Appointment_id_seq" OWNED BY public."Appointment".id;
          public          postgres    false    218            �            1259    16640    Owner    TABLE     �   CREATE TABLE public."Owner" (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "idCardNumber" text NOT NULL,
    city text NOT NULL,
    email text,
    "phoneNumber" text NOT NULL,
    address text NOT NULL,
    "lastName" text NOT NULL
);
    DROP TABLE public."Owner";
       public         heap    postgres    false            �            1259    16639    Owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Owner_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Owner_id_seq";
       public          postgres    false    213            1           0    0    Owner_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Owner_id_seq" OWNED BY public."Owner".id;
          public          postgres    false    212            �            1259    16409    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    firstname text,
    lastname text,
    "isAdmin" boolean DEFAULT false NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    16408    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    211            2           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    210            �            1259    16649    Vet    TABLE     �   CREATE TABLE public."Vet" (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    city text NOT NULL,
    address text NOT NULL,
    "lastName" text NOT NULL,
    "phoneNumber" text NOT NULL
);
    DROP TABLE public."Vet";
       public         heap    postgres    false            �            1259    16648 
   Vet_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Vet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public."Vet_id_seq";
       public          postgres    false    215            3           0    0 
   Vet_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public."Vet_id_seq" OWNED BY public."Vet".id;
          public          postgres    false    214            �            1259    16397    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            }           2604    16661 	   Animal id    DEFAULT     j   ALTER TABLE ONLY public."Animal" ALTER COLUMN id SET DEFAULT nextval('public."Animal_id_seq"'::regclass);
 :   ALTER TABLE public."Animal" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            ~           2604    33519    Appointment id    DEFAULT     t   ALTER TABLE ONLY public."Appointment" ALTER COLUMN id SET DEFAULT nextval('public."Appointment_id_seq"'::regclass);
 ?   ALTER TABLE public."Appointment" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            {           2604    16643    Owner id    DEFAULT     h   ALTER TABLE ONLY public."Owner" ALTER COLUMN id SET DEFAULT nextval('public."Owner_id_seq"'::regclass);
 9   ALTER TABLE public."Owner" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            y           2604    16412    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            |           2604    16652    Vet id    DEFAULT     d   ALTER TABLE ONLY public."Vet" ALTER COLUMN id SET DEFAULT nextval('public."Vet_id_seq"'::regclass);
 7   ALTER TABLE public."Vet" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            &          0    16658    Animal 
   TABLE DATA           �   COPY public."Animal" (id, name, species, race, gender, age, "dateOfBirth", "ownerId", "vetId", "distinctiveQualities") FROM stdin;
    public          postgres    false    217   �;       (          0    33516    Appointment 
   TABLE DATA           f   COPY public."Appointment" (id, "ownerId", "vetId", "animalId", date, description, reason) FROM stdin;
    public          postgres    false    219   LQ       "          0    16640    Owner 
   TABLE DATA           s   COPY public."Owner" (id, "firstName", "idCardNumber", city, email, "phoneNumber", address, "lastName") FROM stdin;
    public          postgres    false    213   iQ                  0    16409    User 
   TABLE DATA           _   COPY public."User" (id, username, email, password, firstname, lastname, "isAdmin") FROM stdin;
    public          postgres    false    211   �b       $          0    16649    Vet 
   TABLE DATA           Z   COPY public."Vet" (id, "firstName", city, address, "lastName", "phoneNumber") FROM stdin;
    public          postgres    false    215   �c                 0    16397    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    209   ]f       4           0    0    Animal_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Animal_id_seq"', 2, true);
          public          postgres    false    216            5           0    0    Appointment_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Appointment_id_seq"', 1, false);
          public          postgres    false    218            6           0    0    Owner_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Owner_id_seq"', 4, true);
          public          postgres    false    212            7           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 5, true);
          public          postgres    false    210            8           0    0 
   Vet_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public."Vet_id_seq"', 2, true);
          public          postgres    false    214            �           2606    16665    Animal Animal_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Animal"
    ADD CONSTRAINT "Animal_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Animal" DROP CONSTRAINT "Animal_pkey";
       public            postgres    false    217            �           2606    33523    Appointment Appointment_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Appointment" DROP CONSTRAINT "Appointment_pkey";
       public            postgres    false    219            �           2606    16647    Owner Owner_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Owner"
    ADD CONSTRAINT "Owner_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Owner" DROP CONSTRAINT "Owner_pkey";
       public            postgres    false    213            �           2606    16417    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    211            �           2606    16656    Vet Vet_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."Vet"
    ADD CONSTRAINT "Vet_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."Vet" DROP CONSTRAINT "Vet_pkey";
       public            postgres    false    215            �           2606    16405 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    209            �           1259    17572    Owner_email_key    INDEX     M   CREATE UNIQUE INDEX "Owner_email_key" ON public."Owner" USING btree (email);
 %   DROP INDEX public."Owner_email_key";
       public            postgres    false    213            �           1259    16419    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    211            �           1259    16418    User_username_key    INDEX     Q   CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);
 '   DROP INDEX public."User_username_key";
       public            postgres    false    211            �           2606    16666    Animal Animal_ownerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Animal"
    ADD CONSTRAINT "Animal_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Owner"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public."Animal" DROP CONSTRAINT "Animal_ownerId_fkey";
       public          postgres    false    217    3207    213            �           2606    16671    Animal Animal_vetId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Animal"
    ADD CONSTRAINT "Animal_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES public."Vet"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Animal" DROP CONSTRAINT "Animal_vetId_fkey";
       public          postgres    false    217    3209    215            �           2606    33534 %   Appointment Appointment_animalId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES public."Animal"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public."Appointment" DROP CONSTRAINT "Appointment_animalId_fkey";
       public          postgres    false    217    3211    219            �           2606    33524 $   Appointment Appointment_ownerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Owner"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public."Appointment" DROP CONSTRAINT "Appointment_ownerId_fkey";
       public          postgres    false    3207    213    219            �           2606    33529 "   Appointment Appointment_vetId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES public."Vet"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public."Appointment" DROP CONSTRAINT "Appointment_vetId_fkey";
       public          postgres    false    215    3209    219            &      x��Zˎ�Hv]S_����ߙY;��R��jU�n`�M$�I%��$�D	��{��7��/�97��(�mÀ������sϹ7��ƴ�_�j[eu���^5:H�$���q�<YΒ�*��#H��_~ҏ�A�Vwu����[3l���,	��K�74��h�4����?G�ۺij�ת^t��ٝ����n����O�?��g�t%Wi|�Qy���Q�����gi���Y�hl��ʪ��R3�k9���8y�T~��W�"�s����5�Vۯϲ��6v�������pgf��t�x�W�������m��t���,�U[�ߏ�fۨ�ҧk��,ќދ��U��o�����a����,u�}}Vou��kظU�U�/a�ԳJ�p��Q)�٢�yT�`�K�4Ȃ/����Ta�mm���V������~:"�g�V2��)�%�N��S��c�hU�m��鶃�wW7��^�O�+g�mn-W���>��}4u�և`ܫ=�7�r��V����>���H�q��@F4���3���^?�v:�uݶ<�)p1�>^���**��$���JW�(��Ш���M���H���७�^�c��l`����������6��ta����Ӂ�N��"ȃ/���X�nա�Ɔk�����)����N[�>达
XΘ��d�\�E��A�t}X��A՛6ԥi�~W����Y�B*(T�������h7_�����B�[N��0�9��HF"�7u�U���k��f����`�	I,AO�IqO�V������H#�����8]�>#y�/����@ZJcAc�ޘ��)�F�����O�W����^�����3�fu^�C��j�W�� L��� �4�A��s${������"8�ܸ�ŋ�,���;8�ҽ��P�®n70����n~�R��^sL���D����`�n�f�`,5�Up�^ә����b3Io�����u��+U�΢�ç�4�D"�Z�����]!��WL  ʏ�i�)^�E��܇	O3��?���w`m�f�'qp����E��f���A�Q	GF.���d�"J�8�loN���~3Hb&	d�*T
g�Ru��gol�mg?�B�����p�����Wi~���5*��aN��ZßU[w;���cZI#�e<g�ɘF�8���РڧX�4��ҫ��y�I�ɯ�8���~�`�)���A�u3a%�c�ڪ^7���Y�	�
��
�Hŉ���a94��w��q�#��e��u�Whߍ�]�̪?�Pʃ�,'X�뽱4"բ��o�7�n���Lp�2�/�8�d�+�
����8��V^zܡQ�����-L~������� �H�a|��}�=m.�ȡ����D��	8g�ח��s&���}�?D�@uSI=�����&0�j�&��Pl�3��"����+���kU�߅��>�p�5{�yK�?[=AŅ� �!��}52�+�E��.+��u݃����`/�����~��m�?#�E�ס�����A1^�� f)��S�E�z췞��� c�C���,�h7M�mg����؛K;Gf��-�V�T$
]v���,�U�n�ZI�4{B=�/�~vs�fs�9ݔ,P�A�`=u�]+��Cj
���;�vw؎�'�ĳ�B(LN3��\2 A{�i�~����7�Cfw���F���
���#�hĊD��)6�gMvE֬[�\�k�6�@M���Ԁ�3�{.����iӴ"-;���j`l�m�c�p����_062I�G,��Ax=x�Ђ��^om�����;\x�Ҭ���mN�D�')8r5�&��|�����㤏S@o궞��Og�H(�|GW$3�n`¶{�W�Wm�c���K]�&���֮'~%��4�\Liz�V#� d¬�5P����vI��[�u�/%�ҵ�M�_Y���zkf���X][�[S*# 8�į��� �p[���L� �('��#��yT�N]l.��x~��<����7�c��e>VBp�CM��2�2��1_�"�٫�e�g�`��>G|V+�ؒ��g,$ r!���~a��#p>R�zE�g	f@� ���Zsd��zqE��Y�Aa�A �����s���_ٙ6��o���~_��l����p���4��hC�h@�㟁������y�G��?�ժ�K�\{��l�s�.Dn.֜���������0S����m�=�� ��<��qQ�z�����6�!>(�����'�?���e���y�<Y�ӦsRSѭ��+�@��o@�7S�!BKL�
�B��������A!���AB^�<z|�7���vO�!�)��RX�?���I��PrjٓL/8��V�۳߿�G Z���sOX
i`K,��}��&\ ���G�ipk\Iܲt!T�E�UW7g�;%��ǒ��+]B����>��نl[0�/�])/�>S�B�[ۅ:%��R����D� ߼bv� ߓ<@�{�X&VKzsȐ0V`���p��{�nAO])ۡi� �MsD���L"�	�U
�J���}oa,āayNͬNj|Ku�	|�;e7ǁR�	=:� �h�H=פéz���M��gp�C]}G6��}��'��s/�\�Jr�U"Ȭ�|�D�B�t�y�J>\9�������z�qZ�ۯϊ(x���x��ֽ�^JiiN��	�9*�ȣ�G
����T��A�4ߟo�IB�K����	s���rXH��F�`$�[ h��?Oz�50]ti�.�˨�A���ơ��4�^���m��6�T �樌����Ys2hPBY��iPv��;����w��{�E-�s�ᩒS�ٙT2��_H4A�~�4ٰ�����P����ȃw5�·�2�_R�I�9ܝ���=��$�|he*�9Q�k����'n���w�Uf��V_7�H��υod�FN�_�h�p#:Љ�x�"�8i ��f`P5���ZdԈ�Z���-���	��т� ��C��ᆐ���\�h;��R����jK���*;�	�)8f@E���)B�*=\+�z~RQ.Aۍ:��R��rD�p�*��i��.st~?���I���Ͽ��?��z3���80�`����L�y,�[T�2�B��7����`|2�f���K�H� �X�Z.X������9^>ťm�G���j<զ�`��.$�[X"��A5�o���,�y�P=r����SLpD�2��RN���o��jR(V�}�H.��c/Gq}���/(�"�1�&����>��Qm´�c��G</$�pǧ�)rzV+|%����E�,Іc�n�K%.hk,�,�`^�ىl���/�:���-��y���`됺 �I!��H+����
\���z�tʽ��8i��ө�e��$1U��]Z½�y�Y=/�ȏ9�s!A5����`��%gXD~8&���ݙ�NG����σ4�Q��.|���n��W{�f�L��L��B
(G&��sY<��QF��5H�wd��0U���+&�s���tl�k��@:�63��n�9��LY!����� J�+��,�E6Q��P�s�N��/�ɡ�2ħ�R���9�"稧��v�}Ww�{3�!�,)�<�y��Y��RA�B�U���<�����e��D��!�Z�q�
gh���;P�˝�Ki�¸��� � �>�4ݠ�5<���E��|b�Kѭ���d �){r���}���ʯ��p��;5�H��J"y�s��H6����et4��V��8����U"ͥ2̨����Adk�t=�b� H���Ϙ���)"������\,�aI$+�O�j�s �e�lO�$�S�V����/��A�\6(Ha��9ڃ��S��	Ȧr�K9 �S��r�P�2� 6���RZ.3��j����i�mHٟ�Ltܒ��٦ABY4}�x�σ�|�u^���1�gB\�9�!s��́-H������� _
Z��jDbPZ�w��h�%�D,�T�� �%�cXYQ��9@{��Ɂ(�����T��U�9h�	G���t e����iK$b =  H�^,џT�w[�����<�F)�9��)&ë��y?Ip���ܙ��yA�ݨ1�;�2�_ȨQ�k��L#ٙku�0A�u���	'�b�(C��>�Ț��K~{�%j&j�����;qB���)B��^c�� ��p��2P�q����[�m~ 1ǔWق�ʹ�qbC������uvm@�* ~-���yƖPف�C��DS5�O��|W���@�r+�(���i��P~Z�����ָܰ3&� v�Z���j3��zOV�G�1A�y0=S�g/z_,�\�))�(ޥPzH$=�xI��I�7���{�M�N�T�d���v���6�`C�d ������whi���;ڊ�͕�E�G�t"�Nr����۱�k
��{���,�E�c�+Ε}��!Ѡ�Q8�O҈��TJ��R�#�^�[��cgA���Q���9O�����do*�-����\������W%.�eoL�iQ�C;q��\q�����xi`L�g�NNfhl稭9���8'r�	�خ8����`+K��4��,D�V�p�E�êفʣ�xLuֻFUvX�M{q7[��l#�����F�$�Oh���@
	-�V#�����G��#.�3$y�E�c�����*�Hv�N~��^6h�3��=J���n�@�������*��E��[����5��k��������b�ˍ���Y�݌��HƳN ���&������k��Da����J��Nw����t/���~a7	p��οB�_�W#�����X:
�T�`f�gf�؁�	Ț�͜b�^t}p�{@<�I���/�{�"ܵq9�zK�n����%��L�FO;㣅l:��������-%# �.K� �z����n�I�KJ�ʪ�������"\��=�p�@�r�����K��A��R蝄�ȭ������G�^�8�� W8[G��Ӓ�\yq��J.2*+��@���ϥ�[U��O���^�L2�L�?5 ϟ�`ь��7-��E�e���:����n�N��D4W/�@��_Y&��3�5��%���p���C�����$��0?*dL)�h�1��b�]޵�ξ���1���`����r��F��
a���	���W���v��
�&2)O�=��2�Q��fk�d3����K
�h�������xpX�� �ď�i�ƔT�q�t���@�ڧ��Xc�1�!ԣ��<��i-��D�O�+�-U�d2�_�$��͸��DK�P��J�(5�S� �jZ(��j1�h]BZ��K�O����~���b������ND�W.��B^ķs�4��l����%�Ls1#v��L�&��9��_����={�_>
��      (      x������ � �      "      x��YIs�:�^��˸���<잧L�e�&}_yK�Ę"դdK�����ȩ~��I9qp�o8�䮩C5%J[��0������"���nW��0�G�ɑ5zd��f�F2z����j�3����ۧu�=�7T0�9ݶ�B��Y�O�ՊX��FE�NZ��s��A{$�I���jC�T�~o�)��6�����r)3Ȿ8�!���ZVU<�׷�;��[����.����nUքɌ�sr����z-�n^����PU�7a���x�,�#��Hkc7Nyc�q�~lcD���	����j�!���ׂ)�wD|M��B����qt��@ğ���'��N$�ܯ�dK�Q�;%59o]�_cM�ܕ�����35r;�7�[b�����c}߬q��M�;��z�� �B�3h�U|��цY�s^�:��mVa[5���G(�H2�6L3O8�~4��r6ۡ!���u��о�/'Tj��m�zE��S�LQ�
.�f��g��"�d��iSmk��^y�GBpM��9�bb�;z�\�)���A���g�P봖�4VU���4,��LZ�,�����[�m[v�E9���k �vF>�G���sNn�u������8��O���~꺩��ʬGm���:�0�+ʉG�Ya�Ɠ�y�X"�E�2i���(����7��F0B�R����j����ͺ^<�n��K��������|]�
K�q�XEµr�~���2AϏ�u�$,�e���+"���JX�QN�8�h���Y|����X8��?.S@�����,\>	&�	!EB�ik��d�o7ݬYğ�wB{�Hs-7�;"�a�n�I��V7� ,���r�zL�=P���O�
���BGbPι4�\4��6���0i��;����ʈQj����=M�x�?����������],�^�1?�E;�}y�a]��k�{��\��k/��ռAi?Va��ʩ=�Kb�i��}��`�;�u�99��m|�tz�q;0�Dk�V��.ݢ��K�#�ՈKm���^��b��p��~��~��P�r�?�
U�c������B^��+���%NM�A^�Ud� �`V��pE�1�>�#-���������ot�,�}E}�P4Z� v���M1c�p����Zv�X��6� H�<�\_2�9ZJZL�f�����gU��<���uU��p�OQ+�H�����|��of%�#@�}��. �gs�UW.��V�F�c�$�0��'�-#��h�X_�Y���?��Z!�cHX��|�,���� ������.�8�Ol&�Y�F�36��p{`8�]��y?���,$��r5/�!8iN[�,�N��� U!R�)ρ����+�k|~Ff�_D�X�gM�8��[��gܧ ��5�:n�/q��%7�~��+���iܕL�S~4u<̴1r,�A�3 K��t���8�r��6O�S%�{D㎜�[@P���ܥ�C������4�Eh��D�?ro�iaG�� [�I�7�ޡ�e����Y�P>��5n�:8��wTJ���ܠ����d�I�Ԙd�9���}��u�����wR	�Jp#7�;�Q�%�����m &��z�WF@�r�+;"�8�J�:��!K���Z�CY8�7�Z�rA�m �L�P�	�����< ߿@LY���L��d�&(k4aʑ��We=��6E�����=�z�FF;L��(�1�����'�x��9I���e��Pqd����9�� +UI�w�	�.�&�T��#��H
�6�$�}#<���^�MUu;�=����{H �W���2��4�¬�8����I&�K�� �Cʓ>!�&C Jƈ^ŷ�CgNgq�I��.�aX���kʜP�\�%Ħ�J%��@C a
��"t��S��a�G>��08T&B���Z#y��>�A��ܫ�ԑ�I����)f�y�Į���h�s��Do����Q��6P�"�D�P����_�*P�R{�o�w�A��$�[�A!� T�l����hEz���S�,��4I�Lc❆ـ�eΑ��3�*c��i���I�#�1��6�Yr�n�i�AD�d���o��M�Jۡ3�S�T�<ԾҺ#iՋ��q��wXO��P��?@]5��s���_0&��T>=!�$��4f����m+e�|���@�Cb�j�2�\�ǂxW�|����\���t/͠�NS�WI��n����#5 �*'e�������b�{=C�Q��
�Q|��Y��J����\l���h�ȋ���b� �o*H+@օd�w���E�-�lF�%4�*�/ ��h���<��ӆ�v�Ų����ِ���4�� r9kdCr��X'��R�$����<l߁������J��P�\�S�w�#ӳ�
�n�����xT-1v[���g����I`�L���K�>2{7�)�I�xg�<����V��������D��Û�:����8�ĥ���\��6�D�`]�k�ܙ���c���Cg�:Y�$�n�A%2H��D�)��SIX� xZB"��'Ʉ 3B�O�s�Fp� c��5zn���=�Q)͉�^�5�L^6�lEV	�CB�czyO��`�-u(�Ƴ|EF5L0�b�{i�[�'��;p��dߝ\�٧3
g[�a����C|�\'+���XH�S�M'���mry��ǔe��c��h�i���X˗s� o%�/Z@�*�0R>3l������	�s0�,� �Gp>�R�&�@���g��vj0�>��^��ō��2�p'�,V ��G�{��?�9k����-�.���5�7w���7�3����_�z�VY�in,�Q��֨�����
U��8b��:�}����NI9���Lm�D�d���*e/�:�J�_�����u�\�D��!ēݷ�n���'��jl��]G�O-)�u���d����������B��:O�/p�������n2_���A+')�N�1�X�Ww�]ʎ�$ۉ����挂@�g@Xܥ)0?�-A�U��$�+H�0mv^9h���W��g����h����3��6w�Iz�*vU{H��D�6[@:t�7$��Ѐw���~���������0EZ;6ށ\��о��k�?�~����.�L��^*��ՇRr`�]��2H����U�Q Aρ���Y� �������y�վ��Bi2t$���0� �<``д��n!i�맧�◗l��`�c�*�.W:�d�xR��	�.����s�=^@�[�����.Ac������P���R&�T�fOU��
�=Mf�3����=Sq��|�B�ҞXٝ��h��g� �M/H����9T�F�#��H�l�f��l&4/�R�����E�0��k�j��ߤL�d�9�x=�n-M7_�^��A�1�0N�U���]�Ӂ2N�!��q�
_��WM[a��`Zpx^Y$%����<�q##��{�>u����==+�	]�"���[�/W0�A0"����� $,`Vh�.�sҨ���f�I5����po�]p�_��d�V9�Z]�6�g����h^�Lv8~P���J�ʰҾd��O��v-!�	�X����H��L�Ȅ�Wّ��1XuO&�b,u��T��],!�Ⴇ��M�&�$,۲�����:C���#�t����"����x2�c_hIz  �¡��J��*�*����;�G���l<C���?�S�s��e8�X�g�x�'\ߣU��oK8(W���H��A��p��az��c��F��`Üj�w�g�sLv��\��[Z�*��ybB��Iє���d�����E�d�d��S��0��APj�{_ߏv7��>+},��r�1�A����M�&Z��8K#��O]~{���e<L�G�y!��� ڙ~���<��XOa��o(��C�##�L����8�U�q=~�uZ�}����x�5������WC���f]C��K���yAzL�Uz�@.�e~�Uu�Ȩ�k%u��Ǽ�������!�&$ ;  "�C2�AK��q�tzoGOQ�n�@��2PIY�x���{��f9mS���3&�t%��.�^�?d1��jH���W��H�~�A"Y������؀��g�"ݴ���9t����=�]��sRv���B�]�}p�C������z,�(����dg�I#@��kyX��'V�� ��P��9S k��߅�E�$aoݽ�z|@w�=�ڎo ��;	��je��}�ŨKo����o0q�����;���;�{7k�S|���x��������P�M:c��+�lm{]Vb�{ϕ���Z&ᔔ��+�u�������(�ۑˏ          �   x�u�Ko�@ �3����XMZT���F��x�<w�%���ņ�d��%�K\6�K�tQI��Q]q����/>�r���#�)V��T�������)n�g�lߓ򐻵I�^�>kHe(�[�GG��~ܲ�B�	�_��A�GM,\U�f����x�VN+5����4�0��t>f�����i�6��V�~H`u=J:���d�K���L��kgZk��]����I;P���x��3y^�<��c��      $   �  x�5�I��0F�ͯ�{̔Ю�3k���
N���(,M	��_��ǹQ ��G����	�1C�J:��.�]��!��.�m|	È���Oq��*f���~ڧ� cUi�(��Q�*8,R��{���Jy-����|�����i�����o|�����0����$���ia+M���0v�s��C�� ?�U�_��6>��q~��I�`r��Ha���֟"\V����)��[LhV��N�&�w?8o�s�6�0�of8�Q)+<���<|�Jexi�.�q�\����I�,C��]K]C!T�O>F�uK%�$#+���<���0��7+��/)�](+.K�T)ㅂϹ�W.#·���!O��$��n���㗡����"~o}��H�R�wh5c�|�]|S�4q���Yn��)Vh�L=�����O��%������5)���&�F-�t��>��ܚҐ��⬙5��M��$�+5�C����7�>����kWK�"@d��n7&�z�K�dj�A0v㜺1�RgkmA>��y~HBi�s�H����|�`���;���������眦����)9���6�pp9�a������J���4����m��o�\����j�8��ֿ���X�8�)+J�,� շ7EQ�P��           x��V[n#���W1�A$�,��� �P�\��x���sd+K3ȅ�6`�X<<6Ōf���#{ۚH�4*��܆�N<��9��$&_���\��-jk�,<���h3�hMi�ũ4�y�D7J����|/Z�O��R"��b~<�Oo�_~�|��\�v9�b��*�.ߔf�B�ܢ-����vs���d���<�|�H>��L@R|v�m4�j�M3H��r*�]�A�^I��{�;��2�u<��?��~8EI���h� ���ת	���L�3bI���-I�+��x�D#��ޘ�<�g�֚s� �^)j�M�ОU��;Y��!�
���{�C8oB�6E�[�,�$�HrӼb�9��ŢֵJD}�Ɯd3���<��k+�d��*P�,�v��E��`i��Y�ODWL���c��m���T�̷����z��V���Z�ॕ�3H	��
�Wڢ�7��f�Ǣ��<����,� E�\9*q��c^&Ej��u�_���Z�9AC�	3n�B�̧zz<�=��M�+W4r�d[�67�R����Ԋ��7�xb)�N�kV�$� �Vbu�?	Z��-��֊�x��.�`�����0;��_v�������e>>~���:�J�@S��n�[��7e��B�[���	+��0��`��e8W2�A��q�A�1��;�XﺀBX��3�ޢ�C�h��i�'��$����T���-i8"�����H3E� U���h���m-���`��Iai�Ȍ>%t���{������%��I�dw]h��a8|�I�ǧ:�Uf�/o��s}�!�k�+1�V[���`�تM��GKC�RvY�S�:��Թ�g ��Ȅ2��b�K�
�k)So��a��w3���Y�/�{>�=���[b�,mu�}�LlŞb�I���}U��[�2�%:w��}���)Y��{��FL*��K�i!8�Pp��I���&��~�"	k2�����o�����i~�ͧ:��>� ������ ��1����ec����%W8�Oȸ��Z�I�G�4!H��$ m���3rч�!���,3ADk��h~���}���$W(��BM���NF2wۖU�gԉe8w�sCZ!Ò��WY�/�8�BLc�;U蓖����_;bZ!����r�G�C*�RJ&��pB���`^���ȁ^_��4�ݔ��+ �{a'fڬ!�6�*��!�J��-v��\�'�X����\�.�85lШ�|��#�NC�c�"!�f���/"��w�R��k��EP_^�O緧y��9~��5�~�?<<�Yׅf     