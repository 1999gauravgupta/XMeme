from django.db import models

# Create your models here.
class Meme(models.Model):
    name=models.CharField(max_length=200)
    caption=models.CharField(max_length=200)
    url=models.CharField(max_length=20000)
    likes=models.IntegerField(default=0)
    dislikes=models.IntegerField(default=0)
    difference = models.IntegerField(default=0)
    # time=models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ["name", "url", "caption"]

    def save(self, *args, **kwargs):
        self.difference = self.likes -self.dislikes
        super(Meme, self).save(*args, **kwargs)