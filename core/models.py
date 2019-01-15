from django.db import models
from django.contrib.auth import get_user_model

class Post(models.Model):
    """Model representing a wall post."""
    body_text = models.TextField()
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    author = models.ForeignKey(
        get_user_model(),
        related_name='posts',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ['-pub_date']

    def __str__(self):
        return self.body_text
