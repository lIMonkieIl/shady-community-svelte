create table
    public.profiles (
        id uuid not null references auth.users on delete cascade,
        discord_id text,
        avatar text,
        username text,
        primary key (id)
    );

alter table public.profiles enable row level security;

-- Modify the function to fetch profile information from auth.users

CREATE FUNCTION PUBLIC.HANDLE_NEW_USER() RETURNS TRIGGER 
LANGUAGE PLPGSQL SECURITY DEFINER SET SEARCH_PATH 
=PUBLIC AS 
	$$ begin
	insert into
	    public.profiles (
	        id,
	        discord_id,
	        avatar,
	        username
	    )
	values (
	        new.id,
	        new.raw_user_meta_data ->> 'sub',
	        new.raw_user_meta_data ->> 'avatar_url',
	        new.raw_user_meta_data ->> 'full_name'
	    );
	return 
NEW; 

end;

$$;

-- trigger the function every time a user is created

CREATE TRIGGER ON_AUTH_USER_CREATED 
	after
	insert on auth.users for each row
	execute
	    procedure public.handle_new_user();

		
