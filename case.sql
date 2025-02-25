PGDMP     %    -                }            nestauth    14.15 (Homebrew)    14.4     [           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            \           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ]           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ^           1262    16384    nestauth    DATABASE     S   CREATE DATABASE nestauth WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE nestauth;
             
   berkkuthan    false            �            1259    16408 	   questions    TABLE     �   CREATE TABLE public.questions (
    id integer NOT NULL,
    text character varying NOT NULL,
    options text[] NOT NULL,
    "correctAnswer" character varying NOT NULL
);
    DROP TABLE public.questions;
       public         heap 
   berkkuthan    false            �            1259    16407    questions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.questions_id_seq;
       public       
   berkkuthan    false    212            _           0    0    questions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;
          public       
   berkkuthan    false    211            �            1259    16386    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    "highScore" integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.users;
       public         heap 
   berkkuthan    false            �            1259    16385    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       
   berkkuthan    false    210            `           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public       
   berkkuthan    false    209            �           2604    16411    questions id    DEFAULT     l   ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);
 ;   ALTER TABLE public.questions ALTER COLUMN id DROP DEFAULT;
       public       
   berkkuthan    false    212    211    212            �           2604    16389    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       
   berkkuthan    false    209    210    210            X          0    16408 	   questions 
   TABLE DATA           G   COPY public.questions (id, text, options, "correctAnswer") FROM stdin;
    public       
   berkkuthan    false    212   �       V          0    16386    users 
   TABLE DATA           D   COPY public.users (id, username, password, "highScore") FROM stdin;
    public       
   berkkuthan    false    210   y       a           0    0    questions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.questions_id_seq', 2, true);
          public       
   berkkuthan    false    211            b           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public       
   berkkuthan    false    209            �           2606    16415 (   questions PK_08a6d4b0f49ff300bf3a0ca60ac 
   CONSTRAINT     h   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.questions DROP CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac";
       public         
   berkkuthan    false    212            �           2606    16394 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public         
   berkkuthan    false    210            �           2606    16396 $   users UQ_fe0bb3f6520ee0469504521e710 
   CONSTRAINT     e   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710";
       public         
   berkkuthan    false    210            X   {   x�3��H,Q�,V(�HUHN,�,I�Q�OSp+J�KN���,.I�K*��I-��<:?5#�H�𞢔�{�t�+�S�2k9�\F�KO��L�+I-�*L���M-*���I��N,J���\1z\\\ E:L      V   �   x�5�;�0  й=si! ��1&�Ǹ�!��@�-�w��Y��[��5���t�v�-���p&q�!=���-�0Ea$��Z'2�/`H�0n��d��h�	S���U���Jw�.���k.��Q3ד
Ǔ�l�w!�֙+�     