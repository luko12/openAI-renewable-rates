import sys
sys.path.append( 'helper/')
from backend.acropora_model.helper.model_wrapper import ModelWrapper
from rest_framework.response import Response
from rest_framework import status

class AcroporaUtilities:

    def __init__(self):
        # key = "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"
        key = "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"
        self.model = ModelWrapper(key)

    def get_answer(self, question: str, state: str, utility: str) -> Response:

        
        # call answer model
        # template_main, template_il, template_nj
        # question = "What is the REC value for a 1.2MW commercial rooftop solar project in ComEd IL?"
        # answer, reference = model.get_answer(question, 'IL', 'state')
        answer, reference = self.model.get_answer(question, state, utility, template="")
        
        response_data = {
            "answer": answer,
            "reference": reference
        }

        return Response(data=response_data, status=status.HTTP_200_OK)