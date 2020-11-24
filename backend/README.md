## BookManager API Information

| action |App Name| API URL | Description |
|--- |---| --- | --- |
| POST | accounts | /login | 로그인 기능 |
| GET | accounts | /user | User정보 Get(Token 필요) |
| PATCH | accounts | /user/(?P<pk>[0-9]+)/ | User정보 Update(Token 필요) |
| POST | accounts | /logout | 로그아웃(Token 필요) |
| POST | accounts | /register | 회원가입 |
| GET | accounts | /user/options/ | User 정보에 지정된 api option 정보 |
| GET | accounts | /user/email/validate | 이메일 중복체크 |
| GET | bookmanager | /books | 책 정보 Get(Token 필요) |
| POST | bookmanager | /books | 책 정보 저장(Token 필요) |
| GET | bookmanager | /books/(?P<pk>[0-9]+) | 책 상세 정보 Get(Token 필요) |
| PUT | bookmanager | /user/email/validate | 책 정보 Update(Token 필요) |
| DELETE | bookmanager | /user/email/validate | 책 정보 Delete(Token 필요) |
| GET | bookmanager | /books/(?P<pk>[0-9]+)/timelines | 책 정보에 저장된 timeline Get(Token 필요)  |
| POST | bookmanager | /books/(?P<pk>[0-9]+)/timelines | 책 read timeline 정보 저장(Token 필요) |
| GET | bookmanager | books/(?P<b_pk>[0-9]+)/timelines/(?P<pk>[0-9]+) | 책 Timeline 상세 정보(Token 필요) |
| PUT | bookmanager | books/(?P<b_pk>[0-9]+)/timelines/(?P<pk>[0-9]+) | 책 Timeline 정보 update(Token 필요) |
| DELETE | bookmanager | books/(?P<b_pk>[0-9]+)/timelines/(?P<pk>[0-9]+) | 책 Timeline 정보 delete(Token 필요) |
| GET | bookmanager | /books/(?P<pk>[0-9]+)/notes | 책 정보에 저장된 Note 정보 Get(Token 필요)  |
| POST | bookmanager | /books/(?P<pk>[0-9]+)/notes | 책의 Note정보 저장(Token 필요) |
| GET | bookmanager | /books/(?P<b_pk>[0-9]+)/notes/(?P<pk>[0-9]+) | 책 Note 상세 정보(Token 필요) |
| PUT | bookmanager | /books/(?P<b_pk>[0-9]+)/timelines/(?P<pk>[0-9]+) | 책 Note 정보 update(Token 필요) |
| DELETE | bookmanager | /books/(?P<b_pk>[0-9]+)/timelines/(?P<pk>[0-9]+) | 책 Note 정보 Delete(Token 필요) |
| GET | bookmanager | /books/choices | 책 format 정보 Get(Token 필요) |