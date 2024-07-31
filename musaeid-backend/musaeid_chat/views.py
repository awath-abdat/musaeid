import os
from llama_index.llms.replicate import Replicate
from llama_index.core.retrievers import NLSQLRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.utilities.sql_wrapper import SQLDatabase
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.serializers import ValidationError
from django.conf import settings

from musaeid_chat.models import CharacterChoices, Chat


# Create your views here.
class ChatAPI(APIView):
    methods = ["GET", "POST"]
    permission_classes = [
        AllowAny,
    ]

    def get(self, request: Request, chat_id: str | None = None) -> Response:
        if not chat_id:
            first_chat = Chat.objects.create(
                character=CharacterChoices.BYTE_GENIE, text=settings.FIRST_TEXT
            )
            return Response(
                {
                    "chat_id": first_chat.chat_id,
                    "messages": [
                        {
                            "id": first_chat.pk,
                            "character": first_chat.character,
                            "display_name": first_chat.get_character_display(),
                            "text": first_chat.text,
                            "created_at": first_chat.created_at,
                        }
                    ],
                },
                status=status.HTTP_200_OK,
            )

        chats = Chat.objects.filter(chat_id=chat_id).all()
        messages = [
            {
                "id": chat.pk,
                "character": chat.character,
                "display_name": chat.get_character_display(),
                "text": chat.text,
                "created_at": chat.created_at,
            }
            for chat in chats
        ]

        return Response(
            {
                "chat_id": chat_id,
                "messages": messages,
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request: Request, chat_id: str) -> Response:
        if not request.data.get("text"):
            raise ValidationError({"text": "The chat text is required!"})

        chat = Chat.objects.create(
            chat_id=chat_id,
            character=CharacterChoices.USER,
            text=str(request.data.get("text")),
        )

        os.environ["REPLICATE_API_TOKEN"] = settings.REPLICATE_API_TOKEN or ""
        os.environ["OPENAI_API_KEY"] = settings.OPENAI_API_KEY or ""

        llm = Replicate(
            model="meta/meta-llama-3-70b-instruct",
            temperature=0.0,
            context_window=500,
        )

        musaeid_db = SQLDatabase.from_uri(
            "sqlite:///musaeid.db", sample_rows_in_table_info=0
        )

        nl_sql_query_retriever = NLSQLRetriever(
            musaeid_db,
            tables=["events", "companies", "people"],
            return_raw=False,
            llm=llm,
        )
        query_engine = RetrieverQueryEngine.from_args(nl_sql_query_retriever, llm=llm)
        response = query_engine.query(chat.text)

        Chat.objects.create(
            chat_id=chat_id, character=CharacterChoices.BYTE_GENIE, text=str(response)
        )

        return Response(
            {
                "chat_id": chat.chat_id,
                "messages": [
                    {
                        "id": chat.pk,
                        "character": chat.character,
                        "display_name": chat.get_character_display(),
                        "text": chat.text,
                        "created_at": chat.created_at,
                    }
                ],
            },
            status=status.HTTP_200_OK,
        )
