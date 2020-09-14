import requests
import pandas as pd
from sqlalchemy import create_engine
import os
import datetime


def convert_str_to_date(x):
    return datetime.datetime.strptime(x, '%b %d %Y')


if __name__ == '__main__':
    env_variable = os.environ

    url = 'https://api.ireaditnow.biz/csvexport.php'
    payload = {
        'email': env_variable['WEB_ID'],
        'password': env_variable['WEB_PASSWORD'],
        'timezone': env_variable['WEB_ZONE'],
        'datatype': 'book',
    }
    db_user = env_variable['DB_USER']
    db_host = env_variable['DB_HOST']
    db_password = env_variable['DB_PASSWORD']
    db_port = env_variable['DB_PORT']
    db_name = env_variable['DB_NAME']

    columns = ['title',
               'subtitle',
               'author',
               'translator',
               'publisher',
               'publish',
               'book_format',
               'pages',
               'ISBN',
               'read_status',
               'rating',
               'tag',
               'started_reading',
               'finished_reading']

    temp_file = 'temp.txt'

    r = requests.post(url, data=payload)

    if (r.status_code == 200):
        with open(temp_file, 'w') as f:
            f.write(r.text)

    if os.path.exists(temp_file):
        book_data = pd.read_csv(temp_file, sep="\t")
        book_data.columns = columns
        # book_data['publish'] = book_data['publish'].apply(convert_str_to_date_publish)
        book_data['started_reading'] = book_data['started_reading'].apply(convert_str_to_date)
        book_data['finished_reading'] = book_data['finished_reading'].apply(convert_str_to_date)

        engine = create_engine(
            'postgresql://' + db_user + ':' + db_password + '@' +
            db_host + ':' + db_port + '/' + db_name, echo=False)

        book_data.to_sql(name='book_store', con=engine, if_exists='append', index=False)
        os.remove(temp_file)
