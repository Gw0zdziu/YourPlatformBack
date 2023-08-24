
CREATE TABLE "public"."category" (
    "categoryId" text NOT NULL,
    "categoryName" text NOT NULL,
    "categoryDesc" text NOT NULL,
    "userId" text NOT NULL,
    "status" text NOT NULL,
    CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "public"."user"("userId"),
    PRIMARY KEY ("categoryId")
);


CREATE TABLE "public"."game" (
    "gameId" text NOT NULL,
    "categoryId" text NOT NULL,
    "userId" text NOT NULL,
    "gameName" text NOT NULL,
    "gameDesc" text NOT NULL,
    "gameRating" numeric NOT NULL,
    CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "public"."user"("userId"),
    CONSTRAINT "FK_3f10804f18297163a6189353e64" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("categoryId"),
    PRIMARY KEY ("gameId")
);


CREATE TABLE "public"."user" (
    "userId" text NOT NULL,
    "userEmail" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "refreshToken" text,
    "isEmailConfirmed" bool NOT NULL,
    PRIMARY KEY ("userId")
);
