# 책 형태
CHOICES_BOOK_FORMAT = (
    ('10', 'Hardcover'),  # 10: 하드커버
    ('20', 'Paperback'),  # 20: 페이퍼백
    ('30', 'Audiobook'),  # 30: 오디오북
    ('40', 'eBook'), # 40: e북
    ('50', 'Book'),  # 50: 책
)

# 책 읽은 상태
CHOICES_READ_STATUS = (
    ('10', 'Not Read'), # 10: 읽지않음
    ('20', 'Reading'),  # 20: 읽는 중
    ('30', 'Read'), # 30: 읽음
)

# 책 검색 API
CHOICES_SEARCH_API = (
    ('1', 'Google Book API'),
    ('2', 'Daum Book API'),
    ('3', 'Aladin Book API'),
)