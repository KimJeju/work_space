from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
#
# rest_framework.authtoken.models에서
# Token 모델을 제공합니다. 이 모델은 사용자를 자동으로
# 생성된 토큰과 연결합니다. 이 토큰은 API 요청의 인증에 사용될 수 있습니다.
# 사용자가 생성될 때 사용자에 대한 토큰을 생성해야 합니다.

# 토큰 자동생성
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)