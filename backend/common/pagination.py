from django.conf import settings

from rest_framework import pagination
from rest_framework.response import Response

class CustomPagination(pagination.PageNumberPagination):
    '''
    pagination class
    links - pagination 처리 링크
        next: 다음 페이지
        previous: 이전 페이지
        start_index: 시작 페이지 번호
        end_index: 마지막 페이지 번호
    count: 전체 건수
    results: 결과 데이터
    '''
    def get_paginated_response(self, data):
        page_dict = {
            'next': None,
            'previous': None,
            'start_index': None,
            'end_index': None,
            'count': None,
            'cur_page': None,
            'per_page': None,
            'item_per_count': None
        }

        if self.get_next_link():
            page_dict['next'] = self.page.next_page_number()
        
        if self.get_previous_link():
            page_dict['previous'] = self.page.previous_page_number()

        page_dict['start_index'] = self.page.start_index()
        page_dict['end_index'] = self.page.end_index()
        page_dict['count'] = self.page.paginator.count
        page_dict['cur_page'] = self.page.number
        page_dict['per_page'] = 1
        page_dict['item_per_count'] = settings.REST_FRAMEWORK['PAGE_SIZE']

        return Response({
            'links': page_dict,
            'results': data
        })