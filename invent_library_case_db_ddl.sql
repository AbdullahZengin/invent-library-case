BEGIN;


CREATE TABLE IF NOT EXISTS public.books
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    score_avg numeric(5, 2),
    CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.borrows
(
    id serial NOT NULL,
    score integer,
    return_date date,
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    CONSTRAINT "PK_69f3a91fbbed0a8a2ce30efbce1" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.borrows
    ADD CONSTRAINT "FK_4338f57a03c1b0cd47915d47664" FOREIGN KEY (book_id)
    REFERENCES public.books (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.borrows
    ADD CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;