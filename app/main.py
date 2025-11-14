from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "https://digitaldominiongaming.com",
    "https://www.digitaldominiongaming.com",
    "https://digitaldominiongaming.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    """Simple endpoint to verify service availability."""
    return {"status": "ok"}
