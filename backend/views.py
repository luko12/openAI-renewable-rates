from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from backend.utilities import AcroporaUtilities


# Create your views here.
class AcroporaView(APIView):

    def get(self, request: Request) -> Response:
        return AcroporaUtilities.get_answer(
            request.data.get("question"),
            request.data.get("state"),
            request.data.get("utility")
        )