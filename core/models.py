from django.db import models

class Post(models.Model):
    """Model representing a wall post."""
    body_text = models.TextField()
    pub_date = models.DateTimeField('date published', auto_now_add=True)

    class Meta:
        ordering = ['-pub_date']

    def __str__(self):
        return self.body_text
