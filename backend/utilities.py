import sys
sys.path.append( 'helper/')
from backend.acropora_model.helper.model_wrapper import ModelWrapper
from rest_framework.response import Response
from rest_framework import status

class AcroporaUtilities:

    def get_answer(question: str, state: str, utility: str) -> Response:

        key = "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"
        model = ModelWrapper(key)

        # call answer model
        # template_main, template_il, template_nj
        # question = "What is the REC value for a 1.2MW commercial rooftop solar project in ComEd IL?"
        # answer, reference = model.get_answer(question, 'IL', 'state')
        answer, reference = model.get_answer(question, state, utility)
        
        response_data = {
            "answer": answer,
            "reference": reference
        }

        return Response(data=response_data, status=status.HTTP_200_OK)