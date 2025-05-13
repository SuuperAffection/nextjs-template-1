
\c next_db

BEGIN;

-- user_account テーブルの作成
CREATE TABLE public.User_Account (
    id bigint NOT NULL,
    displayName text NOT NULL,
    userId text NOT NULL UNIQUE,
    pw text NOT NULL,
    deleteFlag boolean NOT NULL DEFAULT FALSE,
    createUser bigint,
    updateUser bigint,
    creation timestamp without time zone NOT NULL,
    modification timestamp without time zone NOT NULL,
    version bigint NOT NULL
);

CREATE  SEQUENCE UserAccountSeq;

-- session テーブルの作成
CREATE TABLE public.Session (
    fkUser bigint NOT NULL,
    token text NOT NULL,
    expiration timestamp without time zone NOT NULL,
    createUser bigint,
    updateUser bigint,
    creation timestamp without time zone NOT NULL,
    modification timestamp without time zone NOT NULL,
    version bigint NOT NULL
);

CREATE SEQUENCE SessionSeq;

INSERT INTO user_account(
    id,
    displayName,
    userId,
    pw,
    deleteFlag,
    creation,
    modification,
    version
) VALUES (
    NEXTVAL('UserAccountSeq'),
    'テストユーザ',
    'test',
    'pass',
    false,
    NOW(),
    NOW(),
    0
);

INSERT INTO user_account(
    id,
    displayName,
    userId,
    pw,
    deleteFlag,
    creation,
    modification,
    version
) VALUES (
    NEXTVAL('UserAccountSeq'),
    'テストユーザ2',
    'test2',
    'pass',
    false,
    NOW(),
    NOW(),
    0
);

COMMIT;