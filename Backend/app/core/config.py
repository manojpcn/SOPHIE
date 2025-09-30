from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SOPHIE"
    APP_PORT: int = "5000"

    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60

    DATABRICKS_HOST: str
    DATABRICKS_PAT: str
    DATABRICKS_WAREHOUSE_ID: str

    class Config:
        env_file = ".env"

settings = Settings()