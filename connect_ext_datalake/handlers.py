from fastapi.responses import JSONResponse
from google.api_core.exceptions import GoogleAPIError


async def custom_google_pubsub_exception_handler(request, e):
    return JSONResponse(
        {
            'error': f'{type(e).__name__} : {str(e)}',
        },
        status_code=400,
    )


class CustomExceptionHandlers:
    @classmethod
    def get_exception_handlers(cls, exception_handlers):
        exception_handlers[GoogleAPIError] = custom_google_pubsub_exception_handler
        return exception_handlers
