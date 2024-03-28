# short-url

URL을 짧게 만들어주는 프로젝트입니다.

## Requires

- Node 18 또는 그 이상의 버전
- Bun 1.0.35 또는 그 이상의 버전
- Supabase

### Supabase Table 구조

`redirection_url` 이라는 이름의 Supabase Table이 설정되어있어야 합니다.

| Name        | Format                   | Description                      | Note                   |
| ----------- | ------------------------ | -------------------------------- | ---------------------- |
| id          | bigint                   | primary key                      |                        |
| created_at  | timestamp with time zone | created date                     |                        |
| updated_at  | timestamp with time zone | updated date                     |                        |
| source      | string                   | short-url code (e.g. AsDisv)     |                        |
| destination | string                   | destination URL                  |                        |
| count       | bigint                   | count of how many this link used |                        |
| owner       | uuid                     | created user                     | forign key : `auth.id` |

### environments values

| Key                             | description                    |
| ------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_BASE_URL`          | 리다이렉트시에 앞에 붙혀줄 URL |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase URL                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key              |
| `SUPABASE_SERVICE_KEY`          | Supabase Service Key           |

## How to run

1. 위 _environments values_ 섹션을 참고하여 env를 작성해주세요.
2. `bun install` 을 통해 dependencies를 설치해주세요
3. `bun dev` 를 통해 로컬 서버를 실행시킬 수 있습니다.

## API Document

TBD
