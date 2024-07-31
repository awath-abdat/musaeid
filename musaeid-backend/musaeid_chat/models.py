from uuid import uuid4
from django.db import models


# Create your models here.
class CharacterChoices(models.TextChoices):
    USER = "user", "User"
    BYTE_GENIE = "byte-genie", "ByteGenie"


class Chat(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    chat_id = models.UUIDField(default=uuid4)
    character = models.CharField(max_length=10, choices=CharacterChoices.choices)
    text = models.TextField()

    class Meta:
        db_table = "chats"
