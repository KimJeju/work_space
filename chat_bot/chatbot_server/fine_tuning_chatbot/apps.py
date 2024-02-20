from django.apps import AppConfig


class FineTuningChatbotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'fine_tuning_chatbot'

    # 토큰
    def ready(self):
        import fine_tuning_chatbot.signals